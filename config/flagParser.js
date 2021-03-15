exports.flagParse = async (flags, string) => {
    // find all groups
    let located = string.match(/"[^"]*"|[^"\s]*/img).filter(str => str !== '');
    const map = new Map();
    let currentFlag = "";
    // combine two that are next to eachother
    for (let current of located) {
        // make and set currentFlag
        if (current.match(/^-/ig)) {
           for (let flag of flags) {
               if (flag.name == current.slice(1)) {
                   map.set(flag.name, []);
                   currentFlag = current.slice(1);
               }
           }
           continue;
        }

        // remove the " if it's there
        current = current.replace(/^\"|\"$/g, "");
        console.log(typeof current)

        // add to an exsisting flag (ignoring noFlag)
        if (currentFlag && currentFlag !== "noFlag") {
            let lastMapIndex = map.get(currentFlag).length;
            let flagArgs = "";
            for (let flag of flags) {
                if (flag.name == currentFlag) flagArgs = flag.args;
            }
    
            // change the type
            if (current.match(/^(t(rue)?|f(alse)?|1|0)$/i)) {
                current = Boolean(current);
            } else if (current.match(/^\d+$/)) {
                current = Number(current);
            }
    
            // if valid type for arg, add to map
            if (typeof current === flagArgs[lastMapIndex]) {
                map.get(currentFlag).push(current)
            }

        // There was no flag defiend to add to
        } else {
            if (!map.get("noFlag")) {
                map.set("noFlag", [current]);
                currentFlag = "noFlag"
                continue
            }
            map.get("noFlag").push(current);
        }
    }


    console.log(map);
    return map;
}