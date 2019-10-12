const config = {
  "token":  "NICE_TRY",
  "prefix": "-",
  "owner": "USER_ID",
  "admins": [],
  "mongo": "YOURE_CURIOUS_HUH",
  
  "emojis": {
    "loading": "DICORD_EMOJI/UNICODE",
    "fp": "DICORD_EMOJI/UNICODE",
	"nex": "➡",
    "stp": "❌"
  },

  "channels": {
    "postLogs": "CHANNEL_ID",
    "decisionLogs": "CHANNEL_ID"
  },

  "colors": {
    "invisible": "#36393e",
    "white": "#ffffff"
  },
  
  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },
    
    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("BAN_MEMBERS")) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    },
    
    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          if (message.member.hasPermission("ADMINISTRATOR")) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    },
  
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
  
  
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
  
    { level: 10,
      name: "Bot Owner", 
      check: (message) => config.owner === message.author.id
    }
  ]
};
    
module.exports = config;
