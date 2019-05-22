const config = {
  "token":  "NICE_TRY",
  "prefix": "-",
  "owner": "414764511489294347",
  "admins": ["270252850121146369"],
  "mongo": "YOURE_CURIOUS_HUH",
  
  "emojis": {
    "loading": "<a:loader:542349946041663488>",
    "fp": "<:fp:527540498693619728>",
	"nex": "➡",
    "stp": "❌"
  },

  "channels": {
    "postLogs": "",
    "decisionLogs": ""
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
          if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("BAN_MEMBERS") ||  message.member.roles.get(message.guild.settings.modRole) !== undefined) {
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
          if (message.member.hasPermission("ADMINISTRATOR") ||  message.member.roles.get(message.guild.settings.adminRole) !== undefined) {
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
