/**
 * Copyright 2018 Zachary Mayhew. This source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Main file for the KGBot
 *
 * @author Zachary Mayhew <zacklukem#7074>
 * 
 */
const fs = require('fs');
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('../auth.json');
const readline = require('readline');
const commands = require('./commands.js');
const data = require('../data.json');

// Settings
// Defaults
let settings = {
    "use_strict": false,
    "initial_balance": 10000,
    "use_balance": true,
    "use_motd": true,
    "c_sym": "₽"
};
try {
    fs.accessSync('./settings.json', fs.constants.R_OK);
    logger.debug("using settings");
    settings = require('../settings.json');
} catch (err) {
    logger.debug("not using settings");
}


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
logger.info('Connecting... ');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bot = new Discord.Client();

function update_activity() {
    if (data.activity_mode) {
        bot.user.setActivity(data.activity, {type: 'WATCHING'});
    }
    else {
        bot.user.setActivity(data.activity, {type: 'PLAYING'});
    }
}

function update_datafile() {
    fs.writeFile('./data.json', JSON.stringify(data, null, 2), (e) => {
        if (e) return logger.error(e);
    });
}

// Commands
if (settings.use_motd) {
    commands.add_command(new commands.Command(["ping", "p"], "$ping, $p - gives the user a " +
        "message of the day! (mostly used for testing)",
        (msg, args) => {
            msg.reply(data.motd);
        }));

    commands.add_command(new commands.Command(["motd", "setmotd"],
        "$motd [message] - sets the message of the day",
        (msg, args) => {
            data.motd = args.join(' ');
            update_datafile();
            msg.reply("Changed motd to: " + args.join(' '));
        }));
}

commands.add_command(new commands.Command(["activity", "a"],
    "$activity, $a [message] - sets the activity to something else",
    (msg, args) => {
        data.activity = args.join(' ');
        update_activity();
        update_datafile();
        msg.reply("Changed activity to: " + args.join(' '));
    }));

commands.add_command(new commands.Command(["toggle_activity", "ta"],
    "$toggle_activity, $ta - toggles the activity between watching and playing",
    (msg, args) => {
        data.activity_mode = !data.activity_mode;
        update_activity();
        update_datafile();
    }));

if (settings.use_balance) {
    commands.add_command(new commands.Command(["cash-init"],
        "$cash-init - initializes your users balance.  Can only be run once.",
        (msg, args) => {
            if (!data.cash.hasOwnProperty(msg.author.username)) {
                data.cash[msg.author.username] = settings.initial_balance;
                update_datafile();
                msg.reply("Your balance has been set to: " + settings.c_sym + settings.initial_balance)
            } else {
                msg.reply("Your account is already initialized!  For more help type $help")
            }
        }));

    commands.add_command(new commands.Command(["balance", "bal"],
        "$balance, $bal - tells you what you balance is",
        (msg, args) => {
            if (msg.mentions.users.first() && data.cash.hasOwnProperty(msg.mentions.users.first().username)) {
                msg.reply(msg.mentions.users.first().username + "'s balance is: " +
                    settings.c_sym + data.cash[msg.mentions.users.first().username]);
            }
            if (data.cash.hasOwnProperty(msg.author.username)) {
                msg.reply("Your balance is: " + settings.c_sym + data.cash[msg.author.username]);
            } else {
                msg.reply("You haven't been initialized yet! type $cash-init to initialize.");
            }
        }));

    commands.add_command(new commands.Command(["send"],
        "$send [user] [amount] - sends money to the specified user",
        (msg, args) => {
            if (msg.mentions.users.first() && data.cash.hasOwnProperty(msg.mentions.users.first().username) &&
                data.cash.hasOwnProperty(msg.author.username)) {
                data.cash[msg.mentions.users.first().username] += parseInt(args[1]);
                data.cash[msg.author.username] -= parseInt(args[1]);
                update_datafile();
                msg.reply("Sent " + msg.mentions.users.first().username + " " + settings.c_sym + args[1]);
            } else if (!data.cash.hasOwnProperty(msg.author.username)) {
                msg.reply("You haven't been initialized yet! type $cash-init to initialize.");
            } else {
                msg.reply(msg.mentions.users.first().username + " hasn't been initialized yet! Tell them to $cash-init to initialize.");
            }
        }));
}

// Handle commandline input
rl.on('line', (input) => {
    input = input.toLowerCase();
    if (input === 'exit') {
        exit();
    } else if (input === 'help' || input === 'h') {
        logger.info("Help for discord bot:");
        logger.info("    help: Display this message");
        logger.info("    exit: Exit and logout");
    }
});

// Handle exceptions
process.on('uncaughtException', e => {
    logger.error(e.stack);
    if (settings.use_strict) {
        exit();
    }
});

function exit() {
    logger.info("Goodbye!");
    bot.destroy().then(process.exit());
    update_datafile();
}

// Bot login and handling
bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username);
});

bot.on('message', msg => {
    
    let message = msg.content;

    if (message.substring(0, 1) === '$') {
        let args = message.substring(1).split(' ');
        let cmd = args[0].toLowerCase();
        
        args = args.splice(1);
        
        commands.handle_command(msg, cmd, args);
        
    }

});

bot.login(auth.token).then(() => {
    update_activity();
});

