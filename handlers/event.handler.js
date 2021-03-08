const { readdirSync } = require("fs");
const chalk = require("chalk");

module.exports = async client => {

      readdirSync("./events/").filter(f => f.endsWith(".js")).forEach(evnt => {

          const event = require(`../events/${evnt}`);
          console.log(chalk.greenBright(`Event Loaded ${evnt.split(".")[0]}`));

          client.on(evnt.split(".")[0], (...args) => event.run(client, ...args));
    });
}