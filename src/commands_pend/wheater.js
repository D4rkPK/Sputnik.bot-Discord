const weather = require('weather-js')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'Envía el clima de la ubicación dada',
    options: [
      {
        name: 'location',
        type: 3, //string TYPE
        description: 'Ubicación',
        required: true,
      },
    ],
        async execute(interaction){
           const location = interaction.options.getString("location")
           weather.find({search: location, degreeType: 'C'}, function(err, result) {
            try {
            let embed = new EmbedBuilder()
            .setTitle(`CLIMA - ${result[0].location.name}`)
            .setColor("#00FFFF")
            .addField("Temperatura", `${result[0].current.temperature} Celsius`, true)
            .addField("Cielo", result[0].current.skytext, true)
            .addField("Humedad", result[0].current.humidity, true)
            .addField("Viento", result[0].current.windspeed, true)
            .addField("Hora", result[0].current.observationtime, true)
            .addField("Direccion del viento", result[0].current.winddisplay, true)
            .setThumbnail(result[0].current.imageUrl)
            .setFooter({text: `Información meteorológica solicitada por ${interaction.user.username}`})
            interaction.reply({ embeds: [embed] })
            } 
            catch(err) {
              interaction.reply("No se pueden obtener los datos de la ubicación dada")
            }
        })
    }
}