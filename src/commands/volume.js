const {GuildMember} = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Cambia el volumen',
  options: [
    {
      name: 'volume',
      type: 4, // 'INTEGER' Type
      description: 'Número entre 0-200',
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
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | ¡No se está reproduciendo música!',
      });

    var volume = interaction.options.get('volume').value;
    volume = Math.max(0, volume);
    volume = Math.min(200, volume);
    const success = queue.setVolume(volume);

    return void interaction.followUp({
      content: success ? `🔊 | Volumen ajustado a ${volume}!` : '❌ | ¡Algo salió mal!',
    });
  },
};