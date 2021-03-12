const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "randommeal",
    description: "Gives a random meal",
    usage: "randommeal",
    groups: ["fun"],
    DM: true,
    cooldown: {type: "map", time: 5},
    aliases: ["randmeal", "randrecipe", "rr"],
    run: async (client, message, args) => {
        let meal = (await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json())).meals[0];

        if (!meal) return client.err(message, "Meal", "No meal returned, try again or get support");
        
        // get ingredients and measurements
        let ingredients = "";
        let ing = Object.keys(meal).filter(ing => ing.startsWith("strIngredient") && meal[ing] != '');
        if (ing.length > 5) {
            ing = ing.slice(0,5);
            ing.push("more");
            meal["more"] = (`[more...](${meal.strSource})`);
        }
        for (let i of ing) ingredients += meal[i] + "\n";

        let measurements = "";
        let mes = Object.keys(meal).filter(mes => mes.startsWith("strMeasure") && meal[mes] != '');
        if (mes.length > 5) mes = mes.slice(0,5);
        for (let m of mes) measurements += meal[m] + "\n";

        // format recipe
        let recipe = meal.strInstructions;
        if (recipe.length > 250) recipe = recipe.slice(0, 250) + "...\n\n**YouTube video:** " + (meal.strYoutube || "No video found");

        const embed = new MessageEmbed()
        .setTitle(`Meal - ${meal.strMeal}`)
        .setURL(meal.strSource)
        .setColor(0x4B0082)
        .setDescription(recipe)
        .setThumbnail(meal.strMealThumb)
        .addField("Ingredients", ingredients, true)
        .addField("Measurements", measurements, true);
        return message.reply(embed);
    }
}