const {GuildMember} = require('discord.js');

module.exports = {

    name: 'queue',
    description: 'Ver la cola de canciones actuales',

    async execute (interaction, player) {

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return void interaction.reply({
              content: '¡¡No estás en un canal de voz ‼️',
              ephemeral: true,
            });
          }
    
          if (
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
          ) {
            return void interaction.reply({
              content: '¡¡No estás en mi canal de voz ‼️',
              ephemeral: true,
            });
          }
          var queue = player.getQueue(interaction.guildId);
          if (typeof(queue) != 'indefinido') {
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
              return void interaction.reply({
                embeds: [
                  {
                    title: 'Reproduciendo ahora',
                    description: trimString(`La canción actual que se está reproduciendo es 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `, 4095),
                  }
                ]
              })
          } else {
            return void interaction.reply({
              content: '¡No hay ninguna canción en la cola.!'
            })
          }
    }
}
