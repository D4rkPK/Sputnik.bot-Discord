const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "covid",
  description: "Estadisticas de covid por país",
  options: [
    {
      name: "location",
      type: 3, //string TYPE
      description: "Ubicación",
      required: true,
    },
  ],
  async execute(interaction) {
    const country = interaction.options.getString("location");
    const setCountry = country.charAt(0).toUpperCase() + country.slice(1);
    fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error != undefined)
          return void interaction.reply({
            content: "¡No se encontraron resultados!",
          });
        if (json.error === undefined);
        let embed = new discord.MessageEmbed()
          .setColor("#92fa21")
          .setTitle(`🦠 Estadísticas de covid - ${setCountry}`)
          .setDescription("El número de casos puede diferir de otras fuentes")
          .addField("😷 Casos", `**` + json.confirmed["value"] + `**`, true)
          .addField("☠️ Muertes", `**` + json.deaths["value"] + `**`, true)
          .setFooter({ text: "Última actualización" }, +json.lastUpdate)
          .setTimestamp();
        interaction.reply({ embeds: [embed] });
      });
  },
};
