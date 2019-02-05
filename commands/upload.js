const Command = require("../base/Command");
const db = require("../config").mongo;
const Discord = require("discord.js");
const mongoose = require("mongoose");
const posts = require("../models/posts.js");
const validUrl = require("valid-url");
const request = require("request");

mongoose.connect(db, {
  useNewUrlParser: true
});
  
class UploadCmd extends Command {
  constructor (client) {
    super(client, {
      name: "upload",
      description: "Upload a meme to database.",
      category: "General",
      usage: "[url]",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 10,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    let img;

    if (!args[0]) {
      if (!message.attachments.first()) return reply("You must upload a image, whether by using command with an attachament or providing url.");
      img = message.attachments.first().url;
      if (!img) return reply("You must upload a image, whether by using command with an attachament or providing url.");
    } else if (args[0]) {
      if (!validUrl.isUri(args[0])) {
        reply("You must upload a image, whether by using command with an attachament or providing url.");
      }
    } else {
      return reply("You must upload a image, whether by using command with an attachament or providing url.");
    }

    if (!img) return reply("You must upload a image, whether by using command with an attachament or providing url.");

    const memeCount = await posts.countDocuments();
    const id = memeCount + 1;

    const api = `https://mraugu.ga/bret/memes/upload.php?url=${img}&name=${id}.png&secret=37ks8`;
    request(api);

    const newMeme = new posts({
      id: id,
      url: `https://mraugu.ga/bret/memes/${id}.png`,
      upvotes: 0,
      downvotes: 0,
      publisher: message.author.id,
      moderator: "no one",
      status: 0
    });

    await newMeme.save().catch(e => this.client.logger.error(e));
    this.client.memes.push(message.author.id);

    const emd = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle("Sucessfully uploaded your meme.")
      .setDescription(`You meme has been queued and waiting verification by a content moderator.\nMeme ID: \`#${id}\``)
      .setColor(this.client.config.colors.invisible)
      .setFooter(`#${id}`)
      .setTimestamp();
    reply(emd);

    const logEmbed = new Discord.RichEmbed()
      .setTitle(`Meme #${id} Arived`)
      .setDescription(`ID: \`#${id}\`\nPosted By: ${message.author.tag} (ID: ${message.author.id})\n`)
  }
}


module.exports = UploadCmd;
