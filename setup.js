/**
 * Copyright 2018 Zachary Mayhew. This source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Setup file for the KGBot.  It sets up the file to get ready to build.
 *
 * @author Zachary Mayhew <zacklukem#7074>
 *
 */
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function create_file(file, data) {
    fs.writeFile(file, JSON.stringify(data, null, 2), (e) => {
        if (e) return console.error(e);
    });
}

console.log("This program will setup for KGBot by creating auth.json and data.json.");

create_file('./data.json', {
    "motd": "This is the motd!",
    "activity": "¯\\_(ツ)_/¯",
    "activity_mode": true,
    "cash": {}
});

rl.question('What is your token? ', (answer) => {
    let output = {
        "token": answer
    };
    create_file('./auth.json', output);
    rl.question('Create a settings.json file (Y/n)? ', (answer) => {
        if (answer.toUpperCase() === "Y") {
            create_file("./settings.json", {
                "use_strict": false,
                "initial_balance": 10000,
                "use_balance": true,
                "use_motd": true,
                "c_sym": "₽"
            });
        }
        rl.close();
    });
});





