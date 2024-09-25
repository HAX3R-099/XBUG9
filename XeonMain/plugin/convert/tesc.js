module.exports = {
    type: 'convert',
    command: ['toescape', 'toescapeseq', 'tesc'],
    operate: async (context) => {
        const { q: text, m, prefix, command, xreply, reaction, sleep } = context;

        if (!text) {
            await xreply(`Example: *${prefix + command} hai, aku normal dan kamu homo*`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            let escapeSequences = Array.from(text, char => {
                let code = char.charCodeAt(0);
                return `\\u${code.toString(16).padStart(4, '0')}`;
            }).join('');
            await reaction(m.chat, "🔁");
            await sleep(500);
            await xreply(`Escape sequences:\n\n${escapeSequences}`);
            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await xreply('Failed to convert text to escape sequences. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};