/* 							ZIK! Bot
						Created by vcoding#4488
						    @vincent_coding

						For the server Theotime.me
						https://discord.gg/PuU3BSJ
*/

/*   1 / Variables
====================================================== */

const Discord = require('discord.js'), 
	client = new Discord.Client(),
      	ytdl = require('ytdl-core'),
	activities_list = [
	  "",
	  "de la musique", 
	  "Imagine Dragons - Believer",
	  "un concert de musique",
	  "les derniers albums sorties",
	  "la radio",
	  "petit poney. Attends quoi !"
	],
      chat_list = [
	 "",
	 "https://vincent-p.netlify.com/discord/zik!/chat1.png",
	 "https://vincent-p.netlify.com/discord/zik!/chat2.png",
	 "https://vincent-p.netlify.com/discord/zik!/chat3.png",
	 "https://vincent-p.netlify.com/discord/zik!/chat4.png",
	 "https://vincent-p.netlify.com/discord/zik!/chat5.png",
	 "https://vincent-p.netlify.com/discord/zik!/chat6.png"
      ],
      chien_list = [
	 "",
	 "https://vincent-p.netlify.com/discord/zik!/chien1.jpg",
	 "https://vincent-p.netlify.com/discord/zik!/chien2.png",
	 "https://vincent-p.netlify.com/discord/zik!/chien3.png",
	 "https://vincent-p.netlify.com/discord/zik!/chien4.png",
	 "https://vincent-p.netlify.com/discord/zik!/chien5.png",
	 "https://vincent-p.netlify.com/discord/zik!/chien6.png"
      ];


const prefix = "!";


/*   2/ Lancement du bot
====================================================== */
client.on('ready', () => {
	const   d = new Date(),
	_d = d.getDate() < 10 ? "0"+d.getDate() : d.getDate(),
	m = d.getMonth() +1 < 10 ? "0"+(d.getMonth() +1) : d.getMonth() +1,
	y = d.getFullYear(),
	h = d.getHours() +1 < 10 ? "0"+(d.getHours() +1) : d.getHours() +1,
	_m = d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes();
	
	client.user.setActivity('Reload');
	client.channels.find("id", "554711744279478293").send({"embed": {
		"title": "Reload",
		"description": "ZIK! a reload le : " +_d+"/"+m+"/"+y+" à "+h+":"+_m+".",
		"color": 16777215
   	}});
	client.user.setUsername('ZIK!');
	setInterval(() => {
	      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
	      client.user.setActivity(activities_list[index], { type: 'LISTENING' });
	}, 2500);
});


