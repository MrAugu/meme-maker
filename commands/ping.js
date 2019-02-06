const Command = require("../base/Command");

class PingCmd extends Command {
  constructor (client) {
    super(client, {
      name: "ping",
      description: "Pong!",
      category: "General",
      usage: "",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const m = await reply(":ping_pong: **Pong!**");
    const cLatency = Math.round(this.client.ping);
    const tLatency = m.createdTimestamp - message.createdTimestamp;
    
    m.edit({embed: {
	     color: 49307,
         description: `** It only took me **\`${tLatency}\`ms\n**Oh, and, my heartbeat is **\`${cLatency}\`ms!`
                   }
          });
  }
    
}

module.exports = PingCmd;