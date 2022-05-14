const {GuildMember} = require('discord.js');

module.exports = {
  name: 'move',
  description: '¡Mover la posición de la canción en la cola!',
  options: [
    {
      name: 'pista',
      type: 4, // 'INTEGER' Type
      description: 'El número de pista que desea mover',
      required: true,
    },
    {
      name: 'posicion',
      type: 4, // 'INTEGER' Type
      description: 'La posición a la cual se movera',
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
    const queueNumbers = [interaction.options.get('pista').value - 1, interaction.options.get('posicion').value - 1];
    if (queueNumbers[0] > queue.tracks.length || queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: '❌ | ¡Número de pista mayor que la profundidad de la cola!'});

    try {
      const track = queue.remove(queueNumbers[0]);
      queue.insert(track, queueNumbers[1]);
      return void interaction.followUp({
        content: `✅ | Movido **${track}**!`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '❌ | ¡Algo salió mal!',
      });
    }
  },
};