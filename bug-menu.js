import config from '../../config.cjs';

const startTime = Date.now();

const formatRuntime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const bugMenu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "bug-menu" || cmd === "bugmenu") {
    const now = Date.now();
    const runtime = formatRuntime(now - startTime);

    let profilePictureUrl = 'https://files.catbox.moe/mbnjxn.jpg';
    try {
      const pp = await sock.profilePictureUrl(m.sender, 'image');
      if (pp) profilePictureUrl = pp;
    } catch (e) {
      console.error("Failed to fetch profile picture:", e);
    }

    const text = `
╭───────────────────⭓
│ 🤖 ʙᴏᴛ : *mullar*
│ 🌐 ᴘʀᴇғɪx : .{prefix}
│ 📂 ᴍᴇɴᴜ : 𝗕𝗨𝗚-𝗠
│ 🧬 ᴠᴇʀ : *𝟸.𝟶.𝟶*
╰───────────────────⭓
➤ xeon-blast
➤ xeon-kill
➤ xeon-freeze
➤ mullar-kill
➤ ios-kill
➤ mullar-NFS
─────────────────────
🥷Mullars bug menu 🥷
─────────────────────
`;

    await sock.sendMessage(
      m.from,
      {
        image: { url: profilePictureUrl },
        caption: text.trim(),
        contextInfo: {
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: "mullar-Nfs",
            newsletterJid: "120363369453603973@newsletter",
          },
        },
      },
      { quoted: m }
    );
  }
};

export default bugMenu;
