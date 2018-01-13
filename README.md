
COMMENT HEBERGER LE BOT 

1) créer toi un compte sur github.com
2) importe mon projet sur ton nouveaux projet pour avoir les 3 fichiers.

- Procfile
- package.json
- index.js

3) créer un compte sur heroku.com

4) selectionne node.js project

5) créer un nouveau projet 

6) dans "deployment method" selectionne github et cherche le nom du projet , clique connect

7) clique sur "ENABLE AUTOMATIC DEPLOYS" et"deploy branch"

8) maintenant va sur la page  "resources" et desactive "web" et active "worker"

9) maintenant va sur la page "setting" et clique sur le boutton "reveal config vars"

10) ajoute 3 clée

KEY	VALUE
BOT_CHANNEL	#urchanelname
BOT_LANGUE	french ou english
BOT_TOKEN	oauth:xxxxxxxx
pour la clée oauth tu dois la créer via https://twitchapps.com/tmi/

nice! maintenant tes utilisateurs et toi peuvent ecrire !agora nom_du_joueur et le bot ecrira les stats du joueur en question.


voily voilu, pour toute questions ou problemrs contactez moi sur le discord paragon france @hkz_ blacksnow
