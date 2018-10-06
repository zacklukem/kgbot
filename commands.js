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

const logger = require('winston');


var commands = []

/**
 * Class to define a command to be run by the user.
 */
class Command {

    /**
     * Command constructor.
     *
     * @param cmds the commands and aliases
     *     (StringArr)
     * @param desc the description of the command
     *     (String)
     * @param callback the command callback
     *     (function (msg, args))
     */
    constructor(cmds, desc, callback) {
        this.cmds = cmds;
        this.desc = desc;
        this.callback = callback;
    }

    is_called (cmd) {
        for (let c in this.cmds) {
            if (cmd == this.cmds[c]) {
                return true;
            }
        }
        return false;
    }
}

module.exports = {
    
    Command: Command,

    /**
     * Handles a command that has been sent
     * @param msg the message from discord.js
     *     (Message)
     * @param cmd the command
     *     (String)
     * @param args the arguments
     *     (StringArr)
     */
    handle_command: (msg, cmd, args) => {
        logger.debug("Recieved command: " + cmd);

        if (cmd == 'help' || cmd == 'h') {
            var str = "";
            for (var c in commands) {
                var cmd0 = commands[c];
                str = str + "\n    " + cmd0.desc;
            }
            msg.reply("KGBot help:" + 
                      str)
        }

        for (var i = 0; i < commands.length; i++) {
            var command = commands[i];
            logger.debug(command);
            if (command.is_called(cmd)) {
                logger.debug("Called: " + cmd)
                command.callback(msg, args);
            }
        }
    },
    
    /**
     * Adds a command.
     * @param cmd command
     *     (Command)
     */
    add_command: (cmd) => {
        commands.push(cmd);
    }

};

