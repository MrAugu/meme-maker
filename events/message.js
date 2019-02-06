const Discord = require("discord.js"); // eslint-disable-line no-unused-vars
const cooldowns = new Discord.Collection();

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (message) {
    if (message.author.bot) return;

    const reply = (c) => message.channel.send(c);

    if (message.content.indexOf(this.client.config.prefix) !== 0) return;

    const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "loader") {
      return reply(this.client.config.emojis.loading);
    }
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);

    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    const level = await this.client.permlevel(message);

    if (cmd.conf.enabled === false) return reply(":x: **This command is currently globally disabled.**");

    if (cmd.conf.args === true && !args.length) {
      return reply(`You haven't provided any arguments. Correct Usage: \`${this.client.config.prefix}${cmd.help.name} ${cmd.help.usage}\``);
    }

    if (!cooldowns.has(cmd.help.name)) {
      cooldowns.set(cmd.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.help.name);
    const cooldownAmount = cmd.conf.cooldown * 1000;

    if (!timestamps.has(message.author.id)) {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return reply(`:raised_hand: Slow it down dude.\n**You have to wait ${timeLeft.toFixed(1)} seconds before using **\`${cmd.help.name}\` **again.**`);
      }
        
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
      

    if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send(":x: This command is unavailable via private message.\n**Please run this command in a server.**");

    const noPermEmbed = new Discord.RichEmbed()
      .setTitle("FORBIDDEN!")
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`
:octagonal_sign: **Forbidden!** You do not have the required permissions to use \`${cmd.help.name}\`.

Required Permission Level: ${this.client.levelCache[cmd.conf.permLevel]} - ${cmd.conf.permLevel}
Your Permission Level: ${level} - ${this.client.config.permLevels.find(l => l.level === level).name}
        `)
      .setTimestamp();
    if (level < this.client.levelCache[cmd.conf.permLevel]) return reply(noPermEmbed);

    message.flags = [];
    while (args[0] &&args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    this.client.logger.cmd(`${message.author.tag} [ID: ${message.author.id}] run ${cmd.help.name} in ${message.guild.name} [ID: ${message.guild.id}]. (|${message.content}|)`);

    try {
      message.channel.startTyping(100);
      await cmd.run(message, args, level, reply);
      message.channel.stopTyping(true);
    } catch (e) {
      reply(`${this.client.config.emojis.fp} **Oops seems like these was an error executing command.** We tracked error and we will get right into it.\n(Error: ${e})`);
      message.channel.stopTyping(true);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle("**An Error Occured!**")
        .setDescription(`**An error occured** while running \`${cmd.help.name}\`.\n The error is: \n\`\`\`xl\n${e}\n\`\`\``)
        .setColor("RED")
        .setTimestamp();
      // this.client.channels.get("537745563094089740").send(errEmbed);
    }
  }
};
