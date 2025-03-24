const { Function, parseMention } = require('../lib/');
const config = require('../config');

Function({
    pattern: 'tag ?(.*)',
    fromMe: true,
    onlyGroup: true,
    desc: 'Tag participants with dynamic images or GIFs',
    type: 'group'
}, async (message, match) => {
    const groupMetadata = await message.client.groupMetadata(message.chat).catch(() => {});
    const participants = groupMetadata ? groupMetadata.participants : [];
    
    // Get a random image/GIF from API or predefined list
    const tagImages = [
        'https://imgur.com/a/ocK7CZJ.jpg',
        'https://imgur.com/a/ocK7CZJ.jpg',
        'https://imgur.com/a/ocK7CZJ.jpg'
    ];
    const tagImage = config.TAG_IMAGE || tagImages[Math.floor(Math.random() * tagImages.length)];

    if (match === 'all') {
        let msg = '*🚀 Tagging All Members:*\n\n';
        let count = 1;
        for (const participant of participants) {
            msg += `${count++}. @${participant.id.split('@')[0]}\n`;
        }
        return await message.client.sendMessage(message.chat, {
            image: { url: tagImage },
            caption: msg,
            mentions: participants.map(participant => participant.id)
        });
    }

    if (match === 'admin' || match === 'admins') {
        const admins = participants.filter(p => p.admin !== null).map(p => p.id);
        let msg = '*👑 Tagging Admins:*\n\n';
        let count = 1;
        for (const admin of admins) {
            msg += `${count++}. @${admin.split('@')[0]}\n`;
        }
        return await message.client.sendMessage(message.chat, {
            image: { url: tagImage },
            caption: msg,
            mentions: parseMention(msg)
        });
    }

    if (match) {
        return await message.client.sendMessage(message.chat, {
            image: { url: tagImage },
            caption: match,
            mentions: participants.map(p => p.id)
        });
    }

    if (!message.reply_message) {
        return await message.reply('_Usage:_\n- `.tag all`\n- `.tag admin`\n- `.tag [message]`\n- Reply to a message with `.tag`');
    }

    await message.client.forwardMessage(message.chat, message.quoted_message, {
        contextInfo: {
            mentionedJid: participants.map(p => p.id)
        }
    });
});
