const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Pausa la canción actual',
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
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | ¡No se está reproduciendo música!',
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? '⏸ | ¡Pausado!' : '❌ | ¡Algo salió mal!',
    });
  },
};
