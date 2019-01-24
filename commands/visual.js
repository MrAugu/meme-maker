const emoji = require("../base/emojis.json");
const Command = require("../base/Command");
const Discord = require ("discord.js");
var fs = require('fs');

class VisualCmd extends Command {
    constructor (client) {
        super(client, {
            name: "visual",
            description: "Visualy preview templates sample.",
            category: "General",
            usage: "",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permLevel: "User",
            cooldown: 3,
            args: false
        });
    }

    async run (message,  client, args, level, reply) {

      var i = 1;
        
		    var tempsamp = fs.readFileSync('templatessample.txt').toString().split("\n");
            var titles = fs.readFileSync('templates.txt').toString().split("\n");
	    	var title = titles[i-1]
			var temp0samp = tempsamp[i-1]
        const embed = new Discord.RichEmbed()
            .setAuthor("Templates preview")
            .setDescription(`command : **-${title}**`)
			.setImage(temp0samp)
            .setTimestamp()
            .setColor("#00c09b")
            .setFooter(`MemeMaker ©`);
      const msg = await message.channel.send(embed);

        await msg.react(emoji.pre)
        await msg.react(emoji.nex);
        await msg.react(emoji.stp);
        const collector = msg.createReactionCollector((reaction, user) =>  user !== client.user );
        collector.on('collect', async (messageReaction) => {
            if( message.author.id !== messageReaction.users.last().id || client.id ==messageReaction.users.last().id ) return;
            const chosen = messageReaction.emoji.name;
  messageReaction.remove(messageReaction.users.last());
  
              if (chosen === emoji.nex) {
		  
				  if( i === 59 ) i = 0;
				i += 1;
			var tempsamp = fs.readFileSync('templatessample.txt').toString().split("\n");
            var titles = fs.readFileSync('templates.txt').toString().split("\n");
	    	var title = titles[i-1]
			var temp0samp = tempsamp[i-1]
        const embed2 = new Discord.RichEmbed()
            .setAuthor("Templates preview")
            .setDescription(`command : **-${title}**`)
			.setImage(temp0samp)
            .setTimestamp()
            .setColor("#00c09b")
            .setFooter(`MemeMaker ©`);
       msg.edit(embed2);
                
            }

            if (chosen === emoji.pre) {
				if (i === 1) return i = 60
				i -= 1;
				var tempsamp = fs.readFileSync('templatessample.txt').toString().split("\n");
            var titles = fs.readFileSync('templates.txt').toString().split("\n");
	    	var title = titles[i-1]
			var temp0samp = tempsamp[i-1]
        const embed2 = new Discord.RichEmbed()
            .setAuthor("Templates preview")
            .setDescription(`command : **-${title}**`)
			.setImage(temp0samp)
            .setTimestamp()
            .setColor("#00c09b")
            .setFooter(`MemeMaker ©`);
       msg.edit(embed2);
                
            }
            if (chosen === emoji.stp) {

                collector.stop();
                msg.delete();
                message.channel.send({
                    embed: {
                        color: 15105570,
                        description: `:white_check_mark: **Visual preview closed!**`
                    }
                });
            }
        });



    }
}

module.exports = VisualCmd;
