module.exports = {
  name: 'ban',
  description: 'Banear Usuario',
  options: [
    {
      name: 'user',
      type: 6, //USER Type
      description: 'El usuario que quieras darle ban',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.get('user').value;

    if (!member) {
      return message.reply('Necesitas mencionar al miembro que quieres banear');
    }

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("No puedo banear a este usuario.");
    }

    const userinfo = client.users.cache.get(member);

    return interaction.guild.members
      .ban(member)
      .then(() => {
        interaction.reply({
          content: `${userinfo.username} fue enviado a la mierda.`,
          ephemeral: true,
        });
      })
      .catch(error =>
        interaction.reply({
          content: `${error} Lo sentimos, ocurrió un error.`,
          ephemeral: true,
        }),
      );
  },
};