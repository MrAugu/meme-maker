const Command = require("../base/Command");
const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

class BrainCmd extends Command {
  constructor (client) {
    super(client, {
      name: "brain",
      description: "Makes an expanding brain meme.",
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

    let topText = await this.client.awaitReply(message, "Please tell me what to put on the first box.", 60000);
    if (topText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText.length > 200) return reply("Texts must be maximum 200 characters length.");

    let bottomText = await this.client.awaitReply(message, "Please tell me what to put on the second box.", 60000);
    if (bottomText === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (bottomText.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (bottomText.length > 200) return reply("Texts must be maximum 200 characters length.");
	
    let topText2 = await this.client.awaitReply(message, "Please tell me what to put on the third box.", 60000);
    if (topText2 === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (topText2.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (topText2.length > 200) return reply("Texts must be maximum 200 characters length.");

    let bottomText2 = await this.client.awaitReply(message, "Please tell me what to put on the fourth box.", 60000);
    if (bottomText2 === false) {
      reply("Prompt timed out.");
      return msg.delete();
    }

    if (bottomText2.toLowerCase() === "cancel") {
      reply("Aborted!");
      return msg.delete();
    }

    if (bottomText2.length > 200) return reply("Text must be maximum 200 characters length.");
	
	
    await msg.edit(`${this.client.config.emojis.loading} Please wait while printing your meme.`);

    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 10%`);
    const image = await fsn.readFile("./templates/4.jpg");
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 35%`);
    topText = this.client.separateText(topText, 21, 40);
    bottomText = this.client.separateText(bottomText, 21, 40);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 45%`);
    topText2 = this.client.separateText(topText, 21, 40);
    bottomText2 = this.client.separateText(bottomText, 21, 40);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 55%`);
    const location = await this.client.textLocation(topText.length, 200, 150, true, true, 0.1, 1);
    const location2 = await this.client.textLocation(bottomText.length, 200, 450, true, true, 0.1, 1);
	const location3 = await this.client.textLocation(topText.length, 200, 750, true, true, 0.1, 1);
    const location4 = await this.client.textLocation(bottomText.length, 200, 1050, true, true, 0.1, 1);
    console.log(location, location2);
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 75%`);
    const newMeme = new Canvas(857, 1202)
      .addImage(image, 0, 0, 857, 1202)
      .setColor("#000000")
      .setTextFont('34px Impact')
      .setTextAlign('center')
      .addText(topText, location.from, location.to)
      .addText(bottomText, location2.from, location2.to)
	  .addText(topText2, location3.from, location3.to)
      .addText(bottomText2, location4.from, location4.to)
      .toBuffer();
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 99%`);
    const attachment = new Discord.Attachment(newMeme, 'image.png');
    await msg.edit(`${this.client.config.emojis.loading} Priniting your meme... 100%`);
    await msg.delete();
    message.channel.send("Your expanding brain meme is ready:", attachment);
  }
}

module.exports = BrainCmd;