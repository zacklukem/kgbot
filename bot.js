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
const auth = require('./auth.json');
const readline = require('readline');
const commands = require('./commands.js');
const data = require('./data.json');

const use_strict_exit = true;  // For release set to false

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

commands.add_command(new commands.Command(["ping", "p"], "$ping, $p - gives the user a " +
    "message of the day! (mostly used for testing)",
    (msg, args) => {
        msg.reply(data.motd);
    }));

commands.add_command(new commands.Command(["motd", "setmotd"],
    "$motd [message] - sets the message of the day",
    (msg, args) => {
        data.motd = args.join(' ');
        fs.writeFile('./data.json', JSON.stringify(data), (e) => {
            if (e) return logger.error(e);
        });
        msg.reply("Changed motd to: " + args.join(' '));
    }));

// Handle commandline input
rl.on('line', (input) => {
    input = input.toLowerCase();
    if (input == 'exit') {
        exit();
    } else if (input == 'help' || input == 'h') {
        logger.info("Help for discord bot:");
        logger.info("    help: Display this message");
        logger.info("    exit: Exit and logout");
    }
});

process.on('uncaughtException', e => {
    logger.error(e.stack);
    if (use_strict_exit) {
        exit();
    }
});

function exit() {
    logger.info("Goodbye!")
    bot.destroy().then(process.exit());
}

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.tag);
});

bot.on('message', msg => {
    
    var message = msg.content;

    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0].toLowerCase();
        
        args = args.splice(1);
        
        commands.handle_command(msg, cmd, args);
        
    }

});

bot.login(auth.token).then(() => {
    bot.user.setActivity('your every move...', { type: 'WATCHING' })
        .catch(logger.error);
});

