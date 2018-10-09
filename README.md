
# KGBot
A discord bot working for the KGB.


## Info
This bot is written in javascript with [Node.js](https://nodejs.org).  It uses the [Discord.js](https://discord.js.org) library to interface with the [Discord API](https://discordapp.com/developers/docs/intro).

This bot is not meant for most people, it is mostly just a fun project, but if you have nothing else to do like me, this [very messy] code should be an ok jumping off point to creating your own bot.  Have fun and do whatever you want with it :)
## Getting Ready to Run
Follow these steps to prepare to run:
1. Create a discord application with a user. This  [tutorial](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) is pretty good.
<!--2. Create an `auth.json` file containing the following:
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
  "activity_mode": true,
  "cash": {}
}
```
`motd` is the message of the day, `activity` is the activity that is displayd under the username, and `activity_mode` toggles between watching (`true`) and playing (`false`).  `cash` is a dictionary that stores data on user balances
-->
2. Install node dependancies by running `npm install` in your command line and follow the prompt to setup the JSON files
3. Run by executing `npm start`
4. Change the world with the power of the KGB!

## Usage
### Running
Follow these steps to add your bot to your server:
1. Go to this link (replace the client id in the link with your own): `https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0`
2. Run using `npm start`

### List of commands:
| Command         | Alias   | Arguments       | Description                                                    |
|-----------------|---------|-----------------|----------------------------------------------------------------|
| $ping            | $p       |                 | gives the user the message of the day                          |
| $motd            | $setmotd | \<message>       | Sets the message of the day                                    |
| $activity        | $a       | \<activity>      | Sets the activity                                              |
| $toggle_activity | $ta      |                 | Toggles the activity between Watching and Playing              |
| $cash-init       |          |                 | Initializes the bank account of the user who sends the message |
| $balance         | $bal     | \[user]          | Gets the balance of a user or the user who sends the message   |
| $send            |          | \<user> \<amount> | Sends the specified user the specified amount.                 |

## Configuration
The bot can be configured using the settings.json file.  The basic structure is as follows:
```json
{
    "use_strict": false,
    "initial_balance": 10000,
    "use_balance": true,
    "use_motd": true,
    "c_sym": "₽"
}
```
When `use_strict` is set to true the program will exit upon receiving an exception
`initial_balance` is the initial balance for the currency system if applicable.
`use_balance` and `use_motd` define whether or not the balance and motd features are to be used.
`c_sym` is a cryptic name meaning currency symbol that is just a unicode symbol that represents the symbol that is before all currency values.

---

Copyright 2018 Zachary Mayhew

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
