const Command = require("../base/Command");

class HelpCmd extends Command {
  constructor (client) {
    super(client, {
      name: "help",
      description: "See a list of working commands.",
      category: "General",
      usage: "",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 30,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    var index = 0;
    const cmds = this.client.commands.map(c => `${index++} - ${c.help.name}: ${c.help.description}`);
    reply(`List of currently available commands:\n\n${cmds.join("\n")}`);
  } 
}

module.exports = HelpCmd;
