
<center>
<h1 style="text-align:center; font-size: 100px; margin-top: 1px"><span style="color:#ff7777">KGB</span>ot</h1>
<p style="text-align:center;">
A discord bot working for the KGB.
</p>
</center>
## Info
This bot is written in javascript with [Node.js](https://nodejs.org).  It uses the [Discord.js](https://discord.js.org) library to interface with the [Discord API](https://discordapp.com/developers/docs/intro).

This bot is not meant for most people, it is mostly just a fun project, but if you have nothing else to do like me, this [very messy] code should be an ok jumping off point to creating your own bot.  Have fun and do whatever you want with it :)
## Getting Ready to Run
Follow these steps to prepare to run:
1. Create a discord application with a user. This  [tutorial](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) is pretty good.
2. Create an `auth.json` file containing the following:
```json
{
      "token": "YOUR-TOKEN-HERE"
}
```
3. Install node dependancies by running `npm install` in your command line.
4. Run by executing `node bot.js`
5. Change the world with the power of the KGB!

## Usage
### Running
Follow these steps to add your bot to your server:
1. Go to this link (replace the client id in the link with your own): `https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0`
2. Run using `node bot.js`

### Using
Send the message `$help` for help
you can also use `$ping` to get a message of the day and use `$motd [message]` to set the motd.
