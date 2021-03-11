const database = require("quick.db");

// choose, if in args use args
exports.choose = async (args, options, not) => {
    let choice = options[Math.floor(Math.random() * options.length)];
    if (!args)
        return choice;
    for (let option of options) {
        if (args.find(arg => option == arg && not !== arg))
            choice = option;
    }
    return choice;
}

// add user to guild database with starting jelly beans of 0
exports.createAccount = async (message) => {
    let user = message.mentions.users.first() || message.author;
    await database.set(`${message.guild.id}.${user.id}`, {"jellybeans": 0});
    return await database.get(`${message.guild.id}.${user.id}`);
}

// get last X messages
exports.fetchMessages = async function (channel, amount) {
    let messagesFormatted = "";
    await channel.messages.fetch({ limit: amount }).then(messages => {
        messagesFormatted = Array.from(messages.values());
    });
    return messagesFormatted;
}

// Form submit (for image host), yoinked from StackOverflow here: https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    var addField = function( key, value ){
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", value );

        form.appendChild(hiddenField);
    }; 

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            if( params[key] instanceof Array ){
                for(var i = 0; i < params[key].length; i++){
                    addField( key, params[key][i] )
                }
            }
            else{
                addField( key, params[key] ); 
            }
        }
    }

    document.body.appendChild(form);
    form.submit();
}