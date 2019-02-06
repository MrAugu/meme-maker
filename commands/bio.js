const Command = require("../base/Command");
const db = require("../config").mongo;
const mongoose = require("mongoose");
const Profile = require("../models/profile.js");

mongoose.connect(db, {
  useNewUrlParser: true
});

class BioCmd extends Command {
  constructor (client) {
    super(client, {
      name: "bio",
      description: "Set your own profile bio.",
      category: "General",
      usage: "<bio>",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 30,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    Profile.findOne({ id: message.author.id }, async (err, data) => {
      if (err) this.client.logger.error(err);
      
      if (!data) {
        const newProfile = new Profile({
          id: message.author.id,
          bio: args.join(" "),
          score: 0,
          points: 0,
          badges: [],
          totalPosts: 0,
          ownPosts: []
        });

        await newProfile.save().catch(e => this.client.logger.error(e));
        return reply({embed: {
	     color: 49307,
         description: `**Sucessfully** set your bio to \`${args.join(" ")}\`.`
                             }
                    });
      }

      data.bio = args.join(" ");
      data.save().catch(e => this.client.logger.error(e));
      return reply({embed: {
	     color: 49307,
         description: `**Sucessfully** set your bio to \`${args.join(" ")}\`.`
                             }
                    });
    });
  } 
}

module.exports = BioCmd;