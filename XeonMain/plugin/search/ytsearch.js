const yts = require("yt-search");
const { format } = require('util');

module.exports = {
    type: 'search',
    command: ['ytsearch', 'play'],
    operate: async (context) => {
        const { q, tdx, m, xreply, reaction, crtImg } = context;

        if (!q) {
            await xreply('Add Input !!!\n\n*Example : porn gay video*');
            await reaction(m.chat, '❗');
            return;
        }

        try {
            await reaction(m.chat, '⬇️');

            let anu = (await yts(q)).all;
            let video = anu.filter(v => v.type === 'video');
            let channel = anu.filter(v => v.type === 'channel');

            let kocak = [];
            let meks = 6;

            for (let data of video) {
                if (kocak.length >= meks) break;

                let media = await crtImg(`https://i.ytimg.com/vi/${data.videoId}/default.jpg`);
                kocak.push({
                    body: { text: `${data.title}` },
                    footer: {
                        text: '© Spider Client - #Last Version'
                    },
                    header: { hasMediaAttachment: true, imageMessage: media },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Press To Select Option",
                                sections: [{
                                    title: "Select to Determine ( Audio or Video )",
                                    rows: [{
                                        header: "Download this as a Video",
                                        title: `${data.title}`,
                                        id: `.ytmp4 ${data.url}`
                                    },
                                    {
                                        header: "Download this as an Audio ( Music )",
                                        title: `${data.title}`,
                                        id: `.ytmp3 ${data.url}`
                                    }]
                                }]
                            })
                        }]
                    }
                });
            }

            await tdx.relayMessage(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `Results from \`${q}\`` },
                            footer: { text: "© Spider Client - #Last Version" },
                            carouselMessage: { cards: kocak }
                        }
                    }
                }
            }, {});

            await reaction(m.chat, '✅');
        } catch (error) {
            console.error('Error:', error);
            await xreply('Failed to download media from Instagram. Please try again later..');
            await reaction(m.chat, '❌');
        }
    }
};