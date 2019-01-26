const Command = require("../base/Command");
const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

class BunnyCmd extends Command {
  constructor (client) {
    super(client, {
      name: "legit",
      description: "Makes a 'looks legit' meme.",
      category: "Meme Maker",
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
    const msg = await message.channel.send(`${this.client.config.emojis.loading} Preparing the setup for you.`);
    await msg.edit("Please answer following questions in order to make your meme. You can say `cancel` to stop the setup.");

    let topText = await this.client.awaitReply(message, "What look weird :", 60000);
    if (topText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 69) return reply("Text can be maximum 69 characters length.");

    await msg.edit(`${this.client.config.emojis.loading} Please wait while printing your meme.`);

    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 10%`);
    const image = await fsn.readFile("./templates/45.png");
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 35%`);
    topText = this.client.separateText(topText, 23, 10);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 45%`);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 55%`);
    const location = await this.client.textLocation(topText.length, 315, 80, true, true, 0.001, 0.5);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 75%`);
    const newMeme = new Canvas(630, 600)
      .addImage(image, 0, 0, 630, 600)
      .setColor("#000000")
      .setTextFont('blod 29px Impact')
      .setTextAlign('center')
      .addText(topText, location.from, location.to)
      .toBuffer();
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 99%`);
    const attachment = new Discord.Attachment(newMeme, 'image.png');
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 100%`);
    await msg.delete();
    message.channel.send("Your 'looks legit' meme is ready:", attachment);
  }
}

module.exports = BunnyCmd;
