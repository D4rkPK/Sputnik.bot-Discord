const Discord = require('discord.js');
module.exports = {
    name: 'roast',
    description: 'Hacer mierda a alguien',
    options: [
      {
        name: 'user',
        type: 6, //USER TYPE
        description: 'user',
        required: true,
      },
    ],
    async execute(interaction) {
        var user = interaction.options.getUser('user')
        let roast = [
           ' Mi coeficiente intelectual es mayor que su peso.',
           ' Tu trasero debe estar celoso de toda la mierda que sale de tu boca.',
           ' Tienes una cara que ni siquiera una madre podría amar.',
           ' Si alguna vez estoy borracho, serás muy guapo.',
           ' Puedo hacerme una cirugía plástica para arreglar mi fealdad, tú por otro lado serás estúpido por la eternidad.',
           ' No estoy siendo grosero. Eres simplemente insignificante.',
           ' Al menos huelo bien.',
           ' Me encanta lo que has hecho con tu pelo. ¿Cómo haces para que te salga así por las fosas nasales?',
           ' La estupidez no es un crimen, así que eres libre de irte.',
           ' Si tuviera una cara como la tuya demandaría a mis padres.',
           ' Das a todos mucha alegría cuando sales de la habitación.',
           ' ¡Estoy celoso de todas las personas que no te han conocido!',
           ' Sorpréndeme, di algo inteligente.',
           ' Maldita sea, no tu de nuevo',
           ' Me tiro un pedo para que huelas mejor.',
           ' 100.000 espermatozoides, ¿fuiste el más rápido?',
           ' Tu único propósito en la vida es ser donante de órganos.',
           ' Que tengas un buen día, en otro lugar.',
           ' Si realmente quieres saber acerca de los errores, deberías preguntarles a tus padres.',
           ' Por favor, sigue hablando. Siempre bostezo cuando estoy interesado.',
           ' Jesús te ama... pero todos los demás piensan que eres un gilipollas.',
           ' Tienes derecho a permanecer en silencio porque lo que digas probablemente será una estupidez de todos modos. ',
           ' Tuve una pesadilla. Soñé que eras tú.',
           ' Tienes suficiente grasa para hacer otro ser humano.',
           ' No soy antisocial. Simplemente no me gustas.',
           ' Da miedo pensar que gente como tú se gradúe de la universidad. ',
           ' No tengo el tiempo ni los crayones para explicarte esto.',
           ' Eres tan feo que tus retratos se cuelgan solos.',
           ' ¡tu cara podría asustar a la mierda de un baño!',
           ' ¿tú fuiste el espermatozoide que ganó?',
           ' Debes haber nacido en una carretera, porque ahí es donde ocurren la mayoría de los accidentes.',
           ' El espejo no puede hablar. Por suerte para ti, ellos tampoco pueden reírse.',
           ' Oye, tienes algo en la barbilla... no, el tercero abajo.',
           ' ¿siempre eres tan idiota, o simplemente presumes cuando estoy cerca?',
           ' Mi color favorito es el amarillo. Por eso amo tus dientes. ',
        ]
        if (user.id === '405511672070144011') {return interaction.reply('No puedes insultar a mi desarrollador')}
        if (user.id === '348340887744675841') {return interaction.reply('No puedes insultar a la novia de mi desarrollador')}
        if (user === interaction.user) return interaction.reply('¿Estas pendejo?')
        if (user === interaction.client.user) return interaction.reply('No puedes hacerme mierda')
        let index = (Math.floor(Math.random() * Math.floor(roast.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setTitle(user.username + ' 💩 ' + roast[index] )
        interaction.reply({ embeds: [embed] })
    },
};