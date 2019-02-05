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
    const m = await reply("Pong!");
    const cLatency = Math.round(this.client.ping);
    const tLatency = m.createdTimestamp - message.createdTimestamp;
    
    m.edit(`It only took me **${tLatency}**MS, oh, and, my heartbeat is **${cLatency}**MS!`);
  }
    
}

module.exports = PingCmd;