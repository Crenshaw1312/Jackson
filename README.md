# Jackson
Jackson is a pretty simple discord bot made by Crenshaw#1312
> By no means should this bot be regarded as stable

## Why the name "Jackson"?
Jackson is the name of the kid in my profile picture. Jackson like facts and information, and this works with the bot rather well since it primarily job get information off the web

The big imaginary cat's name is Crenshaw. Crenshaw is always there for Jackson as he goes through homlessness

Their favourite candies are purple jelly beans, so I made a simple jelly bean system to give other people jelly beans



## Credits
You'll see there's a lot, and I like giveing credit to those who help me since it means a lot to me when someone spends their time helping you or makin your day better
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
    - Waifu npm (Specky)
- **WickedWizard**
    - Showing me how to prep cooldown system
- **mangowhite#0001**
    - Jackson's profile picture

## Features
You can go into the commands file for a complete list of the commands

Almost all commands can be run in DMs, and are easy to configure if you want to change the cooldown

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
        maxTake: 1,
        delayGive: 30,
        delayTake: 30,
    },
    mongoPath: "mongodb://localhost:27017/Jackson-Bot"
}
```
4. Insert your tokens
> The `youtubeToken` and `geniusToken` are not required, but allow more commands to run.

> Everything in `jellybeans` are the defaults, the can be edited with `jbsets` (per guild)

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
- cooldown: the type and cooldown time for a command
    - type: either "db" or "map"
        - db: cooldown will not be lost on bot reset
        - map: cooldown will be lost on reset
    > Only map is supported for now, and is preffered to try and limit db usage and to keep the bot quick
    - time: time in seconds of cooldown duration
- aliases: an array of strings that can also trigger the command

```js
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Show the websocket ping in milliseconds",
    usage: "ping",
    groups: ["information"],
    DM: true,
    cooldown: {type: "map", time: 0},
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
As you'll see all the responses are in an embed with the hex code `0x4B0082` (indigo), please keep this in your command

### Making an error message
```js
return client.err(message, "Command name titled", "Reason for error");
```

> Dumb Jackson thing of the day: I spent 2 hours on the otter command and only 1 and a half on the entire cooldown system