const emoji = require("config.js");
const Command = require("../base/Command");
const Discord = require ("discord.js");
var i = 0;

class TempCmd extends Command {
    constructor (client) {
        super(client, {
            name: "templates",
            description: "See a list of templates.",
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

        const templates = [];
       i = 0;
        for ( i ; i < 10; i++) {
            try {
                var fs = require('fs');
                var temp = fs.readFileSync('templates.txt').toString().split("\n");
          
                templates.push(`\`${i+1}\` → **-${temp[i]}**`);
            } catch (e) {}
        }
        const embed = new Discord.RichEmbed()
            .setAuthor("Templates list :")
            .setDescription(`${templates.join("\n")}`)
            .setTimestamp()
            .setColor("#00c09b")
            .setFooter(`MemeMaker ©`);
      const msg = await message.channel.send(embed);


        await msg.react(emoji.config.nex);
        await msg.react(emoji.config.stp);
        const collector = msg.createReactionCollector((reaction, user) =>  user !== client.user );
        collector.on('collect', async (messageReaction) => {
            if( message.author.id !== messageReaction.users.last().id || client.id ==messageReaction.users.last().id ) return;
            const chosen = messageReaction.emoji.config.name;
  messageReaction.remove(messageReaction.users.last());

            if (chosen === emoji.config.nex) {
                const templates2 = [];
                var a = i;
                for ( i ; i < a+10 ; i++) {
                    try {
                         if (a == 60 ){              //a is the number of the memes
                         i =10;
                         msg.edit(embed);
                         return;              
                           }
                        var fs = require('fs');
                        var temp2 = fs.readFileSync('templates.txt').toString().split("\n");
                        
                        templates2.push(`\`${i+1}\` → **-${temp2[i]}**`);
                         
                        
                    } catch (e) {}
        }
            const embed2 = new Discord.RichEmbed()
            .setAuthor("Templates list :")
            .setDescription(`${templates2.join("\n")}`)
            .setTimestamp()
            .setColor("#00c09b")
            .setFooter(`MemeMaker ©`);
      msg.edit(embed2);
              return;
                
            }
            if (chosen === emoji.config.stp) {

                collector.stop();
                msg.delete();
                message.channel.send({
                    embed: {
                        color: 15105570,
                        description: `:white_check_mark: **Menu closed!**`
                    }
                });
            }
        });



    }
}

module.exports = TempCmd;