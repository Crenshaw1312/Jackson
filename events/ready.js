const database = require("quick.db");

exports.run = async (client, reaction, message) => {
    console.log("Jackson is online");

    // database
    if (database) {
        console.log("Jackson DB activated");
    } else {
        console.log("Jackson DB failed");
    }

    // presence
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "jack help",
            type: "PLAYING"
        }
    });
    console.log('Set presence');
}