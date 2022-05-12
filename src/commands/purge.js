module.exports = {
  name: 'purge',
  description: 'Eliminar los últimos mensajes en todos los chats.',
  options: [
    {
      name: 'num',
      type: 4, //'INTEGER' Type
      description: 'El número de mensajes que desea eliminar. (máximo 100)',
      required: true,
    },
  ],
  async execute(interaction) {
    const deleteCount = interaction.options.get('num').value;

    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return void interaction.reply({
        content: `Proporcione un número entre 2 y 100 para la cantidad de mensajes que desea eliminar.`,
        ephemeral: true,
      });
    }

    const fetched = await interaction.channel.messages.fetch({
      limit: deleteCount,
    });

    interaction.channel
      .bulkDelete(fetched)
      .then(() => {
        interaction.reply({
          content: `✅ Mensajes eliminados con éxito`,
          ephemeral: true,
        });
      })
      .catch(error => {
        interaction.reply({
          content: `No se pudieron eliminar los mensajes debido a: ${error}`,
          ephemeral: true,
        });
      });
  },
};
