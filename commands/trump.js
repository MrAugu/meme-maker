const Command = require("../base/Command");
const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

class TrumpCmd extends Command {
  constructor (client) {
    super(client, {
      name: "trump",
      description: "Makes a trump meme.",
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

    let topText = await this.client.awaitReply(message, "Please tell me text to place on page 1.", 60000);
    if (topText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 120) return reply("Texts must be maximum 120 characters length.");

    let bottomText = await this.client.awaitReply(message, "Please tell me text to place on page 2.", 60000);
    if (bottomText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (bottomText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 120) return reply("Texts must be maximum 120 characters length.");

    await msg.edit(`${this.client.config.emojis.loading} Please wait while printing your meme.`);

    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 10%`);
    const image = await fsn.readFile("./templates/5.jpg");
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 35%`);
    topText = this.client.separateText(topText, 14, 20);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 45%`);
    bottomText = this.client.separateText(bottomText, 14, 20);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 55%`);
    const location = await this.client.textLocation(topText.length, 260, 230, false, true, 0, 0.7);
    const location2 = await this.client.textLocation(bottomText.length, 400, 230, false, true, 0, 0.7);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 75%`);
   const newMeme = new Canvas(500, 400)
      .addImage(image, 0, 0, 500, 400)
      .setColor("#000000")
      .setTextFont('16px Impact')
      .setTextAlign('center')
      .addText(topText, 260, location.to)
      .addText(bottomText, 400, location2.to)
      .toBuffer();
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 99%`);
    const attachment = new Discord.Attachment(newMeme, 'image.png');
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 100%`);
    await msg.delete();
    message.channel.send("Your trump meme is ready:", attachment);
  }
}

module.exports = TrumpCmd;