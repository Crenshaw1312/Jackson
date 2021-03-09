const sqlite = require("sqlite3").verbose();

exports.run = async (client, reaction, message) => {
    console.log("Jackson is online");

    // database
    const database = new sqlite.Database('./jacksonDB.db', sqlite.OPEN_READWRITE || sqlite.OPEN_CREATE);
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