const fs = require('fs');
const kripto = require('crypto');
require("../../../config");

module.exports = {
    type: 'tools',
    command: ['ambilq', 'getq'],
    operate: async (context) => {
        const { tdx, m, q, prefix, command, xreply } = context;
        if (!m.quoted) return xreply(`*Reply to the quoted message to be retrieved*`);
        
        let penis = JSON.stringify({ [m.quoted.mtype]: m.quoted }, null, 2);
        let jeneng = `MessageData_${kripto.randomBytes(8).toString('hex')}.json`;

        await fs.writeFileSync(jeneng, penis);
        await xreply(penis);
        await tdx.sendMessage(m.chat, { document: { url: `./${jeneng}` }, fileName: jeneng, mimetype: '*/*' }, { quoted: m });
        await fs.unlinkSync(jeneng);
    }
};