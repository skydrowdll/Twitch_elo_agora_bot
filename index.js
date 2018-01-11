/*

+============================+
	Bot Twitch for get Elo
		   By BlackSnow
+============================+


*/

console.log("+============================+")
console.log("    Bot Twitch for get Elo")
console.log("        By BlackSnow")
console.log("+============================+")

var prefix = "!agora";
var request = require("request")
const utf8 = require('utf8');
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
		password: "oauth:xxxxxxxxxxxxxxxxxxxxx" // https://twitchapps.com - pour creer sa cle oauth twitch
	},
	channels: ['#skydrowdll']
}
var client = new tmi.client(options);
client.connect();

client.on("chat", (channel, user, message, self) =>{
	if(self) return

	if(channel = "#skydrowdll"){
		var n = message.includes(prefix);
		if(n){
			mystring = message.replace(prefix+" ",'');
			var url = utf8.encode('https://api.agora.gg/v1/players/search?name='+mystring);
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
						        
						        if(rank=="bronze"){client.say("#skydrowdll", "Tu es Bronze avec "+elo+" elo.")}
						        if(rank=="silver"){client.say("#skydrowdll", "Tu es Silver avec "+elo+" elo.")}
						        if(rank=="gold"){client.say("#skydrowdll", "Tu es Gold avec "+elo+" elo.")}
						        if(rank=="platin"){client.say("#skydrowdll", "Tu es Platine avec "+elo+" elo.")}
						        if(rank=="diams"){client.say("#skydrowdll", "Tu es Diams avec "+elo+" elo.")}
						        if(rank=="master"){client.say("#skydrowdll", "Tu es Master avec "+elo+" elo. (tu déchire tous là! fais une pause non ? :p")}
						        console.log("========")
						        console.log(elo)
						        console.log("========")
						    }else{
						    	client.say("#skydrowdll", "Error")
						    }
						})

			       }catch(err){
			 			client.say("#skydrowdll", "Le compte est privé ou le joueur en question n'existe pas!")
			       }
			    }
			})
		}
	}
})





/*
var cloudscraper = require('cloudscraper');

cloudscraper.get('https://agora.gg/profile/3806268/KoD_%20Skai-Ripa', function(error, response, body) {
  if (error) {
    console.log('Error occurred');
  } else {
    console.log(body, response);
  }
});

*/




