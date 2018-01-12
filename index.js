/*
+============================+
	Bot Twitch for get Elo
		   By BlackSnow
+============================+


 ecrivez !agora nom_du_joueur

*/

console.log("+============================+")
console.log("    Bot Twitch for get Elo")
console.log("        By BlackSnow")
console.log("+============================+")

var prefix = "!agora";
var request = require("request")
var tmi = require("tmi.js");

var options = {
	options: {
		debug: true
	},
	connection: {
		reconnect: true
	},
	identity: {
		username: "EloStore",
		password: process.env.BOT_TOKEN // https://twitchapps.com - pour creer sa cle oauth twitch
	},
	channels: [process.env.NAME_CHANNEL]
}
var client = new tmi.client(options);
client.connect();

client.on("chat", (channel, user, message, self) =>{
	if(self) return

	if(channel = 'process.env.NAME_CHANNEL'){ // #skydrowdll - nom du channel
		var n = message.includes(prefix);
		if(n){
			mystring = message.replace(prefix+" ",'');
			mystring = mystring.replace(prefix+" ",'%20');
			var url = 'https://api.agora.gg/v1/players/search?name='+mystring;
			request({
			    url: url,
			    json: true
			}, function (error, response, body) {
				var result = 'as';
			    if (!error && response.statusCode === 200) {
			       try{
			       		var string = JSON.stringify(body);
				        var objectValue = JSON.parse(string);
				        var responder = objectValue[0]['id'];
				        var url = "https://api.agora.gg/v1/players/"+responder
						request({
						    url: url,
						    json: true
						}, function (error, response, body) {
						    if (!error && response.statusCode === 200) {
						        var string = JSON.stringify(body);
						        var objectValue = JSON.parse(string);
						        var responder2 = objectValue['stats'][0]['elo'];
						        var elo = Math.round(responder2 * 100) / 100;
						        var rank = "nop";

						        if(elo>=0){rank = "bronze"}
						        if(elo>=1100){rank = "silver"}
						        if(elo>=1300){rank = "gold"}
						        if(elo>=1500){rank = "platin"}
						        if(elo>=1700){rank = "diams"}
						        if(elo>=2200){rank = "master"}
						        
						        if(rank=="bronze"){client.say(''+process.env.NAME_CHANNEL, "Tu es Bronze avec "+elo+" elo.")}
						        if(rank=="silver"){client.say(''+process.env.NAME_CHANNEL, "Tu es Silver avec "+elo+" elo.")}
						        if(rank=="gold"){client.say(''+process.env.NAME_CHANNEL, "Tu es Gold avec "+elo+" elo.")}
						        if(rank=="platin"){client.say(''+process.env.NAME_CHANNEL, "Tu es Platine avec "+elo+" elo.")}
						        if(rank=="diams"){client.say(''+process.env.NAME_CHANNEL, "Tu es Diams avec "+elo+" elo.")}
						        if(rank=="master"){client.say(''+process.env.NAME_CHANNEL, "Tu es Master avec "+elo+" elo. (tu déchire tous là! fais une pause non ? :p")}
						        console.log("========")
						        console.log(elo)
						        console.log("========")
						    }else{
						    	client.say(process.env.NAME_CHANNEL, "Error")
						    }
						})

			       }catch(err){
			 			client.say(process.env.NAME_CHANNEL, "Le compte est privé ou le joueur en question n'existe pas!")
			       }
			    }
			})
		}
	}
})





