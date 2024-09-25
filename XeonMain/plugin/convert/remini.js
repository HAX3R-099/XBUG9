require("../../../config");

module.exports = {
    type: 'convert',
    command: ['enhance', 'hd', 'remini'],
    operate: async (context) => {
        const { tdx, m, quoted, reaction, xreply, remini } = context;

        if (!m.quoted) {
            await xreply(`Reply to an image with the command to enhance it.`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            await reaction(m.chat, "🔁");

            let media = await quoted.download();
            let enhancedImage = await remini(media, "enhance");

            await tdx.sendMessage(m.chat, { 
                image: enhancedImage, 
                caption: 'xeon bug bot v9' 
            }, { quoted: m });

            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await xreply('Failed to enhance the image. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};