require("../../../config");

module.exports = {
    type: 'convert',
    command: ['textmaker'],
    operate: async (context) => {
        const { tdx, m, q, prefix, command, reaction, sleep, xreply, toTelegra, quoted } = context;
        
        if (!q) {
            await xreply(`Add input, Example: *${prefix + command} top text|bottom text*`);
            await reaction(m.chat, "❗");
            return;
        }
        
        let [peenis, pepekk] = q.split("|");
        pepekk = pepekk ? pepekk : " ";

/*        if (!peenis || !pepekk) {
            await xreply(`Invalid input. Ensure you have both top and bottom text separated by '|'. Example: *${prefix + command} teks atas|teks bawah*`);
            await reaction(m.chat, "❗");
            return;
        }*/

        try {
            let dwnld = await tdx.downloadAndSaveMediaMessage(quoted)
            let Bjirka = await toTelegra(dwnld);
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(peenis)}/${encodeURIComponent(pepekk)}.png?background=${Bjirka}`;

            await reaction(m.chat, "🔁");
//            await sleep(1500)
            await tdx.sendMessage(m.chat, {
                image: { url: smeme },
                caption: 'xeon bug bot v9'
            }, { quoted: m });

            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await xreply('Failed to generate meme. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
}