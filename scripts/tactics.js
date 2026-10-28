/**
 * Manœuvre et « se jeter à couvert » : raccourcis par-dessus les jets de CoC7.
 * Le HUD fait les calculs (Carrures, dés malus) et les rappels de règle ;
 * le jet lui-même reste un jet de compétence CoC7 ordinaire.
 */
import { MODULE_ID } from './constants.js'

const T = (k, data) => (data ? game.i18n.format(`COMBATCTHUD.Tactics.${k}`, data) : game.i18n.localize(`COMBATCTHUD.Tactics.${k}`))
const esc = (s) => foundry.utils.escapeHTML(String(s ?? ''))
export const COVER_STATUS = 'cthud-cover'

export const MANEUVERS = ['disarm', 'knockdown', 'hold', 'push', 'grab', 'other']

/** Meilleure compétence de corps à corps (Combat rapproché…), hors Esquive. */
function fightingSkill (actor) {
  return actor.items
    .filter(i => i.type === 'skill' && i.system.properties?.fighting && !i.system.isDodge && !/esquiv|dodge/i.test(i.name))
    .sort((a, b) => (b.system.value ?? 0) - (a.system.value ?? 0))[0] ?? null
}

function dodgeSkill (actor) {
  return actor.getFirstItemByCoCID?.('i.skill.dodge') ??
    actor.items.find(i => i.type === 'skill' && (i.system.isDodge || /esquiv|dodge/i.test(i.name))) ?? null
}

const buildOf = (actor) => Number(actor?.system?.attribs?.build?.value) || 0

/** Dés malus selon l'écart de Carrure (cible plus grosse) ; null = impossible (3 ou plus). */
export function maneuverPenalty (attackerBuild, targetBuild) {
  const gap = targetBuild - attackerBuild
  if (gap >= 3) return null
  return gap > 0 ? Math.min(2, gap) : 0
}

