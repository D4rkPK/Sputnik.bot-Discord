const {GuildMember} = require('discord.js');

module.exports = {
  name: 'remove',
  description: 'eliminar una canción de la cola',
  options: [
    {
      name: 'num',
      type: 4, // 'INTEGER' Type
      description: 'El número de cola que desea eliminar',
      required: true,
    },
  ],
  async execute(interaction, player) {
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

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | ¡No se está reproduciendo música!'});
    const number = interaction.options.get('num').value - 1;
    if (number > queue.tracks.length)
      return void interaction.followUp({content: '❌ | ¡Número de pista mayor que la profundidad de la cola!'});
    const removedTrack = queue.remove(number);
    return void interaction.followUp({
      content: removedTrack ? `✅ | Eliminado **${removedTrack}**!` : '❌ | ¡Algo salió mal!',
    });
  },
};
