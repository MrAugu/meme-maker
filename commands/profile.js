const Command = require("../base/Command");
const db = require("../config").mongo;
const Discord = require("discord.js");
const mongoose = require("mongoose");
const Profile = require("../models/profile.js");

mongoose.connect(db, {
  useNewUrlParser: true
});
  
class ProfileCmd extends Command {
  constructor (client) {
    super(client, {
      name: "profile",
      description: "Show your profile or other's person profile.",
      category: "General",
      usage: "[user]",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 10,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars

    const target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    Profile.findOne({ id: target.id }, async (err, data) => {
      if (err) this.client.logger.error(err);
      
      if (!data) {
        const newProfile = new Profile({
          id: target.id,
          bio: "I'm a very mysterious person.",
          score: 0,
          points: 0,
          badges: [],
          totalPosts: 0,
          ownPosts: []
        });

        await newProfile.save().catch(e => this.client.logger.error(e));
        return reply("Registered user to database. Try again to see it's profile.");
      }

      const u = await this.client.fetchUser(data.id);

      if (data.ownPosts.length < 1) data.ownPosts.push("NONE");

      if (data.badges.length < 1) data.badges.push("NONE");
      
      const profileEmbed = new Discord.RichEmbed()
        .setTitle(`${u.tag}'s Profile`)
        .setThumbnail(u.displayAvatarURL)
        .setDescription(`
=> Bio: ${data.bio}
=> Score: ${data.score}
=> Points: ${data.points}
=> Badges: ${data.badges.join(", ")}
=> Total Posts: ${data.totalPosts}
=> Posts: \`${data.ownPosts.join("`, `")}\`
        `)
        .setColor("#000000")
        .setTimestamp();

      reply(profileEmbed);
    });
  } 
}

module.exports = ProfileCmd;
