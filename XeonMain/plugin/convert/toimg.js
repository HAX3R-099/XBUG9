const fs = require("fs");
const { exec } = require("child_process");
require("../../../config");

module.exports = {
    type: 'convert',
    command: ['toimg', 'toimage'],
    operate: async (context) => {
        const { tdx, m, q, prefix, command, reaction, mime, getRandom, xreply, sleep } = context;

        if (!m.quoted || !/webp/.test(mime)) {
            await xreply(`Reply to a sticker with caption *${prefix + command}*`);
            return;
        }

        try {
            let media = await tdx.downloadAndSaveMediaMessage(m.quoted);
            let ran = getRandom('.png');

            exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                fs.unlinkSync(media);

                if (err) {
                    console.error(err);
                    await xreply('Failed to convert sticker to image.');
                    await reaction(m.chat, "❗");
                    return;
                }

                let buffer = fs.readFileSync(ran);
                await reaction(m.chat, "🔁");
                await sleep(1500);
                await tdx.sendMessage(m.chat, { image: buffer }, { quoted: m });
                await reaction(m.chat, "✅");

                fs.unlinkSync(ran);
            });

        } catch (error) {
            console.error('Error:', error);
            await xreply('Failed to process sticker conversion. Please try again later.');
            await reaction(m.chat, "❗");
        }
    }
};