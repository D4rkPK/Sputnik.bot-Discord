const {GuildMember} = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'mezclar la cola',
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
    try {
      queue.shuffle();
      trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
      return void interaction.followUp({
        embeds: [
          {
            title: 'Reproduciendo ahora',
            description: trimString(
              `Se esta reproduciendo 🎶 | **${queue.current.title}**! \n 🎶 | ${queue}! `,
              4095,
            ),
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '❌ | ¡Algo salió mal!',
      });
    }
  },
};
