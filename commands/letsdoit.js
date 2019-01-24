const Command = require("../base/Command");
const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

class DoCmd extends Command {
  constructor (client) {
    super(client, {
      name: "letsdoit",
      description: "Makes a 'lets do it' meme.",
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

    let topText = await this.client.awaitReply(message, "Please tell me what text i should put on top of the meme.", 60000);
    if (topText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 21) return reply("Text on the top of the meme must be maximum 21 characters length.");

    let bottomText = await this.client.awaitReply(message, "Please tell me what text i should put on bottom of the meme. If you want to leave blank, type `.`.", 60000);
    if (bottomText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (bottomText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 21) return reply("Text on the bottom of the meme must be maximum 21 characters length.");

    if (bottomText === ".") bottomText = "";

    await msg.edit(`${this.client.config.emojis.loading} Please wait while printing your meme.`);

    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 10%`);
    const image = await fsn.readFile("./templates/44.png");
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 35%`);
    topText = this.client.separateText(topText, 21, 40);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 45%`);
    bottomText = this.client.separateText(bottomText, 21, 40);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 55%`);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 75%`);
    const newMeme = new Canvas(430, 300)
      .addImage(image, 0, 0, 430, 300)
      .setColor('#ffffff')
      .setTextFont('bold 28px Impact')
      .setTextAlign('center')
      .addText(topText, 215, 30)
      .addText(bottomText, 215, 270)
      .toBuffer();
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 99%`);
    const attachment = new Discord.Attachment(newMeme, 'image.png');
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 100%`);
    await msg.delete();
    message.channel.send("Your 'lets do it' meme is ready:", attachment);
  }
}

module.exports = DoCmd;