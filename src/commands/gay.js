const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'gay',
  description: 'gay',
  options: [
    {
      name: 'user',
      type: 6, //USER TYPE
      description: 'gay user',
      required: true,
    },
  ],
  async execute(interaction) {
    var user = interaction.options.getUser('user')
    let gay = [
      ' Un gran maricon',
      ' Traga penes',
      ' Bolo se huequea',
    ]
    if (user.id === '405511672070144011') { return interaction.reply('Mi desarrollador no es gay') }
    if (user.id === '348340887744675841') { return interaction.reply('La novia de mi desarrollador no es gay') }
    if (user === interaction.client.user) return interaction.reply('no soy gay')
    if (user === interaction.user) return interaction.reply('Si te gusta el pico solo dilo')
    let index = (Math.floor(Math.random() * Math.floor(gay.length)))
    let embed = new EmbedBuilder()
      .setColor('#ff0080')
      .setTitle(user.username + ' 💅 ' + gay[index])
    interaction.reply({ embeds: [embed] })
  },
};