require("../../../config");

module.exports = {
    type: 'convert',
    command: ['attp'],
    operate: async (context) => {
        const { tdx, m, q, prefix, command, reaction, xreply } = context;

        if (!q) {
            await xreply(`Add input, Example: *${prefix + command} aku adalah gay*`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            const lubangtile = `https://widipe.com/attp?text=${encodeURIComponent(q)}`;

            await reaction(m.chat, "🔁");
            await tdx.sendVideoAsSticker(m.chat, lubangtile, m, {
                packname: global.packname,
                author: global.author
            });

            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await xreply('Failed to generate meme. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};