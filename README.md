# Jackson
Jackson is a pretty simple discord bot made by Crenshaw#1312
> By no means should this bot be regarded as stable

## Why Jackson?
Jackson is the name of the kid in my profile picture. Jackson like facts and information, and this works with the bot rather well since it primarily job get information off the web

The big imaginary cat's name is Crenshaw. Crenshaw is always there for Jackson as he goes through homlessness

Their favourite candies are purple jelly beans, so I made a simple jelly bean system to give other people jelly beans



## Credits
- **WaterNinja101#2093**
    - Teaching me
    - Letting me on the Truth or Dare Bot team
    - The api used for the `truth`, `dare`, and `wyr` commands
- **Devnote#0745** and **Radeon team**
    - Teaching me js
    - Setting up my bot
    - Using Github
- **Specky#6281** and **Joe_#001**
    - Helping me with git
    - Teaching me about caches
    - Waifu npm

## Features
>There are no cooldowns yet, will be added in the future

You can go into the commands file for a complete list of the commands

### Jelly Beans
Just a a basic reputation system where you can give, take, set, and view other people's jelly bean count

### Fun
There are tons of animals commands like `koalafact` and `fox`, then there are also music commands like `lyrics`.

### Moderartion (more soon)
There's only `kick` and `ban` as of now, but in the future look out for `mute`, `unban` and some more

### Other
There are commands that only the owner of the bot can run, Crenshaw#1312, and then some information commands like `about` and `help`

## Hosting Jackson Yourself
1. Create a discord bot application
2. Clone, or download, this repo
3. Make and enter data into config folder and file (more below) 
4. Install all dependancies
5. run `node .`

### Making the Config
1. Make a folder called config
2. In that folder, make a file called config.js
3. paste the code below into config.js
```js
module.exports = {
    token: "",
    prefix: "",
    youtubeToken: "",
    geniusToken: "",
    jellybeans: {
        maxGive: 3,
        maxTake: 1
    }
}
```
4. Insert your tokens
> The `youtubeToken` and `geniusToken` are not required, but allow more commands to run.

> `maxGive` and `maxTake` are the defaults, the can be edited with `jbsets` (per guild)

> `prefix` is required, but you can change the prefix with the `prefix` command (perguild)

## Adding commands
### Example (ping)
- name: The command name, no spaces allowed
- description: Description of the command
- usage: how to use the command
    - Must start with the command name
    - Put the argument in `[]` if optional
    - Put the arguement in `<>` if required
- DM: If the command can be ran in DMs
    - `false` = cannot run in DMs
    - `true` = can run in DMs
- aliases: an array of strings that can also trigger the command

```js
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Show the websocket ping in milliseconds",
    usage: "ping",
    groups: ["information"],
    DM: true,
    aliases: ["pong", "p"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Ping')
        .setColor(0x4B0082)
        .setDescription(`Websocket ${client.ws.ping}ms`);
        return message.reply(embed);
    }
}
```