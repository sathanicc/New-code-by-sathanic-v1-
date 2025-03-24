const { Function, sendAlive } = require("../lib/");
const config = require('../config');

Function({
	pattern: 'alive ?(.*)',
	fromMe: true,
	desc: 'Check if the bot is active with an image response.',
	type: 'info'
}, async (message, match, client) => {
	const aliveImage = config.ALIVE_IMAGE || 'https://imgur.com/a/ocK7CZJ.jpg'; // Replace with your image URL
	
	const caption = `✨ *Sathanic v1 is Alive!* ✨\n\n🤖 *Version:* 5.0.0\n🕒 *Uptime:* ${process.uptime().toFixed(2)}s\n⚡ *Status:* Running Smoothly!`;

	await client.sendMessage(message.chat, { image: { url: aliveImage }, caption });
});
