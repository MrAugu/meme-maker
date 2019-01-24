const Command = require("../base/Command");
const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

class CryCmd extends Command {
  constructor (client) {
    super(client, {
      name: "cry",
      description: "Makes a crying man meme.",
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

    let topText = await this.client.awaitReply(message, "Please tell me what makes you cry.", 60000);
    if (topText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 200) return reply("Texts must be maximum 200 characters length.");

    let bottomText = await this.client.awaitReply(message, "Please tell me what makes you cry more.", 60000);
    if (bottomText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (bottomText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 200) return reply("Texts must be maximum 200 characters length.");

    await msg.edit(`${this.client.config.emojis.loading} Please wait while printing your meme.`);

    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 10%`);
    const image = await fsn.readFile("./templates/19.jpg");
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 35%`);
    topText = this.client.separateText(topText, 18, 20);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 45%`);
    bottomText = this.client.separateText(bottomText, 18, 20);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 55%`);
    const location = await this.client.textLocation(topText.length, 127, 127, true, true, 0.1, 0.5);
    const location2 = await this.client.textLocation(bottomText.length, 127, 384, true, true, 0.1, 0.5);
    console.log(location, location2);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 75%`);
    const newMeme = new Canvas(528.75, 528.75)
      .addImage(image, 0, 0,528.75, 528.75)
      .setColor("#000000")
      .setTextFont('24px Impact')
      .setTextAlign('center')
      .addText(topText, location.from, location.to)
      .addText(bottomText, location2.from, location2.to)
      .toBuffer();
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 99%`);
    const attachment = new Discord.Attachment(newMeme, 'image.png');
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 100%`);
    await msg.delete();
    message.channel.send("Your crying man meme is ready:", attachment);
  }
}

module.exports = CryCmd;