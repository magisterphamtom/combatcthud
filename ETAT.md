# État — Combat Cthulhu HUD (version FR / v14)

Fork de juninhoneiva/combatcthud v0.2.4 (MIT), id conservé : `combatcthud`.

## Fait (v0.3.0)
- Manifeste : `maximum: 13` retiré (bloquait le chargement en v14), vérifié 14.368, CoC7 vérifié 8.15.
- Modes de visibilité v14 (`public`, `gm`, `blind`, `self`, `ic`…) normalisés vers les modes v13 utilisés en interne (`normalizeMode`, `chatModeKey` dans scripts/cards.js).
- Jet de dégâts rapides : mode appliqué via `ChatMessage.applyMode ?? applyRollMode` (v13 et v14).
- Traduction française complète (lang/fr.json, mêmes clés que en/pt-BR).
- README en français (crédits à juninhoneiva), README portugais conservé (README.pt-BR.md).
- Fonctions CoC7 utilisées vérifiées dans le code 8.15 : weaponCheck, skillCheck, attributeCheck, toggleCondition, dealDamage, setHp, rollInitiative, weapon.system.reload/addAmmunition/shootAmmunition, getFirstItemByCoCID.

## À tester dans Foundry 14.368 + CoC7 8.15
- Le HUD apparaît au lancement d'un combat ; Maj+H ; bouton dans les outils Jetons.
- Attaque au contact / à distance avec cible, esquive, riposte depuis les cartes du HUD.
- Recharge (clic, Maj+clic, clic droit), dégainer/rengainer, initiative.
- Dégâts rapides (armure / direct / soin) et jet de dégâts du MJ en privé.
- Cartes privées / aveugles / pour moi côté joueur.
- Les 3 thèmes (CSS : vérifier qu'aucun style n'a bougé en v14).
- Avec Dice So Nice, et avec PopOut! s'il est compatible v14.

## Idées
- Proposer le portage v14 à juninhoneiva (pull request) pour qu'il profite à tous.
