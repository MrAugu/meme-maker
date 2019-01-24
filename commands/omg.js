const Command = require("../base/Command");
const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

class OmgCmd extends Command {
  constructor (client) {
    super(client, {
      name: "omg",
      description: "Makes a 'OMG' meme.",
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

    let topText = await this.client.awaitReply(message, "Please tell me what drake dosen't like.", 60000);
    if (topText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 200) return reply("Texts must be maximum 200 characters length.");

    let bottomText = await this.client.awaitReply(message, "Please tell me what surprizes you.", 60000);
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
    const image = await fsn.readFile("./templates/6.jpg");
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 35%`);
    topText = this.client.separateText(topText, 30, 10);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 45%`);
    bottomText = this.client.separateText(bottomText, 30, 10);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 55%`);
    const location = await this.client.textLocation(topText.length, 155, 122, true, true, 0.1, 1);
    const location2 = await this.client.textLocation(bottomText.length, 155, 384, true, true, 0.1, 1);
    console.log(location, location2);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 75%`);
    const newMeme = new Canvas(651.1, 510)
      .addImage(image, 0, 0, 651.1, 510)
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
    message.channel.send("Your drake meme is ready:", attachment);
  }
}

module.exports = OmgCmd;