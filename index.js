require("dotenv").config();
const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const config = require('../config.json');
const {Player} = require('discord-player');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitido desde la cola: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitido desde la conexión: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`▶ | Se esta produciendo: **${track.title}** en **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎶 | Canción **${track.title}** puesto en cola!`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('❌ | ¡Me desconectaron manualmente del canal de voz, borrando la cola!!');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('❌ | Nadie está en el canal de voz, abandonando...');
});

player.on('queueEnd', queue => {
  queue.metadata.send('✅ | cola terminada!');
});

client.once('ready', async () => {
  console.log('Listo!');
});

client.on('ready', function() {
  client.user.setActivity(config.activity, { type: config.activityType });
});

client.once('reconnecting', () => {
  console.log('reconectando!');
});

client.once('disconnect', () => {
  console.log('Desconectado!');
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
    await message.guild.commands
      .set(client.commands)
      .then(() => {
        message.reply('Deployed!');
      })
      .catch(err => {
        message.reply('¡No se pudieron implementar los comandos! Asegúrese de que el bot tenga el permiso application.commands!');
        console.error(err);
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'Hubo un error al intentar ejecutar ese comando!',
    });
  }
});

client.login(process.env.DISCORD_TOKEN);