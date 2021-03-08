exports.run = async (client, reaction, message) => {
    console.log("Jackson is online");

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