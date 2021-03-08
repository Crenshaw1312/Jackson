exports.choose = function choose(args, options, not) {
    let choice = options[Math.floor(Math.random() * options.length)];
    if (!args) return choice;
    for (let option of options) {
        if (args.find(arg => option == arg && not !== arg)) choice = option;
    }
    return choice;
}