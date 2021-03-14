exports.flagParse = async (flags, string) => {
    // find all groups
    let located = string.match(/("[^"]*")|([^"\s]*)/ig).filter(str => str !== '');
    const map = new Map();
    let currentFlag = "";
    console.log(located);
    // combine two that are next to eachother
    for (let current of located) {
        // make and set currentFlag
        if (current.match(/^-/ig)) {
           for (let flag of flags) {
               if (flag.name == current.slice(1)) {
                   map.set(flag.name, []);
                   currentFlag = current.slice(1);
               }
           };
        // add to an exsisting flag
        } else if (currentFlag) {
            map.get(currentFlag).push(current)
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