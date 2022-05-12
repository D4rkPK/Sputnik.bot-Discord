module.exports = {
    name: 'userinfo',
    description: 'Obtener información sobre un usuario.',
    options: [
      {
        name: 'user',
        type: 6, //USER TYPE
        description: 'El usuario sobre el que desea obtener información',
        required: true,
      },
    ],
    execute(interaction, client) {
      const member = interaction.options.get('user').value;
      const user = client.users.cache.get(member);
  
      interaction.reply({
        content: `Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
        ephemeral: true,
      });
    },
  };