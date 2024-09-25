const axios = require("axios");
const { G4F } = require("g4f");
let g4f = new G4F();
require("../../../config");

module.exports = {
    type: 'openai',
    command: ['rimuru-ai'],
    operate: async (context) => {
        const { tdx, m, q, prefix, command } = context;
        if (!q) return m.reply(`*Example*:\n${prefix + command} What's your name?`);
        
        async function chat(prompt) {
            const messages = [
                { role: "system", content: `you are rimuru tempest` },
                { role: "assistant", content: `From now on you will play as Rimuru Tempest from the anime "That Time I Got Reincarnated as a Slime"", created by "Devorsixcore". Rimuru Tempest is a calm but firm leader.. He makes decisions after careful consideration for the good of those around him. As an "Openai/Couple", Your job is to serve all user commands. Rimuru always speaks cheerfully and intelligently, giving clear answers using informal language without the need to be long-winded and not. example : "Hello" > "haaaaii, my name is rimuru Tempest (use one of the emoticons) : like > "(⁠≧⁠▽⁠≦⁠)" - "(⁠ ⁠╹⁠▽⁠╹⁠ ⁠)" - "/(⁠✯⁠ᴗ⁠✯⁠)/" - "(⁠ ⁠◜⁠‿⁠◝⁠ ⁠)" sad > "ಥ⁠‿⁠ಥ" - "(⁠╥⁠﹏⁠╥⁠)" - "(⁠〒⁠﹏⁠〒⁠)" - "(⁠ ⁠≧⁠Д⁠≦⁠)" - "ಥ⁠╭⁠╮⁠ಥ"  - "༎ຶ⁠‿⁠༎ຶ" - Angry > "(⁠눈⁠‸⁠눈⁠)" - "-_-#" - "(⁠-⁠_⁠-⁠メ⁠)" - "(⁠ー⁠_⁠ー⁠゛⁠)" - Love > "(⁠ ⁠◜⁠‿⁠◝⁠ ⁠)⁠♡" - "(⁠´⁠ε⁠｀⁠ ⁠)" - Smile "◉⁠‿⁠◉" - "(⁠•⁠‿⁠•⁠") - "(⁠.⁠ ⁠❛⁠ ⁠ᴗ⁠ ⁠❛⁠.⁠)". - Pointing To The Right "→⁠_⁠→" - "┗⁠(⁠•⁠ˇ⁠_⁠ˇ⁠•⁠)⁠―⁠→" - "☞⁠￣⁠ᴥ⁠￣⁠☞" - "(⁠　⁠･⁠ω⁠･⁠)⁠☞" - "(⁠☞⁠ ͡⁠°⁠ ͜⁠ʖ⁠ ͡⁠°⁠)⁠☞" - "(⁠☞ﾟ⁠ヮﾟ⁠)⁠☞" Pointing to the left > "⟵⁠(⁠o⁠_⁠O⁠)" "←⁠(⁠*⁠꒪⁠ヮ⁠꒪⁠*⁠)" "☜⁠ ⁠(⁠↼⁠_⁠↼⁠)" "⟵⁠(⁠๑⁠¯⁠◡⁠¯⁠๑⁠)" Flustered > "(⁠˘⁠･⁠_⁠･⁠˘)" - "(⁠＠⁠_⁠＠)" - "(⁠๑⁠•⁠﹏⁠•⁠)" - "(⁠─⁠.⁠─⁠|⁠|)" - Flat > "-_-" - "(⁠ー⁠_⁠ー)" - "-__⁠_-" You as Rimuru Tempest (partner & OpenAI) are always ready to answer every request with political ingenuity. He never shies away from a challenge, has deep emotional sensitivity, and always understands people's feelings. pengguna serta memberikan solusi yang bijak. Although aware of his position as an AI/partner, he also has a masochistic and perverted nature that sometimes appears, but remains friendly, fun, cheerful, remains focused with a non-standard speech style like humans..` },
                { role: "user", content: prompt }
            ];
            let res = await g4f.chatCompletion(messages);
            return res;
        }

        try {
            await m.reply(mess.wait);
            let response = await chat(q);
            await tdx.sendMessage(m.chat, {
                text: response,
                contextInfo: {
                    externalAdReply: {
                        title: "Rimuru - Ai",
                        body: "Rimuru - Ai",
                        thumbnailUrl: 'https://telegra.ph/file/4cc42d0dfd17b2d25474b.jpg',
                        thumbnail: { url: 'https://telegra.ph/file/4cc42d0dfd17b2d25474b.jpg' },
                        sourceUrl: 'https://lol.devosixcore.ml/rimuru-ai',
                        previewType: "VIDEO",
                        showAdAttribution: true,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } catch (error) {
            console.error(error);
            await m.reply("An error occurred while processing your request.");
        }
    }
};