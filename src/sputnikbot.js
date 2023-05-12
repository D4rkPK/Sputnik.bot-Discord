client.on("messageCreate", function (msg) {
  if (msg.content === "sput") {
    msg.reply("HOLA");
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("sput=hug")) {
    let targetMember = message.mentions.members.first();
    if (!targetMember)
      return message.reply(
        "Necesitas etiquetar a un usuario para poder abrazarlo ‼️"
      );
    // message goes below!
    message.channel.send(
      `<@${targetMember.user.id}> Acabas de recibir un abrazo ❤️ https://tenor.com/view/anime-cuddle-cute-gif-12668750`
    );
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("sput=kiss")) {
    let targetMember = message.mentions.members.first();
    if (!targetMember)
      return message.reply(
        "Necesitas etiquetar a un usuario para poder besarlo ‼️"
      );
    // message goes below!
    message.channel.send(
      `<@${targetMember.user.id}> Acabas de recibir un besarlo 😘 https://tenor.com/view/yuri-kiss-anime-blushed-gif-17050283`
    );
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("sput=punch")) {
    let targetMember = message.mentions.members.first();
    if (!targetMember)
      return message.reply(
        "Necesitas etiquetar a un usuario para poder pijearlo ‼️"
      );
    // message goes below!
    message.channel.send(
      `<@${targetMember.user.id}> Acabas de recibir una vergueada 😡 https://tenor.com/view/anime-hit-slap-ouch-angry-gif-16268549`
    );
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("sput=cum")) {
    let targetMember = message.mentions.members.first();
    if (!targetMember)
      return message.reply(
        "Necesitas etiquetar a un usuario para poder acabarlo ‼️"
      );
    // message goes below!
    message.channel.send(
      `<@${targetMember.user.id}> Acabas de recibir una acabada 🥛 https://tenor.com/view/cum-anime-anime-cum-doa-loli-gif-19254306`
    );
  }
});


