const fs = require("fs");
require("../../../config");

module.exports = {
    type: 'convert',
    command: ['s', 'sticker', 'tosticker'],
    operate: async (context) => {
        const { tdx, m, prefix, command, quoted, reaction, mime, xreply } = context;
        
        if (!m.quoted) {
            await reaction(m.chat, "❗");
            await xreply(`Send a picture or video, then reply with "${prefix + command}". Maximum video duration is 10 seconds.`);
            return;
        }

        if (/image/.test(mime)) {
            await reaction(m.chat, "💟");
            try {
                let media = await quoted.download();
                let encmedia = await tdx.sendImageAsSticker(m.chat, media, m, {
                    packname: global.packname,
                    author: global.author
                });
                await fs.promises.unlink(encmedia);
            } catch (error) {
                console.error(error);
                await reaction(m.chat, "❗");
                await xreply("An error occurred while processing the image.");
            }
        } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 10) {
                await reaction(m.chat, "❗");
                await xreply("Video is too long to be a Sticker. Maximum duration is 10 seconds.");
                return;
            }
            try {
                let media = await quoted.download();
                await reaction(m.chat, "💟");
                let encmedia = await tdx.sendVideoAsSticker(m.chat, media, m, {
                    packname: global.packname,
                    author: global.author
                });
                await fs.promises.unlink(encmedia);
            } catch (error) {
                console.error(error);
                await reaction(m.chat, "❗");
                await xreply("An error occurred while processing the video.");
            }
        } else {
            await reaction(m.chat, "❗");
            await xreply(`Send a picture or video, then reply with "${prefix + command}". Maximum video duration is 10 seconds.`);
        }
    }
};