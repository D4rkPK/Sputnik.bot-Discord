const {GuildMember} = require('discord.js');
const {QueueRepeatMode} = require('discord-player');

module.exports = {
  name: 'loop',
  description: 'Establece el modo de bucle',
  options: [
    {
      name: 'mode',
      type: 'INTEGER',
      description: 'tipo de bucle',
      required: true,
      choices: [
        {
          name: 'Apagar',
          value: QueueRepeatMode.OFF,
        },
        {
          name: 'Pista',
          value: QueueRepeatMode.TRACK,
        },
        {
          name: 'Cola',
          value: QueueRepeatMode.QUEUE,
        },
        {
          name: 'Autoplay',
          value: QueueRepeatMode.AUTOPLAY,
        },
      ],
    },
  ],
  async execute(interaction, player) {
    try {
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
      if (!queue || !queue.playing) {
        return void interaction.followUp({content: '❌ | ¡No se está reproduciendo música!'});
      }

      const loopMode = interaction.options.get('mode').value;
      const success = queue.setRepeatMode(loopMode);
      const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

      return void interaction.followUp({
        content: success ? `${mode} | ¡Modo de bucle actualizado!` : '❌ | ¡No se pudo actualizar el modo de bucle!',
      });
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: 'Hubo un error al intentar ejecutar ese comando: ' + error.message,
      });
    }
  },
};
