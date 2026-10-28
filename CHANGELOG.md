# Changelog

## v0.6.0

### Nouveautés

- **Manœuvre** : bouton du panneau d'actions. Choix de la manœuvre (désarmer, renverser, immobiliser…), comparaison des Carrures avec la cible visée (un dé malus par point d'écart, impossible à 3 ou plus), rappel de la règle dans le chat, puis jet de Combat rapproché avec les dés malus déjà réglés.
- **Cartes du HUD** : en taille automatique, la colonne des cartes suit la hauteur du panneau de l'acteur et défile à l'intérieur, au lieu d'allonger le HUD jusqu'en bas de l'écran.
- **À couvert** : jet d'Esquive ; le résultat est lu sur la carte de CoC7. Réussi : icône « À couvert » sur le jeton jusqu'à la fin du round et rappel d'activer l'option « À couvert » de la carte de tir. Réussi ou non : rappel de la perte de la prochaine action.

## v0.5.2

### Nouveautés

- **Poignée de redimensionnement** en bas à droite du HUD : on règle sa hauteur et la largeur de la colonne des cartes ; la taille est retenue. Double-clic sur la poignée : retour à la taille automatique.

### Corrections

- Le libellé « Chance » des jauges n'est plus coupé par la barre (colonne des libellés élargie dans tous les thèmes).

## v0.5.0

### Nouveautés

- **Deux thèmes modernes** : **New York 2026** (verre fumé, LED, signalétique du métro) et **Antarctique 2026** (tablette de station polaire, blanc glacier et orange sécurité), dérivés du thème Moderne.
- Les cartes du HUD reprennent les couleurs de résultat du module « CoC7 – Cartes de chat thématiques ».

## v0.4.0

### Nouveautés

- **Deux nouveaux thèmes** : **New York années 20** (bleu nuit, chrome, silhouette de Manhattan, ambre de Broadway) et **Par-delà les Montagnes Hallucinées** (carnet d'expédition polaire, bleu glacier, machine à écrire).
- Mêmes thèmes que les modules « CoC7 – Cartes de chat thématiques » et « Token Action HUD – Thème Années 20 », qui peuvent les appliquer automatiquement.

## v0.3.0

Version française et compatible Foundry v14, par magisterphamtom (d'après le travail de juninhoneiva).

### Nouveautés

- **Compatibilité Foundry v14** (vérifiée en 14.368) : la limite « v13 maximum » du manifeste est levée.
- **Traduction française** complète.
- **Modes de visibilité v14** : les cartes privées, aveugles et « pour moi » sont reconnues aussi bien avec les noms de la v13 (`gmroll`, `blindroll`…) qu'avec ceux de la v14 (`gm`, `blind`…).
- **Dégâts rapides** : le jet de dégâts du MJ reste privé en v13 comme en v14.
- Système CoC7 vérifié en **8.15**.

## v0.2.4

### Correções

- **Resultados sumindo dos cartões do HUD com o Dice So Nice**: enquanto os dados 3D rolam, o Dice So Nice esconde o resultado e, ao terminar, só o revelava no chat. Agora o HUD também revela o resultado quando a animação acaba (por exemplo, o resultado do disparo no cartão de ataque à distância).
- **O mestre vê todas as rolagens** no HUD, inclusive as "só para mim". Para os jogadores nada muda: o resultado aparece para todos, exceto em rolagens privadas ou cegas.

## v0.2.3

### Mudanças

- **Skin Pulp refeita no estilo Weird Tales**, com o clima das revistas de horror dos anos 30 no lugar do visual de quadrinho:
  - papel de polpa amarelado e manchado, tinta preta, vermelho-sangue, ocre e um verde doentio no alvo;
  - tipografia de impressão antiga (IM Fell English), com vinhetas ❦ nos títulos de seção;
  - retratos em camafeus ovais, em sépia;
  - mais discreta, com as mesmas medidas das outras skins.

## v0.2.2

### Novidades

- **Integração com o PopOut!**: com o módulo [PopOut!](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) ativo, o cabeçalho do HUD ganha um botão para abrir o HUD numa janela separada (ótimo para um segundo monitor). O mesmo botão o traz de volta. Na janela separada, o HUD ocupa o espaço todo e os cartões se esticam. Há também um atalho de teclado opcional em **Configurar Controles**.

### Mudanças

- **Cartões respeitam o tipo de rolagem**:
  - **pública**: todos veem, com os resultados dos dados já abertos;
  - **privada**: só o mestre e quem rolou;
  - **cega**: o mestre vê tudo; quem rolou vê o cartão sem os resultados; os demais não veem;
  - **só para mim**: só quem rolou, nem o mestre.
  - Cartões não públicos ganham um selo indicando o tipo de rolagem.
- **Cartões limpos a cada rodada**: o HUD mostra só os cartões da rodada atual, e no chat continuam todos. A nova opção **Limpar cartões do HUD** permite limpar a cada rodada (padrão), a cada turno ou nunca.

## v0.2.1

### Mudanças

- **Cartões ao lado**: o HUD agora tem duas colunas. Iniciativa, investigador e dano rápido ficam à esquerda, e os cartões do CoC7 à direita, numa coluna mais larga e fácil de ler.

### Correções

- **PV privados**: jogadores só veem os pontos de vida dos próprios investigadores. A barrinha de PV na iniciativa aparece apenas para o mestre e para o dono do personagem.
- As mensagens do dano rápido, que mostram o PV resultante, agora vão só para o mestre e para o dono do ator atingido.

## v0.2.0

### Novidades

- **Nova skin Pulp**, no visual de capa de revista pulp dos anos 30:
  - papel jornal com retícula, contorno preto grosso e sombras duras;
  - título "COMBATE!" em estilo quadrinho e faixas inclinadas nos títulos de seção;
  - retrato do investigador numa "explosão" amarela e botões que afundam ao clicar;
  - arma sem munição "tremendo".
- **Nova skin Moderna**, um HUD tático para campanhas na era moderna:
  - vidro fosco escuro com cantos arredondados e destaque ciano;
  - barras finas com brilho e indicador "ao vivo" no cabeçalho;
  - cartões do sistema em painéis claros.
- Para trocar de skin: **Configurações → Combat Cthulhu HUD → Visual**. É por usuário, então cada jogador escolhe a sua.

## v0.1.1

### Novidades

- **Recarregar arma no HUD**: armas de fogo mostram a munição atual e a capacidade (ex.: `2/6`) ao lado do botão de ataque.
  - **Clique**: recarrega o pente e anuncia no chat.
  - **Shift+clique**: coloca uma bala.
  - **Botão direito**: tira uma bala.
  - Arma vazia fica em vermelho, pulsando.
- O contador acompanha os disparos feitos pelos cartões do CoC7 e pela ficha.

## v0.1.0

Primeira versão: iniciativa, PV/PM/SAN/Sorte, condições, ações rápidas, dano rápido, cartões do CoC7 jogáveis dentro do HUD e skin Anos 20 (Art Déco).
