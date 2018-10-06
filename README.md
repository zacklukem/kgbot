
# KGBot
A discord bot working for the KGB.


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
3. Create a `data.json` file containing the following:
```json
{
  "motd": "Hello, Discord!",
  "activity": "you",
  "activity_mode": true
}
```
`motd` is the message of the day, `activity` is the activity that is displayd under the username, and `activity_mode` toggles between watching (`true`) and playing (`false`)
4. Install node dependancies by running `npm install` in your command line.
5. Run by executing `node bot.js`
6. Change the world with the power of the KGB!

## Usage
### Running
Follow these steps to add your bot to your server:
1. Go to this link (replace the client id in the link with your own): `https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0`
2. Run using `node bot.js`

### Using
Send the message `$help` for help
you can also use `$ping` to get a message of the day and use `$motd [message]` to set the motd.

---

Copyright 2018 Zachary Mayhew

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