/*   3 / Functions
====================================================== */
client.on('message', msg => {
	const prefix = "!";
	var command = msg.content.split(" ")[0].slice(prefix.length).toLowerCase(),
       		args = msg.content.split(" ").slice(1);
    	let suffix = args.join(" ");
	
	if(!msg.content.startsWith(prefix)) {
	   return;
	}
	
	function isAdmin(){
		if (msg.member.roles.find('name', 'Fondateurs')){
			return true;
		} else {
			return false;
		}
	}
	
	function isAnimateur(){
			if (msg.member.roles.find('name', 'Animateur/Animatrice')){
			return true;
		} else {
			return false;
		}
	}
	
	function isAuth(){ // use msg.author
		if (msg.member.roles.find('name', 'noBot')){
			return false;
		} else {
			return true;
		}
	}
	
	// Pour éviter que le bot se réponde tout seul
	if (msg.author.bot) return false;
	if (msg.channel.type == "dm") return false;
	

	
	
/*   4 / Custom commande 
====================================================== */
	
	// Usercount
	if(command === "usercount") {
		const nbrmember = msg.member.guild.memberCount;
		const nbrmembernoBot = nbrmember - 5;
		msg.channel.send({"embed":{
			"title":"**:boy: Nombres d'utilisateur :girl: **","description":"Il y a actuellement "+nbrmember+" comptes (bot + utilisateur) sur le serveur !\nIl y a "+nbrmembernoBot+" utilisateurs sans les bots !",
			"color":16777215
		}});
	}
	
	// ZIK! Admin
	if(command === "admin") {
		msg.channel.send({"embed":{
			"title":"Mes créateurs","description":"Mon développeurs principal est : @vcoding#4488\nMon dévelopeurs secondaire est : @Théotime#6461\n\nSe sont mes uniques créateur !",
			"color":16777215
		}});
	}
	
	// Random cat
	if(command === "cat") {
		const chat_index = Math.floor(Math.random() * (chat_list.length - 1) + 1);
		const chat_index_embed = chat_list[chat_index];
		const msgmembername = msg.member.user;
		msg.channel.send({"embed": {
        		"color": 16777215,
        		"title": "Voila",
        		"description": "Voici le chat que "+msgmembername+" a demandé !\n\n",
			"image": {
           		"url": chat_index_embed
		        }
		}});
	}
	
	//Random dog
	if(command === "dog"|| command === "chien") {
		const chien_index = Math.floor(Math.random() * (chien_list.length - 1) + 1);
		const chien_index_embed = chien_list[chien_index];
		const msgmembername = msg.member.user;
		msg.channel.send({"embed": {
        		"color": 16777215,
        		"title": "Voila",
        		"description": "Voici le chien que "+msgmembername+" a demandé !\n\n",
			"image": {
           		"url": chien_index_embed
		        }
		}});
	}
	
	// Say
	if (command === "say") {
	const saymembername = msg.member.user;
		if(isAdmin()) {
			msg.delete();
			if (!suffix) {
				msg.author.createDM().then(channel => {
					return channel.send({"embed": {
						"title": "Erreur de syntaxe",
						"color": 16711680,
						"description": "Vous avez faire une erreur de syntaxe, voici la commande :\n\n!say Mon message"
    					}});
	 			});
				return;
			}
			
			msg.channel.send(`${suffix}`);
		}else {
			msg.delete();
			if (!suffix) {
				msg.author.createDM().then(channel => {
					return channel.send({"embed": {
						"title": "Erreur de syntaxe",
						"color": 16711680,
						"description": "Vous avez faire une erreur de syntaxe, voici la commande :\n\n!say Mon message"
    					}});
	 			});
				return;
			}
			msg.channel.send(`${suffix}\n\nCe message a été posté par : ${saymembername}`);
		}
	}
	
	// code
	if (command === "code") {
	const saymembername = msg.member.user;
		if(isAdmin()) {
			msg.delete();
			if (!suffix) {
				msg.author.createDM().then(channel => {
					return channel.send({"embed": {
						"title": "Erreur de syntaxe",
						"color": 16711680,
						"description": "Vous avez faire une erreur de syntaxe, voici la commande :\n\n!code Mon code"
    					}});
	 			});
				return;
			}
			
			msg.channel.send(`\`\`\`Markdown\n${suffix}\`\`\``);
		}else {
			msg.delete();
			if (!suffix) {
				msg.author.createDM().then(channel => {
					return channel.send({"embed": {
						"title": "Erreur de syntaxe",
						"color": 16711680,
						"description": "Vous avez faire une erreur de syntaxe, voici la commande :\n\n!code Mon code"
    					}});
	 			});
				return;
			};
			msg.channel.send(`\`\`\`Markdown\n${suffix}\`\`\`\n Posté par ${saymembername}`);
		}
	}
	
	//help or aide
	if(command === "help"||command === "aide"||command === "aides") {
		const helpmembername = msg.member.user;
			msg.delete()
			msg.author.createDM().then(channel => {
				return channel.send({"embed": {
					"title": "Commande de ZIK!",
					"color": 16777215,
					"description": "Voici le prefix de ZIK! : !\n\n:ferris_wheel: Commande fun :ferris_wheel: \n!`dog` : Montre une image aléatoire de chien\n!`cat` : Montre une image aléatoire de chat\n\n:pencil2: Commande utile :pencil2: \n`!usercount` : Donne le nombre d'utilisateurs sur le serveur\n`!say` votre message : Affiche votre message\n`!code` votre code : Affiche votre code\n`!aide` ou `!help` : Affiche les commande de ZIK!"
				   }});
		});
		msg.reply("La liste des commandes vous à été envoyé en mp !");
	}
	
	// cFakeBAN
	if(command === "fakeban") {
		if(isAdmin) {
			const FakeBanName = suffix;
			msg.delete();
			if(!suffix) {
				msg.author.createDM().then(channel => {
					return channel.send({
					    "embed": {
						"title": "Erreur syntaxe",
						"color": 16711680,
						"description": "Erreur dans la syntaxe.\nVoici le type de syntaxe : \n!fakeban @Théotime"
					}});
				});
			}else {
				msg.channel.send({"embed": {
					"title": "FakeBan",
					"color": 16777215,
					"description": "Lancement du ban pour **" + FakeBanName + "**"
				}});
				msg.author.createDM().then(channel => {
					return channel.send({"embed": {
						"color": 16711680,
						"description": "Nous sommes désolé mais vous avez été ban du serveur **Théotime.me** car vous n'avez pas respecter les règles.\nVotre sanction est **permanante** !\n\n*Si vous voulez contesté votre ban, merci de contacter un des administrateurs du serveur !*\n*Les message du genre : **`Jsuis ban pour rien`** ne sont pas accepter !*",
						"title": "Non respect des règles."
					    }});
				});
			}
		}
	}
	
	// Profil
	if(command === "profil") {
		const profilenames = msg.member.user,
		      profileid = msg.member.id,
		      profilehightrole = msg.member.highestRole,
		      profileimg = msg.author.avatarURL,
		      profilestatus = msg.author.presence.status == "online" ? "Disponible" : msg.author.presence.status == "idle" ? "Inactif" : msg.author.presence.status == "dnd" ? "Ne pas déranger" : "Invisible";
		if(msg.author.avatarURL == "null"){
			const profileimg = "https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png";
		}
		msg.channel.send({"embed": {
			"title": "Votre profil :",
			"color": 16777215,
			"fields": [
			    {
				"name": "◦ Pseudo",
				"value": ""+profilenames+"",
				"inline": true
			    },
			    {
				"name": "◦ ID",
				"value": ""+profileid+"",
				"inline": true
			    },
			    {
				"name": "◦ Role le plus haut",
				"value": ""+profilehightrole+"",
				"inline": true
			    },
			    {
				 "name": "◦ Status",
				 "value": ""+profilestatus+"",
				 "inline": true
			    }
			],
			 "thumbnail": {
			    "url": profileimg
			}
    		}});
	}
	

/*   5 / Musique commande
====================================================== */


// Fermeture des commandes !
});


/*   6 / Login
====================================================== */

client.login(process.env.TOKEN);
