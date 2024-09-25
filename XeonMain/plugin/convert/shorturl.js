const axios = require('axios');
require("../../../config");

module.exports = {
    type: 'convert',
    command: ['shorten', 'shortlink', 'shorturl', 'shortenlink'],
    operate: async (context) => {
        const { tdx, m, q, prefix, command, reaction, xreply } = context;

        if (!q) {
            await xreply(`Add input, Example: *${prefix + command} https://example.com*`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            await reaction(m.chat, "🔁");
            const { data: tinyUrlShortUrl } = await axios.get(`https://tinyurl.com/api-create.php?url=${q}`);
            await xreply(`Shortened Succes\n\n*TinyURL: ${tinyUrlShortUrl}*`);
            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error shortening URL:', error);
            await xreply('Failed to shorten URL. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};