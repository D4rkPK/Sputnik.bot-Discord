const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'nsfw',
    description: '¡ADVERTENCIA! contenido nsfw solo para mayores de 18 años',
    async execute(interaction) {
        let egif = [
            'https://media4.giphy.com/media/rbwLuRQWVQ4Io/giphy.gif?cid=790b7611dbbedbfa7431f0260f737c69d5109df20e5592e2&rid=giphy.gif&ct=g',
            'https://c.tenor.com/7ZnC36LtxbAAAAAM/funny-divertido.gif',
            'https://c.tenor.com/o656qFKDzeUAAAAM/rick-astley-never-gonna-give-you-up.gif',
            'https://c.tenor.com/rzVKRtHySUUAAAAM/fake-boobs.gif',
            'https://static.fjcdn.com/gifs/Look_95b9b2_1020510.gif',
            'https://c.tenor.com/t1xQiOn-ETAAAAAC/no-nope.gif',
            'https://c.tenor.com/MDXFdUs8S1sAAAAC/nope-denied.gif',
            'https://i.imgflip.com/2yxga6.gif',
            ]
        let index = (Math.floor(Math.random() * Math.floor(egif.length)))
        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setImage(egif[index])
        interaction.reply({ embeds: [embed] })
    }
}