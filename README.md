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
4. Install all dependancies `npm i`
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
### Example Command object
```js
{
  name: 'animu',
  description: 'Gives a random truth',
  usage: 'animu [hug|pat|wink|face-palm]',
  groups: [ 'fun' ],
  DM: false,
  cooldown: { type: 'map', time: 3 },
  aliases: [ 't' ],
  run: [AsyncFunction: run]
}
```
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
- run: in brackets, the code that will run when called upon

### Example command
```js
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const { choose } = require('../../config/funcs.js');


module.exports = {
    name: "animu",
    description: "Gives a random truth",
    usage: "animu [hug|pat|wink|face-palm]",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 3},
    aliases: ["ani"],
    run: async (client, message, args) => {

        // setting rating
        let animu = await choose(args, ["hug", "pat", "wink", "face-palm"], null);

        let gif = (await fetch(`https://some-random-api.ml/animu/${animu}`).then(response => response.json())).link;

        if (!gif)return client.err(message, "Animu", "No animu was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle(`Animu - ${animu}`)
        .setColor(0x4B0082)
        .setImage(gif);
        return message.reply(embed);
    }
}
```
As you'll see all the responses are in an embed with the hex code `0x4B0082` (indigo), please keep this in your command

### Making an error message
```js
return client.err(message, "Command name titled", "Reason for error, no period");
```

> Dumb Jackson thing of the day: While making the embed command, I got a JS error, so I hosted it and the command still crashed the bot

### Custom functions
As you may have noticed, I require the `funcs.js` (in config folder) file which is just a collection of functions. Although you may realise my flag parser, is it's own file because it's a bigger function. if you're going to make a function, please try to keep it the same format as the other ones.