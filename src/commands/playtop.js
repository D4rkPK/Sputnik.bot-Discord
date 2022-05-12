const {GuildMember} = require('discord.js');
const {QueryType} = require('discord-player');

module.exports = {
  name: 'playtop',
  description: 'Reproduce una canción antes de la siguiente en tu canal',
  options: [
    {
      name: 'consulta',
      type: 3, // 'STRING' Type
      description: 'La canción que quieres reproducir',
      required: true,
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

      const query = interaction.options.get('consulta').value;
      const searchResult = await player
        .search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});
      if (!searchResult || !searchResult.tracks.length)
        return void interaction.followUp({content: '¡No se encontraron resultados!'});

      const queue = await player.createQueue(interaction.guild, {
        ytdlOptions: {
        quality: "highest",
        filter: "audioonly",
        highWaterMark: 1 << 25,
        dlChunkSize: 0,
      },
        metadata: interaction.channel,
      });

      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        void player.deleteQueue(interaction.guildId);
        return void interaction.followUp({
          content: '¡No se pudo unir a tu canal de voz!',
        });
      }

      await interaction.followUp({
        content: `⏱ | Cargando tu ${searchResult.playlist ? 'playlist' : 'track'}...`,
      });
      searchResult.playlist ? queue.insert(searchResult.tracks, 0) : queue.insert(searchResult.tracks[0], 0);
      if (!queue.playing) await queue.play();
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: 'Hubo un error al intentar ejecutar ese comando: ' + error.message,
      });
    }
  },
};