async function note (actor, html) {
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<div class="cthud-tactic-card">${html}</div>` })
}

/* ------------------------------------------------------------------ */
/*  Manœuvre                                                           */
/* ------------------------------------------------------------------ */

export async function maneuver (actor, event) {
  if (!actor) return
  const targetToken = [...game.user.targets][0]
  const target = targetToken?.actor
  if (!target) return ui.notifications.warn(T('needTarget'))
  const skill = fightingSkill(actor)
  if (!skill) return ui.notifications.warn(T('noFighting', { name: actor.name }))
  const bA = buildOf(actor)
  const bT = buildOf(target)
  const penalty = maneuverPenalty(bA, bT)
  if (penalty === null) return ui.notifications.warn(T('impossible', { target: targetToken.name, bT, name: actor.name, bA }))

  const choices = MANEUVERS.map((k, i) => `<label class="cthud-tactic-choice"><input type="radio" name="maneuver" value="${k}" ${i === 0 ? 'checked' : ''}>
    <span><strong>${T(`m.${k}`)}</strong> — ${T(`e.${k}`)}</span></label>`).join('')
  const picked = await foundry.applications.api.DialogV2.wait({
    window: { title: T('maneuverTitle'), icon: 'fa-solid fa-hand-back-fist' },
    classes: ['cthud-tactic-dialog'],
    position: { width: 440 },
    content: `<p class="cthud-tactic-builds">${T('builds', { name: esc(actor.name), bA, target: esc(targetToken.name), bT })}<br>
      <strong>${penalty ? T('penalty', { n: penalty }) : T('noPenalty')}</strong></p>
      <div class="cthud-tactic-choices">${choices}</div>
      <p class="cthud-hint">${T('maneuverHint', { skill: esc(skill.name) })}</p>`,
    buttons: [
      { action: 'ok', label: T('roll'), icon: 'fa-solid fa-dice', default: true, callback: (ev, button) => button.form.elements.maneuver.value },
      { action: 'cancel', label: T('cancel'), icon: 'fa-solid fa-xmark', callback: () => null }
    ],
    rejectClose: false
  })
  if (!picked) return
  await note(actor, `<h3><i class="fa-solid fa-hand-back-fist"></i> ${T('maneuverCard', { m: T(`m.${picked}`), target: esc(targetToken.name) })}</h3>
    <p>${T('builds', { name: esc(actor.name), bA, target: esc(targetToken.name), bT })} · <strong>${penalty ? T('penalty', { n: penalty }) : T('noPenalty')}</strong></p>
    <p>${T('maneuverRule', { target: esc(targetToken.name), e: T(`e.${picked}`) })}</p>`)
  return actor.skillCheck(skill.uuid, event?.shiftKey, { poolModifier: -penalty })
}

/* ------------------------------------------------------------------ */
/*  Se jeter à couvert                                                 */
/* ------------------------------------------------------------------ */

let pending = null // { actorUuid, until }

/** Résultat d'une carte de jet CoC7 (dernière ligne de dés) : true, false, ou null tant qu'elle n'est pas révélée. */
function resultOf (message) {
  const html = message.content ?? ''
  const all = [...html.matchAll(/class="dice-formula[^"]*\b(critical|success|failure|fumble)\b/g)]
  if (!all.length) return null
  const last = all.at(-1)[1]
  return last === 'critical' || last === 'success'
}

async function watch (message) {
  if (!pending || Date.now() > pending.until) { pending = null; return }
  const load = message.flags?.CoC7?.load
  if (load?.as !== 'CoC7Check' || load.actorUuid !== pending.actorUuid) return
  if (!message.isAuthor && !game.user.isGM) return
  const ok = resultOf(message)
  if (ok === null) return
  const { actorUuid } = pending
  pending = null
  const actor = await fromUuid(actorUuid)
  const a = actor?.actor ?? actor
  if (!a) return
  if (ok) {
    try { await a.toggleStatusEffect(COVER_STATUS, { active: true }) } catch (e) { console.warn(MODULE_ID, e) }
    await note(a, `<h3><i class="fa-solid fa-person-falling"></i> ${T('coverOk', { name: esc(a.name) })}</h3><p>${T('coverOkRule')}</p>`)
  } else {
    await note(a, `<h3><i class="fa-solid fa-person-falling"></i> ${T('coverKo', { name: esc(a.name) })}</h3><p>${T('coverKoRule')}</p>`)
  }
}

export async function takeCover (actor, event) {
  if (!actor) return
  const dodge = dodgeSkill(actor)
  if (!dodge) return ui.notifications.warn(T('noDodge', { name: actor.name }))
  pending = { actorUuid: actor.uuid, until: Date.now() + 5 * 60 * 1000 }
  return actor.skillCheck(dodge.uuid, event?.shiftKey)
}

/** Fin du round : le couvert tombe (exécuté par le Gardien). */
async function clearCover (combat, changes) {
  if (!game.user.isGM || !('round' in changes)) return
  for (const c of combat.combatants) {
    const a = c.actor
    if (a?.statuses?.has(COVER_STATUS)) await a.toggleStatusEffect(COVER_STATUS, { active: false })
  }
}

export function registerTactics () {
  Hooks.once('init', () => {
    CONFIG.statusEffects.push({ id: COVER_STATUS, name: 'COMBATCTHUD.Tactics.coverStatus', img: `modules/${MODULE_ID}/icons/cover.svg` })
  })
  Hooks.on('createChatMessage', watch)
  Hooks.on('updateChatMessage', watch)
  Hooks.on('updateCombat', clearCover)
  Hooks.on('deleteCombat', async (combat) => {
    if (!game.user.isGM) return
    for (const c of combat.combatants) if (c.actor?.statuses?.has(COVER_STATUS)) await c.actor.toggleStatusEffect(COVER_STATUS, { active: false })
  })
}
