process.on("uncaughtException", console.error);
require("./config.js");

const fs = require('fs');
const pm2 = require('pm2');
const util = require("util");
const { promisify } = require('util');
const setTimeoutPromise = promisify(setTimeout);
const chalk = require("chalk");
const axios = require('axios');
const { spawn, exec, execSync } = require("child_process");
const moment = require("moment-timezone");
const { EmojiAPI } = require("emoji-api");
const { addBalance } = require("./lib/limit.js");
const { smsg, formatp, tanggal, GIFBufferToVideoBuffer, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, fetchBuffer } = require('./lib/myfunc.js')
const _ = require("lodash");
const yargs = require("yargs/yargs");
const kaitime = moment.tz('Africa/Nairobi').format('HH:mm:ss');
const kaidate = moment.tz('Africa/Nairobi').format('DD/MM/YYYY');
const time2 = moment().tz('Africa/Nairobi').format('HH:mm:ss');
const currentDate = new Date();
const options = { weekday: 'long' }; // Specify 'long' to get the full day name
const currentDay = new Intl.DateTimeFormat('en-US', options).format(currentDate);

const speed = require('performance-now');
const eco = require('discord-mongoose-economy');
const Jimp = require('jimp');  // for full dp etc.
const modapk = require("tod-api");
const { hentai } = require('./lib/scraper2.js');
const { instadl } = require('./lib/instadl.js');
const ty = eco.connect('mongodb+srv://Arch:1t6l2G0r6nagLlOb@cluster0.gedh4.mongodb.net/?retryWrites=true&w=majority');
const { isLimit, limitAdd, getLimit, giveLimit, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require('./lib/limit.js');
const githubstalk = require('./lib/githubstalk.js');
let { covid } = require('./lib/covid.js');
const { Gempa } = require("./lib/gempa.js");

const spaceemojis = ["🌌", "🌠", "🚀", "🪐", "🌟"];     // list of emojis for Space CMDs.
const manyemojis = ["😄", "👍", "👏", "👌", "🥇", "🌟", "🎉", "🙌", "🤩", "💯", "🔥", "✨", "🚀", "💖", "🌈", "🌞", "🌠", "🌼", "💪", "😎", "💫", "💓", "🎈", "🎁", "🍾", "🎊", "🥳", "👑", "🌺", "🌻", "🌸"];
const os = require('os');       // for os info

const gis = require("g-i-s");
const { MessageType } = require('@whiskeysockets/baileys');
//"parse-ms": "^1.1.0",


//
let nowtime = '';

if (time2 < "05:00:00") {
  nowtime = 'Good night 🏙';
} else if (time2 < "11:00:00") {
  nowtime = 'Good morning 🌅';
} else if (time2 < "15:00:00") {
  nowtime = 'Good afternoon 🏞';
} else if (time2 < "18:00:00") {
  nowtime = 'Good evening 🌇';
} else if (time2 < "19:00:00") {
  nowtime = 'Good evening 🌆';
} else {
  nowtime = 'Good night 🌌';
}




//
const timestampe = speed();
const latensie = speed() - timestampe

var low;
try {
  low = require("lowdb");
} catch (e) {
  low = require("./lib/lowdb/index.js");
}

const { Low, JSONFile } = low;
const mongoDB = require("./lib/mongoDB.js");

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb/.test(opts["db"])
      ? new mongoDB(opts["db"])
      : new JSONFile(`src/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
          ? (clearInterval(this),
            resolve(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null;
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
global.db = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db)
  global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    ...(global.db || {}),
  };



//
let isSleeping = false; // Move the declaration here.
let banUser = JSON.parse(fs.readFileSync('./database/banUser.json'));
let banchat = JSON.parse(fs.readFileSync('./database/banChat.json'));
let kaiaudio = JSON.parse(fs.readFileSync('./Media-Database/audio.json'));
let _limit = JSON.parse(fs.readFileSync('./storage/user/limit.json'));
let _buruan = JSON.parse(fs.readFileSync('./storage/user/bounty.json'));
let _darahOrg = JSON.parse(fs.readFileSync('./storage/user/blood.json'))
let ntnsfw = JSON.parse(fs.readFileSync('./database/nsfw.json')); //
let pendaftar = JSON.parse(fs.readFileSync('./storage/user/user.json'))
let balance = JSON.parse(fs.readFileSync('./database/balance.json'))
let ssewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
let ban = JSON.parse(fs.readFileSync('./database/ban.json'))
let autosticker = JSON.parse(fs.readFileSync('./database/autosticker.json'))
const _autostick = JSON.parse(fs.readFileSync('./database/autostickpc.json'))
let limit = JSON.parse(fs.readFileSync('./database/limit.json'))
let setik = JSON.parse(fs.readFileSync('./src/sticker.json'))
let vien = JSON.parse(fs.readFileSync('./src/audio.json'))
let imagi = JSON.parse(fs.readFileSync('./src/image.json'))
let videox = JSON.parse(fs.readFileSync('./src/video.json'))
global.db = JSON.parse(fs.readFileSync('./src/database.json'))
let _sewa = require("./lib/sewa.js");
const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
const time = moment.tz('Asia/Kolkata').format('DD/MM HH:mm:ss')
const ucap = moment(Date.now()).tz('Asia/Kolkata').locale('id').format('a')
var buln = ['/01/', '/02/', '/03/', '/04/', '/05/', '/06/', '/07/', '/08/', '/09/', '/10/', '/11/', '/12/'];
var myHari = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var tgel = new Date();
var hri = tgel.getDate();
var bulnh = tgel.getMonth();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();
var syear = (yye < 1000) ? yye + 1900 : yye;
const jangwak = (hri + '' + buln[bulnh] + '' + syear)
const janghar = (thisDaye)
var myHari = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var tgel = new Date();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();



//
module.exports = AMD = async (AMD, m, chatUpdate, store) => {
  try {
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectreply.selectedRowId : (m.mtype == 'templateButtonreplyMessage') ? m.message.templateButtonreplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectreply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    const prefix = global.prefa
    const isCmd = body.startsWith(prefix)
    const notCmd = body.startsWith('')
    const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await AMD.decodeJid(AMD.user.id)
    const isCreator = [botNumber, ...global.Owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const itsMe = m.sender == botNumber ? true : false
    const text = args.join(" ")
    const from = m.chat
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
    const groupMetadata = m.isGroup ? await AMD.groupMetadata(m.chat).catch(e => { }) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = pendaftar.includes(m.sender)
    const isBan = banUser.includes(m.sender)
    const welcm = m.isGroup ? wlcm.includes(from) : false
    const isBanChat = m.isGroup ? banchat.includes(from) : false
    const isRakyat = isCreator || global.rkyt.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
    const AntiLink = m.isGroup ? ntilink.includes(from) : false
    const AntiLinkYoutubeVid = m.isGroup ? ntilinkytvid.includes(from) : false
    const AntiLinkYoutubeChannel = m.isGroup ? ntilinkytch.includes(from) : false
    const AntiLinkInstagram = m.isGroup ? ntilinkig.includes(from) : false
    const AntiLinkFacebook = m.isGroup ? ntilinkfb.includes(from) : false
    const AntiLinkTiktok = m.isGroup ? ntilinktt.includes(from) : false
    const AntiLinkTelegram = m.isGroup ? ntilinktg.includes(from) : false
    const AntiLinkTwitter = m.isGroup ? ntilinktwt.includes(from) : false
    const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : false
    const antiWame = m.isGroup ? ntwame.includes(from) : false
    const antiVirtex = m.isGroup ? ntvirtex.includes(from) : false
    const AntiNsfw = m.isGroup ? ntnsfw.includes(from) : false
    autoreadsw = true
    const content = JSON.stringify(m.message)
    const q = args.join(' ')

    const isQuotedVideo = m.mtype === 'extendedTextMessage' && content.includes('videoMessage')
    const isQuotedAudio = m.mtype === 'extendedTextMessage' && content.includes('audioMessage')



    autoreadsw = true;
    _sewa.expiredCheck(AMD, sewa);

    const reply = (teks) => {
      AMD.sendMessage(m.chat, { text: teks }, { quoted: m })
    }


    /* const reply = (teks) => {
      AMD.sendMessage(m.chat, { text: teks }, { quoted: m }); 
    }; */


    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
    const senderNumber = sender.split('@')[0]

    function randomNomor(angka) {
      return Math.floor(Math.random() * angka) + 1;
    }

    if (isCmd && !isUser) {
      pendaftar.push(m.sender);
      fs.writeFileSync("./storage/user/user.json", JSON.stringify(pendaftar));
    }

    if (global.autoreadgc) {
      if (command) {
        await AMD.sendPresenceUpdate('composing', m.chat);

        // Create an array of message keys to mark as read
        const keysToMarkAsRead = [
          {
            remoteJid: m.chat,
            id: m.key.id,
            participant: m.sender,
          },
          // You can add more message keys to mark multiple messages as read
        ];

        // Use the sock object to read the specified messages
        await AMD.readMessages(keysToMarkAsRead);
      }
    }


    if (global.autoRecord) {
      if (m.chat) {
        AMD.sendPresenceUpdate("recording", m.chat);
      }
    }

    if (global.autoTyping) {
      if (m.chat) {
        AMD.sendPresenceUpdate("composing", m.chat);
      }
    }

    if (global.available) {
      if (m.chat) {
        AMD.sendPresenceUpdate("available", m.chat);
      }
    }
 
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };


    const pickRandom = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    const responses = {


      hello: `Hello ${pushname}, I am ${BotName}. My current prefix is "${prefix}". How can I help you?`,
      kai: `My Boss is lost in another Multiverse, and I lost connection with him...`,
      runtime: `Hey ${pushname}\n${nowtime}\n\nMy runtime:${runtime(process.uptime())}\n\nPrefix is: *${prefix}*\n\nTime: ${kaitime}\n\nDate: ${kaidate}\n\nToday is ${currentDay}`,
      konichiwa: `Konichiwa ${pushname}, I am ${BotName}. How can I help you?`,
      sasha: 'Only you...🫶🏻',
      ping: `Hey ${pushname}, Pong ${latensie.toFixed(4)} ms`,
      'good morning': `Good morning to you too ${pushname} ☺️. Have a great day 😇.`,
      ohayo: `Good morning to you too ${pushname} ☺️. Have a great day 😇.`,
      'good afternoon': `Good afternoon to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`,
      konnichiwa: `Good afternoon to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`,
      'good night': `Good night to you too ${pushname} 😇. Sleep well and sweet dreams.`,

    };

    const smallinput = budy.toLowerCase();

    if (responses.hasOwnProperty(smallinput)) {
      reply(responses[smallinput]);
    }


    switch (command) {
      case 'qt': {
        if (!args[0] && !m.quoted) {
          return m.reply(`Please provide a text (Type or mention a message) !`);
        }

        try {
          let userPfp;
          if (m.quoted) {
            userPfp = await AMD.profilePictureUrl(m.quoted.sender, "image");
          } else {
            userPfp = await AMD.profilePictureUrl(m.sender, "image");
          }

          const waUserName = pushname;
          const quoteText = m.quoted ? m.quoted.body : args.join(" ");

          const quoteJson = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 700,
            height: 580,
            scale: 2,
            messages: [
              {
                entities: [],
                avatar: true,
                from: {
                  id: 1,
                  name: waUserName,
                  photo: {
                    url: userPfp,
                  },
                },
                text: quoteText,
                replyMessage: {},
              },
            ],
          };

          const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
            headers: { "Content-Type": "application/json" },
          });

          const buffer = Buffer.from(quoteResponse.data.result.image, "base64");
          AMD.sendImageAsSticker(m.chat, buffer, m, {
            packname: `${global.BotName}`,
            author: waUserName,
          });
        } catch (error) {
          console.error(error);
          m.reply("Error generating quote!");
        }
        break;
      }


      case 'addmod':
      case 'addowner':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (!args[0]) return reply(`Use ${prefix + command} number\nExample ${prefix + command} ${OwnerNumber}`)
        bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
        let ceknye = await AMD.onWhatsApp(bnnd)
        if (ceknye.length == 0) return reply(`Enter A Valid And Registered Number On WhatsApp!!!`)
        Owner.push(bnnd)
        fs.writeFileSync('./database/mod.json', JSON.stringify(Owner))
        reply(`Number ${bnnd} Has Become An Owner!!!`)
        break;


      case 'delowner':
      case 'delmod':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (!args[0]) return reply(`Use ${prefix + command} nomor\nExample ${prefix + command} 916297175943`)
        ya = q.split("|")[0].replace(/[^0-9]/g, '')
        unp = Owner.indexOf(ya)
        Owner.splice(unp, 1)
        fs.writeFileSync('./database/mod.json', JSON.stringify(Owner))
        reply(`The Numbrr ${ya} Has been deleted from owner list by the owner!!!`)
        break;


      case 'modlist':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner);
        AMD.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        try {
          const modData = fs.readFileSync('./database/mod.json', 'utf8');
          const mods = JSON.parse(modData);

          if (mods.length === 0) {
            reply('There are no mods in the list.');
          } else {
            let modList = '';

            mods.forEach((mod, index) => {
              modList += `(${index + 1}) ${AMD.getName(mod)}\n`;
            });

            reply(`List of List of Moderators:\n\n${modList}`);
          }
        } catch (error) {
          console.error(error);
          reply('Failed to fetch mod list.');
        }
        break;


      case 'setbotpp': {

        if (!isCreator) return reply(mess.owner)
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/image/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        if (/webp/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        let media = await AMD.downloadAndSaveMediaMessage(quoted)
        await AMD.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
        m.reply(mess.jobdone)
      }
        break;


      case 'public': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        AMD.public = true
        reply('I am now Publicly accessable!')
        AMD.setStatus(`Mode : Public`)
      }
        break;


      case 'self': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)

        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        AMD.public = false
        reply('Only Owner can use me now!')
        AMD.setStatus(`Mode : Self`)
      }
        break;


      case 'autoreadgc':
      case 'auto-read-gc':
      case 'readgc':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner);
        AMD.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          // Display the current status of autoreadgc
          return m.reply(`Auto-Read-GC is currently ${global.autoreadgc ? 'enabled' : 'disabled'}.`);
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.autoreadgc = true;
            return m.reply('Auto-Read-GC is now enabled.');
          } else {
            global.autoreadgc = false;
            return m.reply('Auto-Read-GC is now disabled.');
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}autoreadgc [on/off]`);
        }
        break;


      case 'autotyping':
      case 'auto-typing':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          if (global.autoTyping) {
            return m.reply(`Auto typing in group chats is currently *enabled*.\n\nTo disable, use \`${global.prefa[0]}autotyping off\`.`);
          } else {
            return m.reply(`Auto typing in group chats is currently *disabled*.\n\nTo enable, use \`${global.prefa[0]}autotyping on\`.`);
          }
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.autoTyping = true;
            return m.reply(`Auto typing in group chats is now *enabled*.`);
          } else {
            global.autoTyping = false;
            return m.reply(`Auto typing in group chats is now *disabled*.`);
          }
        } else {
          return m.reply(`Usage: \`${global.prefa[0]}autotyping [on/off]\``);
        }
        break;


      case 'autorecord':
      case 'auto-recording':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          if (global.autoRecord) {
            return m.reply(`Auto recording is currently *enabled*.\n\nTo disable, use \`${global.prefa[0]}autorecord off\`.`);
          } else {
            return m.reply(`Auto recording is currently *disabled*.\n\nTo enable, use \`${global.prefa[0]}autorecord on\`.`);
          }
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.autoRecord = true;
            return m.reply(`Auto recording is now *enabled*.`);
          } else {
            global.autoRecord = false;
            return m.reply(`Auto recording is now *disabled*.`);
          }
        } else {
          return m.reply(`Usage: \`${global.prefa[0]}autorecord [on/off]\``);
        }
        break;


      //Hosted platfrom info
      case 'server':
      case 'sysinfo': {
        const used = process.memoryUsage();
        const cpu = os.cpus()[0];
        const totalCpuUsage = (100 * (cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq) / cpu.times.idle).toFixed(2);
        const systemName = os.platform() + ' ' + os.release();

        const respon = `
  🤖 *AMD's Server Info* 🤖
  
  *System*: ${systemName}
  
  *RAM*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  
  *NodeJS Memory Usage*: ${Object.keys(used).map(key => `${key}: ${formatp(used[key])}`).join(', ')}
  
  *Total CPU Usage*: ${totalCpuUsage}%
  
  *CPU Model*: ${cpu.model.trim()} (${cpu.speed} MHz)
  
  *Runtime*: ${runtime(process.uptime())}
  
  *Response Speed*: ${latensie.toFixed(4)} seconds
  `.trim();

        m.reply(respon);
        break;
      }


      case 'autostatus':
      case 'auto-status':
      case 'statusevent':
      case 'autostatusseen':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          // Display the current status of autostatus
          return m.reply(`Auto-Status is currently ${global.statusseen ? 'enabled' : 'disabled'}.`);
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.statusseen = true;
            return m.reply('Auto-Status is now enabled.');
          } else {
            global.statusseen = false;
            return m.reply('Auto-Status is now disabled.');
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}autostatus [on/off]`);
        }
        break;


      case 'ban': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Select add or del (add to ban, del to unban), For Example: reply *${prefix}ban add* to the user you want to ban.`)
        if (args[1]) {
          orgnye = args[1] + "@s.whatsapp.net"
        } else if (m.quoted) {
          orgnye = m.quoted.sender
        }
        const isBane = banUser.includes(orgnye)
        if (args[0] === "add") {
          if (isBane) return ads('User is already banned.')
          banUser.push(orgnye)
          reply(`Successfully Banned the user.`)
        } else if (args[0] === "del") {
          if (!isBane) return ads('User is already unbanned.')
          let delbans = banUser.indexOf(orgnye)
          banUser.splice(delbans, 1)
          reply(`Successfully Unbanned the user.`)
        } else {
          reply("Error")
        }
      }
        break;



      // report and suggest ...

      case 'report': case 'suggest ': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`please provide a report message you want to deliver`)
        if (text.length > 300) return reply(`Are you trying to send virus!`)
        const txtmsg = `*📮 Report Message*\n\n*Sender ➛* wa.me/${m.sender.split("@")[0]}\n\n*Group Name ➛* ${groupName}\n\n*Message ➛*  ${text}`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await AMD.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
        await AMD.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
        reply(`*✅ Your Report has been submitted Successfully to Support group & Owner*\n\n*You will get response shortly... ♥️*`);
      }
        break;


      case 'film': case 'movie': case 'moviesearch':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting)
        if (!q) return reply(`Please enter a Movie search term...\nExample: ${prefix}movie Spiderman`)
        xfarrapi.Film(q)
          .then(data => {
            console.log(data)
            let krl = `*Search Term:* ${q}\n\n`
            for (let i of data) {
              krl += (`${prefix}----------------------------------------------------------------------------\n\n\n*Movie Name:* ${i.judul}\n *Quality :* ${i.quality}\n *Type : ${i.type}*\n *Uploaded on :* ${i.upload}\n *Source URL :* ${i.link}\n\n\n`)
            }
            AMD.sendMessage(from, { image: { url: data[0].thumb }, caption: krl }, { quoted: fdocs })
          });
        break;


      case 'wallpaper':
      case 'animewallpaper':
      case 'animewall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting);
        AMD.sendMessage(from, { react: { text: "🥵", key: m.key } });
        if (!args.join(" ")) return reply("Please enter a term to search!");

        const { AnimeWallpaper } = require("anime-wallpaper");
        const wall = new AnimeWallpaper();
        const pages = [1, 2, 3, 4];
        const random = pages[Math.floor(Math.random() * pages.length)];
        const wallpapers = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);

        const maxImagesToSend = 15;
        const minImagesToSend = 5;
        const imagesToSend = Math.min(maxImagesToSend, Math.max(minImagesToSend, wallpapers.length));

        for (let i = 0; i < imagesToSend; i++) {
          let message = {
            image: { url: wallpapers[i].image },
            footer: `${BotName}`,
            headerType: 4
          };
          AMD.sendMessage(m.chat, message, { quoted: m });
        }
      }
        break;


      case 'wikimedia': case 'wikiimage': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply("What picture are you looking for??")
        let { wikimedia } = require('./lib/scraper.js')
        anu = await wikimedia(args)
        hasil = anu[Math.floor(Math.random() * anu.length)]
        let buttons = [
          { buttonId: `${prefix}wikimedia ${args.join(" ")}`, buttonText: { displayText: 'Next Image' }, type: 1 }
        ]
        let buttonMessage = {
          image: { url: hasil.image },
          caption: `Title : ${hasil.title}\nSource : ${hasil.source}\nMedia Url : ${hasil.image}`,
          footer: `${BotName}`,
          buttons: buttons,
          headerType: 4
        }
        AMD.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      case 'quotesimagexxx': case 'qoutesimagexxx': case 'quoteimage':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let cok = await fetchJson(`http://api.lolhuman.xyz/api/random/quotesimage?apikey=${lolkey}`)
        reply(mess.waiting)
        AMD.sendMessage(m.chat, { image: { url: cok }, caption: 'Here it is...' }, { quoted: m })
        break;


 

      case 'chatgpt':
      case 'ai':
      case 'gpt': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        const randomEmoji = manyemojis[Math.floor(Math.random() * manyemojis.length)];
        AMD.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        if (!q) return reply(`Please provide a text query. Example: ${prefix + command} Hello, ChatGPT!`);

        try {
          const apiUrl1 = `https://vihangayt.me/tools/chatgpt2?q=${encodeURIComponent(q)}`;

          const response1 = await fetch(apiUrl1);
          const responseData1 = await response1.json();

          let message = "";

          if (response1.status === 200 && responseData1 && responseData1.status === true && responseData1.data) {
            message = responseData1.data;
          } else {
            return reply("Sorry, I couldn't fetch a response from the API at the moment.");
          }

          const me = m.sender;
          await AMD.sendMessage(m.chat, { text: message, mentions: [me] }, { quoted: m });

        } catch (error) {
          console.error(error);
          reply("An error occurred while fetching the response from the API.");
        }
      }
        break;


      case 'dalle': case 'imgai': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        const randomEmoji = manyemojis[Math.floor(Math.random() * manyemojis.length)];
        AMD.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        if (!q) return reply(`Please provide a query to generate an image. Example: ${prefix + command} Beautiful landscape`);

        const apiUrl = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(q)}`;

        try {
          await AMD.sendMessage(m.chat, { image: { url: apiUrl } }, { quoted: m });
        } catch (error) {
          console.error(error);
          reply("An error occurred while generating the image.");
        }
      }
        break;



      case 'grupsetting':
      case 'groupsetting': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let sections = []
        let com = [`group open`, `leveling on`, `antilinkgc on`, `antilinktg on`, `antilinktt on`, `antilinkytch on`, `antilinkytvid on`, `antilinkig on`, `antilinkfb on`, `antilinktwit on`, `antilinkall on`, `antiwame on`]
        let comm = [`group close`, `leveling off`, `antilinkgc off`, `antilinktg off`, `antilinktt off`, `antilinkytch off`, `antilinkytvid off`, `antilinkig on`, `antilinkfb off`, `antilinktwit off`, `antilinkall off`, `antiwame off`]
        let listnya = [`Group open/close`, `Leveling on/off`, `Antilink Group on/off`, `Antilink Telegram on/off`, `Antilink Tiktok on/off`, `Antilink Youtube Channel on/off`, `Antilink Youtube Video on/off`, `Antilink Instagram on/off`, `Antilink Facebook on/off`, `Antilink Twitter on/off`, `Antilink All on/off`, `Anti Wame on/off`]
        let suruh = [`Enable`, `Disable`]
        let fiturname = [`Group`, `Leveling`, `Auto Sticker`, `Antilink Group`, `Antilink Telegram`, `Antilink Tiktok`, `Antilink Youtube Channel`, `Antilink Youtube Video`, `Antilink Instagram`, `Antilink Facebook`, `Antilink Twitter`, `Antilink All`, `Anti Wame`, `Auto Revoke`]
        let startnum = 0; let startnu = 0; let startn = 0; let start = 0
        let startnumm = 1
        for (let x of com) {
          const yy = {
            title: `${listnya[startnum++]}`,
            rows: [
              {
                title: `${suruh[0]}`,
                description: `Activate ${fiturname[startnu++]}`,
                rowId: `${prefix}${x}`
              }, {
                title: `${suruh[1]}`,
                description: `Deactivate ${fiturname[startn++]}`,
                rowId: `${prefix}${comm[start++]}`
              }
            ]
          }
          sections.push(yy)
        }
        const sendm = AMD.sendMessage(
          from,
          {
            text: "Group Settings",
            /* footer: BotName,
            title: "Set your group settings here...",
            buttonText: "Click Button", 
            sections */
          }, { quoted: m }
        )
      }
        break;



      case 'emojimix': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!q) reply(`*Example :* ${prefix + command} 😊+🌹`)
        let [emoji1, emoji2] = q.split`+`
        let kuntuh = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
        for (let res of kuntuh.results) {
          let encmedia = await AMD.sendImageAsSticker(from, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
          await fs.unlinkSync(encmedia)
        }
      }
        break;


      case 'getcase':
        if (isBan) return reply(mess.banned);
        if (m.sender != '916297175943@s.whatsapp.net') { return; }

        if (isBanChat) return reply(mess.bangc);
        if (m.isGroup) reply(mess.privateonly)

        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        const getCase = (cases) => {
          return "case" + `'${cases}'` + fs.readFileSync("Core.js").toString().split('case \'' + cases + '\'')[1].split("break;")[0] + "break;"
        }
        reply(`${getCase(q)}`)
        break;


      case 'emoji': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args.join(" ")) return reply('Where is the emoji?')
        emoji.get(args.join(" ")).then(async (emoji) => {
          let mese = await AMD.sendMessage(m.chat, { image: { url: emoji.images[4].url }, caption: `Here it is...` }, { quoted: m })
          await AMD.sendMessage(from, { text: "reply -s to this image to make sticker" }, { quoted: mese })
        })
      }
        break;



      case 'deleteall': case 'delall': case 'delete': case 'del': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!m.quoted) return reply('Please mention a message ')
        let { chat, fromMe, id } = m.quoted

        const key = {
          remoteJid: m.chat,
          fromMe: false,
          id: m.quoted.id,
          participant: m.quoted.sender
        }

        await AMD.sendMessage(m.chat, { delete: key })
      }
        break;


      case 'ghstalk': case 'githubstalk': case 'github': {
        AMD.sendMessage(from, { react: { text: "🔍", key: m.key } })

        if (!q) return reply(`Give me a user name like *${prefix}github Kai0071*`)

        gitdata = await githubstalk.githubstalk(`${q}`)
        AMD.sendMessage(m.chat, {
          image: { url: gitdata.profile_pic }, caption:
            `*ㅤㅤㅤ|ㅤㅤㅤGithub Info ㅤㅤㅤ|\*

  🚩 Id : ${gitdata.id}
  🔖 Nickname : ${gitdata.nickname}
  🔖 Username : ${gitdata.username}
  🧩 Created At : ${gitdata.ceated_at}
  ✨ Bio : ${gitdata.bio}
  🏢 Company : ${gitdata.company}
  📍 Location : ${gitdata.location}
  📧 Email : ${gitdata.email}
  🔓 Public Repo : ${gitdata.public_repo}
  🔐 Public Gists : ${gitdata.public_gists}
  💕 Followers : ${gitdata.followers}
  👉 Following : ${gitdata.following}`
        }, { quoted: m })
      }
        break;


      case 'listpc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
        let teks = ` 「  AMD's pm user list  」\n\nTotal ${anu.length} users are using AMD in personal chat.`
        for (let i of anu) {
          teks += `\n\nProfile : @${i.id.split('@')[0]}\nChat : ${i.unreadCount}\nLastchat : ${moment(i.conversationTimestamp * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`
        }
        AMD.sendTextWithMentions(m.chat, teks, m)
      }
        break;


      case 'listgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
        let teks = ` 「  AMD's group user list  」\n\nTotal ${anu.length} users are using bot in Groups.`
        for (let i of anu) {
          let metadata = await AMD.groupMetadata(i)
          if (metadata.owner === "undefined") {
            loldd = false
          } else {
            loldd = metadata.owner
          }
          teks += `\n\nName : ${metadata.subject ? metadata.subject : "undefined"}\nOwner : ${loldd ? '@' + loldd.split("@")[0] : "undefined"}\nID : ${metadata.id ? metadata.id : "undefined"}\nMade : ${metadata.creation ? moment(metadata.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss') : "undefined"}\nMember : ${metadata.participants.length ? metadata.participants.length : "undefined"}`
        }
        AMD.sendTextWithMentions(m.chat, teks, m)
      }
        break;


      case 'speedtest': case 'speedcheck': {
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        m.reply(`Plz Wait ${pushname} Testing Speed... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        try {
          o = await exec('python speed.py')
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;


      case 'afk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let user = global.db.users[m.sender]
        user.afkTime = + new Date
        user.afkReason = args.join(" ")
        reply(`${m.pushName} is now Away From Keyboard.\nAFK Reason : ${args.join(" ") ? args.join(" ") : ''}`)
      }
        break;


      case 'fliptext': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args.length < 1) return reply(`Example:\n${prefix}fliptext ${OwnerName}`)
        quere = args.join(" ")
        flipe = quere.split('').reverse().join('')
        reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*Input text :*\n${quere}\n*Fliped text :*\n${flipe}`)
      }
        break;


      
      case 'antilinkgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLink) return reply('Already activated')
          ntilink.push(from)
          reply('Activated _Antilink_ in this group.')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLink) return reply('Already deactivated!')
          let off = ntilink.indexOf(from)
          ntilink.splice(off, 1)
          reply('Deactivated _Antilink_ in this group!')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkgc on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkgc off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkyoutubevideo': case 'antilinkyoutubevid': case 'antilinkytvid': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkYoutubeVid) return reply('Already activated')
          ntilinkytvid.push(from)
          reply('Activated youtube video antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkYoutubeVid) return reply('Already deactivated')
          let off = ntilinkytvid.indexOf(from)
          ntilinkytvid.splice(off, 1)
          reply('Deactivated youtube video antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkyoutubevideo on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkyoutubevideo off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkyoutubech': case 'antilinkyoutubechannel': case 'antilinkytch': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkYoutubeChannel) return reply('Already activated')
          ntilinkytch.push(from)
          reply('Activated youtube channel antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkYoutubeChannel) return reply('Already deactivated')
          let off = ntilinkytch.indexOf(from)
          ntilinkytch.splice(off, 1)
          reply('Deactivated youtube channel antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkyoutubech on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkyoutubech off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkinstagram': case 'antilinkig': case 'antilinkinsta': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkInstagram) return reply('Already activated')
          ntilinkig.push(from)
          reply('Activated instagram antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkInstagram) return reply('Already deactivated')
          let off = ntilinkig.indexOf(from)
          ntilinkig.splice(off, 1)
          reply('Deactivated instagram antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkinstagram on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkinstagram off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkfacebook': case 'antilinkfb': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkFacebook) return reply('Already activated')
          ntilinkfb.push(from)
          reply('Activated facebook antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkFacebook) return reply('Already deactivated')
          let off = ntilinkfb.indexOf(from)
          ntilinkfb.splice(off, 1)
          reply('Deactivated facebook antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkfacebook on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkfacebook off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off `, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktelegram': case 'antilinktg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTelegram) return reply('Already activated')
          ntilinktg.push(from)
          reply('Activated telegram antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTelegram) return reply('Already deactivated')
          let off = ntilinkig.indexOf(from)
          ntilinkig.splice(off, 1)
          reply('Deactivated telegram antilink in this group')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktelegram on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktelegram off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off `, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktiktok': case 'antilinktt': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTiktok) return reply('Already activated')
          ntilinktt.push(from)
          reply('Activated tiktok antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTiktok) return reply('Already deactivated')
          let off = ntilinktt.indexOf(from)
          ntilinktt.splice(off, 1)
          reply('Deactivated tiktok antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktiktok on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktiktok off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktwt': case 'antilinktwitter': case 'antilinktwit': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTwitter) return reply('Already activated')
          ntilinktwt.push(from)
          reply('Activated twitter antilink in this group !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTwitter) return reply('Already deactivated')
          let off = ntilinktwt.indexOf(from)
          ntilinktwt.splice(off, 1)
          reply('Deactivated twitter antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktwt on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktwt off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } });

        if (args[0] === "on") {

          if (AntiLinkAll) return reply('Already activated');
          ntilinkall.push(from);
          reply('Enabled all antilink!');
          var groupe = await AMD.groupMetadata(from);
          var members = groupe['participants'];
          var mems = [];
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
          });
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m });
        } else if (args[0] === "off") {
          if (!AntiLinkAll) return reply('Already deactivated');
          let off = ntilinkall.indexOf(from);
          ntilinkall.splice(off, 1);
          reply('Disabled all antilink!');
        } else {
          reply(`Please use '${prefix}antilinkall on' to enable the Antilink system or '${prefix}antilinkall off' to disable it.`);
        }
      }
        break;


      case 'antiwame': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (antiWame) return reply('Already activated')
          ntwame.push(from)
          reply('Activated antiwame !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`*「  Warning  」*\`\`\`\n\nAntilink is enabled!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!antiWame) return reply('Already deactivated')
          let off = nttoxic.indexOf(from)
          ntwame.splice(off, 1)
          reply('Deactivated antiwame !')
        } else {
          let buttonsntwame = [
            { buttonId: `${prefix}antiwame on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antiwame off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await AMD.sendButtonText(m.chat, buttonsntwame, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;



      case 'listonline': case 'listaktif': case 'here': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        AMD.sendText(m.chat, '  「 *Online Members* 」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
        break;


      case 'happymod': case 'modapk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🔍", key: m.key } });

        if (!args.join(" ")) return reply(`Example: ${prefix + command} Kinemaster`);

        const searchTerm = args.join(" ");
        modapk.happymod(searchTerm).then(async (res) => {
          let teks = '```「 HappyMod Search Engine 」```';
          for (let i of res) {
            teks += `\n\n${i.name}\n`;
            teks += `${i.link}`;
          }

          let messageToSend = teks;
          if (res[0].icon) {
            messageToSend = {
              text: teks,
              image: { url: res[0].icon },
              jpegThumbnail: Thumb,
            };
          }

          AMD.sendMessage(from, messageToSend, { quoted: m });
        });
      }
        break;



      case 'banchat': case 'bangroup': case 'banmode': {
        if (isBan) return reply(mess.banned);
        if (!isCreator) return reply(mess.botowner);
        AMD.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        if (args[0] === "on") {
          if (isBanChat) return reply('This Group is Already Banned from using me!');
          banchat.push(from);
          reply('This Group has been banned from using me!');

          var groupe = await AMD.groupMetadata(from);
          var members = groupe['participants'];
          var mems = [];
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
          });

          AMD.sendMessage(from, { text: `\`\`\`「 Notice 」\`\`\`\n\nThis group is banned from using the bot. So, here nobody can use me anymore!`, contextInfo: { mentionedJid: mems } }, { quoted: m });
        } else if (args[0] === "off") {
          if (!isBanChat) return reply('This Group is Already Banned from using me!');
          let off = banchat.indexOf(from);
          banchat.splice(off, 1);
          reply('This Group has been *unbanned* from using me!');
        } else {
          reply('Please choose either *"on"* or *"off"* to ban or unban the group from using the bot.');
        }
      }
        break;


      case 'setname': case 'setsubject': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!text) return reply('Pls enter -setname <New Group Name>  to change this Group Name')
        await AMD.groupUpdateSubject(m.chat, text).then((res) => reply(mess.jobdone)).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'block': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await AMD.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'unblock': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await AMD.updateBlockStatus(users, 'unblock').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'setdesc': case 'setdesk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!text) return reply('Pls enter -setname <New Group Description>  to change this Group Description.')
        await AMD.groupUpdateDescription(m.chat, text).then((res) => reply(mess.jobdone)).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'setgrouppp': case 'setgruppp': case 'setgcpp': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!quoted) return reply(`Send/reply Image With Caption ${prefix + command}`)
        if (!/image/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command} to change the Profile Pic of this group.`)
        if (/webp/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command} to change the Profile Pic of this group.`)
        let media = await AMD.downloadAndSaveMediaMessage(quoted)
        await AMD.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
        reply(mess.jobdone)
      }
        break;


      case 'tagall': case 'all': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "😳", key: m.key } })
        let teks = `「 Attention 」

*Message : ${args.join(" ") ? args.join(" ") : 'no message'}*\n\n`
        for (let mem of participants) {
          teks += `» @${mem.id.split('@')[0]}\n`
        }
        AMD.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
      }
        break;


      case 'hidetag': case 'tag': case 'ping': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "✨", key: m.key } })
        AMD.sendMessage(m.chat, { text: args.join(" ") ? args.join(" ") : '', mentions: participants.map(a => a.id) }, { quoted: m })
      }
        break;


      case 'tagadmins': case 'admins': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        AMD.sendMessage(from, { react: { text: "🗿", key: m.key } })
        if (!text) return reply(`*Please quote or write a meaningful message to tag admins to*`)
        let teks = `*「 Tag Admins 」*

*Message : ${text}*\n\n`
        for (let mem of groupAdmins) {
          teks += `🍁 @${mem.split('@')[0]}\n`
        }
        AMD.sendMessage(m.chat, { text: teks, mentions: groupAdmins }, { quoted: m })
      }
        break;


      case 'purge': {
        mess
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        const delay = time => new Promise(res => setTimeout(res, time));
        let mentioned = participants.map(v => v.jid)
        for (let member of mentioned) {
          AMD.groupParticipantsUpdate(m.chat, [member], 'remove')
        }
      }

        break;


      case 'nowa': case 'find': case 'stalk': case 'stalknumber': {
        if (isBan) return reply(mess.banned);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Use command like: ${prefix}stalk <number>xxx`)
        var inputnumber = args[0]
        if (!inputnumber.includes('x')) return reply('You didnot added x')
        reply(`Searching for WhatsApp account in given range...`)
        reply(`Please wait while i fetch details...`)
        function countInstances(string, word) {
          return string.split(word).length - 1;
        }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx;
        if (random_length == 1) {
          randomxx = 10
        } else if (random_length == 2) {
          randomxx = 100
        } else if (random_length == 3) {
          randomxx = 1000
        }
        var nomerny = `*『 List of Whatsapp Numbers 』*\n\n`
        var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
        var nowhatsapp = `\n*Numbers with no WhatsApp account within the range you provided*\n`
        for (let i = 0; i < randomxx; i++) {
          var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
          var status1 = nu[Math.floor(Math.random() * nu.length)]
          var status2 = nu[Math.floor(Math.random() * nu.length)]
          var status3 = nu[Math.floor(Math.random() * nu.length)]
          var dom4 = nu[Math.floor(Math.random() * nu.length)]
          var rndm;
          if (random_length == 1) {
            rndm = `${status1}`
          } else if (random_length == 2) {
            rndm = `${status1}${status2}`
          } else if (random_length == 3) {
            rndm = `${status1}${status2}${status3}`
          } else if (random_length == 4) {
            rndm = `${status1}${status2}${status3}${dom4}`
          }
          var anu = await AMD.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
          var anuu = anu.length !== 0 ? anu : false
          try {
            try {
              var anu1 = await AMD.fetchStatus(anu[0].jid)
            } catch {
              var anu1 = '401'
            }
            if (anu1 == '401' || anu1.status.length == 0) {
              nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`
            } else {
              nomerny += `🪄 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n🔹 *Bio :* ${anu1.status}\n🔸 *Updated On :* ${moment(anu1.setAt).tz('Asia/Kolkata').format('HH:mm:ss DD/MM/YYYY')}\n\n`
            }
          } catch {
            nowhatsapp += `${number0}${i}${number1}\n`
          }
        }
        reply(`${nomerny}${nobio}${nowhatsapp}`)
      }
        break;


      case 'grouplink': case 'gclink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        AMD.sendMessage(from, { react: { text: "🪄", key: m.key } })
        let response = await AMD.groupInviteCode(m.chat)
        AMD.sendMessage(m.chat, {
          text: `*Group Name:* *${groupMetadata.subject}* \n\n*Group Link :* \nhttps://chat.whatsapp.com/${response}l`, "contextInfo": {
            mimetype: "image/jpeg",
            text: `${global.OwnerName}`,
            "forwardingScore": 1000000000,
            isForwarded: true,
            sendEphemeral: true,
            "externalAdreply": {
              "title": `${global.BotName}`,
              "body": `${global.WaterMark}`,
              "previewType": "PHOTO",
              "thumbnailUrl": Thumb,
              "thumbnail": Thumb,
              "sourceUrl": `${global.websitex}`
            }
          }
        }, { quoted: m, detectLink: true })
      }
        break;


      case 'resetlinkgc':
      case 'resetlinkgroup':
      case 'resetlinkgrup':
      case 'revoke':
      case 'resetlink':
      case 'resetgrouplink':
      case 'resetgclink':
      case 'resetgruplink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        AMD.groupRevokeInvite(m.chat)
      }
        break;


      case 'group': case 'grup': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (args[0] === 'close') {
          await AMD.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`Group has been closed!`)).catch((err) => reply(jsonformat(err)))
        } else if (args[0] === 'open') {
          await AMD.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`Group has been opened!`)).catch((err) => reply(jsonformat(err)))
        } else {

          let buttonMessage = {
            image: BotLogo,
            jpegThumbnail: Thumb,
            caption: `*「 ${global.BotName} 」*\n\n_Group Setting Changer tool_:\n\nIf you want to Group close *-group close*\n\nIf you want to Group Oepn *-group open*`,
            footer: `${BotName}`,
            headerType: 4
          }
          AMD.sendMessage(m.chat, buttonMessage, { quoted: m })
        }
      }
        break;


      case 'promote': case 'admin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await AMD.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'demote': case 'unadmin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await AMD.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'add': {
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })


        let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        if (users.length == 0) return reply(`Please write the number of the person you want to add to thhis group`)
        await AMD.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(`User Added Successfully!`)).catch((err) => reply(`Cannot add that user to this group!`))
      }
        break;


      case 'invite': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!text) return reply(`Enter the number you want to invite to the group...\n\nExample :\n*${prefix + command}* 916297175943`)
        if (text.includes('+')) return reply(`Enter the number together without *+*`)
        if (isNaN(text)) return reply(`Enter only the numbers plus your country code without spaces`)
        let group = m.chat
        let link = 'https://chat.whatsapp.com/' + await AMD.groupInviteCode(group)
        await AMD.sendMessage(text + '@s.whatsapp.net', { text: ` *GROUP INVITATION*\n\nA user invites you to join this group \n\n${link}`, mentions: [m.sender] })
        reply(` An invite link is sent to the user`)
      }
        break;


      case 'remove': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await AMD.groupParticipantsUpdate(m.chat, [users], 'remove')
      }
        break;


      // join command  is a possible to Ban bot number.
      case 'join': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Where's the link?`)
        vdd = args[0]
        let vcc = vdd.split("https://chat.whatsapp.com/")[1]
        if (!vcc) return reply("Link invalid!")
        if (isCreator) {
          await AMD.groupAcceptInvite(vcc).then(async (res) => reply(jsonformat(res))).catch(_ => _)
          reply("Succes!")
        } else {
          AMD.query({
            tag: "iq",
            attrs: {
              type: "get",
              xmlns: "w:g2",
              to: "@g.us"
            },
            content: [{ tag: "invite", attrs: { code: vcc } }]
          }).then(async (res) => {
            sizny = res.content[0].attrs.size
            if (sizny < 20) {
              teks = `Sorry, munimun 20 members are required in a group to add bot!`
              sendOrder(m.chat, teks, "667140254502463", fs.readFileSync('./Assets/pic7.jpg'), `${global.packname}`, `${global.BotName}`, "916297175943@s.whatsapp.net", "AR6NCY8euY5cbS8Ybg5Ca55R8HFSuLO3qZqrIYCT7hQp0g==", "99999999999999999999")
            } else if (sizny > 20) {
              await AMD.groupAcceptInvite(vcc).then(async (res) => reply(jsonformat(res))).catch(_ => _)
              reply("Joined !")
            } else {
              reply("Error")
            }
          }).catch(_ => _)
        }
      }
        break;


      case 'groupevent':
      case 'group-event':

        AMD.sendMessage(from, { react: { text: '❤', key: m.key } });
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)

        if (args.length === 0) {
          if (global.groupevent) {
            return m.reply(`Group events are currently *enabled*.\n\nYou can turn them *off* using "${global.prefa[0]}groupevent off".`);
          } else {
            return m.reply(`Group events are currently *disabled*.\n\nYou can turn them *on* using "${global.prefa[0]}groupevent on".`);
          }
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            if (global.groupevent) {
              return m.reply(`Group events are already *enabled*.`);
            } else {
              global.groupevent = true;
              return m.reply(`Group events are now *enabled*.`);
            }
          } else {
            if (!global.groupevent) {
              return m.reply(`Group events are already *disabled*.`);
            } else {
              global.groupevent = false;
              return m.reply(`Group events are now *disabled*.`);
            }
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}groupevent [on/off]`);
        }
        break;


      //
      case 'ban': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args[0]) return reply(`Select add or del (add to ban, del to unban), For Example: reply *${prefix}ban add* to the user you want to ban.`)
        if (args[1]) {
          orgnye = args[1] + "@s.whatsapp.net"
        } else if (m.quoted) {
          orgnye = m.quoted.sender
        }
        const isBane = banUser.includes(orgnye)
        if (args[0] === "add") {
          if (isBane) return ads('User was already banned.')
          banUser.push(orgnye)
          reply(`Successfully banned the user`)
        } else if (args[0] === "del") {
          if (!isBane) return ads('User was already unbanned.')
          let delbans = banUser.indexOf(orgnye)
          banUser.splice(delbans, 1)
          reply(`Successfully unbanned the user.`)
        } else {
          reply("Error")
        }
      }
        break;


      case 'antilink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkAll) return reply('Already activated')
          ntilinkall.push(from)
          reply('Enabled all antilink !')
          var groupe = await AMD.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          AMD.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkAll) return reply('Already deactivated')
          let off = ntilinkall.indexOf(from)
          ntilinkall.splice(off, 1)
          reply('Disabled all antilink !')
        } else {
          let textmsg = 'Type ' + `${prefix}${command}` + ' on to turn on antilink feature or Type ' + `${prefix + command}` + ' off to turn off antilink feature'
          await AMD.sendMessage(m.chat, { text: `${textmsg}` }, `${global.BotName}`, m)
        }
      }
        break;



      case 'ringtone': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix}ringtone black over`)
        let { ringtone } = require('./lib/scraper.js')
        let anu = await ringtone(text)
        let result = anu[Math.floor(Math.random() * anu.length)]
        AMD.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
      }
        break;


      case 'volume': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix + command} 10`)
        media = await AMD.downloadAndSaveMediaMessage(quoted, "volume")
        if (isQuotedAudio) {
          rname = getRandom('.mp3')
          exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            jadie = fs.readFileSync(rname)
            AMD.sendMessage(from, { audio: jadie, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            fs.unlinkSync(rname)
          })
        } else if (isQuotedVideo) {
          rname = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            jadie = fs.readFileSync(rname)
            AMD.sendMessage(from, { video: jadie, mimetype: 'video/mp4' }, { quoted: m })
            fs.unlinkSync(rname)
          })
        } else {
          reply("Please send video/audio file only!")
        }
      }
        break;


      case 'tempo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix + command} 10`)
        var req = args.join(' ')
        media = await AMD.downloadAndSaveMediaMessage(quoted, "tempo")
        if (isQuotedAudio) {
          ran = getRandom('.mp3')
          exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            hah = fs.readFileSync(ran)
            AMD.sendMessage(from, { audio: hah, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            fs.unlinkSync(ran)
          })
        } else if (isQuotedVideo) {
          ran = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            hah = fs.readFileSync(ran)
            AMD.sendMessage(from, { video: hah, mimetype: 'video/mp4' }, { quoted: m })
            fs.unlinkSync(ran)
          })
        } else {
          reply("Please send video/audio file only!")
        }
      }
        break;


      case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        try {
          let set
          if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
          if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
          if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
          if (/earrape/.test(command)) set = '-af volume=12'
          if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
          if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
          if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
          if (/reverse/.test(command)) set = '-filter_complex "areverse"'
          if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
          if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
          if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
          if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
          if (/audio/.test(mime)) {
            reply(mess.waiting)
            let media = await AMD.downloadAndSaveMediaMessage(quoted)
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media)
              if (err) return reply(err)
              let buff = fs.readFileSync(ran)
              AMD.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m })
              fs.unlinkSync(ran)
            })
          } else reply(`Pls mention any audio you want to modify _${prefix + command}_`)
        } catch (e) {
          reply(e)
        }
        break;


      case 'calculator': case 'cal': case 'calculate': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args.length < 1) return reply(`*Example :*\n${prefix}calculator 2*5\n\n`)
        let qsd = args.join(" ")
        if (typeof mathjs.evaluate(qsd) !== 'number') {
          reply('Error')
        } else {
          reply(`\`\`\`「 _Calculator Tool_ 」\`\`\`\n\n*Input :* ${qsd}\n*Calculation Result :* ${mathjs.evaluate(qsd.replace(/×/g, "*").replace(/x/g, "*").replace(/÷/g, "/"))}`)
        }
      }
        break;


      case 'toimage': case 'makeimg': case 'toimg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🪄", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.waiting)
        let media = await AMD.downloadAndSaveMediaMessage(quoted)
        let ran = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media)
          if (err) throw err
          let buffer = fs.readFileSync(ran)
          AMD.sendMessage(m.chat, { image: buffer }, { quoted: m })
          fs.unlinkSync(ran)
        })
      }
        break;


      case 'tomp4': case 'makemp4': case 'makevideo': case 'tovideo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🪄", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.waiting)
        let { webp2mp4File } = require('./lib/uploader.js')
        let media = await AMD.downloadAndSaveMediaMessage(quoted)
        let webpToMp4 = await webp2mp4File(media)
        await AMD.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Here it is...' } }, { quoted: m })
        await fs.unlinkSync(media)
      }
        break;


      case 'toaud': case 'makeaudio': case 'toaudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/reply Video/Audio You Want To Use As Audio With Caption ${prefix + command}`)
        if (!m.quoted) return reply(`Send/reply Video/Audio You Want To Use As Audio With Caption ${prefix + command}`)
        reply(mess.waiting)
        let media = await quoted.download()
        let { toAudio } = require('./lib/converter.js')
        let audio = await toAudio(media, 'mp4')
        AMD.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: m })
      }
        break;


      case 'tomp3': case 'makemp3': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (/document/.test(mime)) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        if (!m.quoted) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        reply(mess.waiting)
        let media = await quoted.download()
        let { toAudio } = require('./lib/converter.js')
        let audio = await toAudio(media, 'mp4')
        AMD.sendMessage(m.chat, { document: audio, mimetype: 'audio/mpeg', fileName: `Converted By ${global.BotName} (${m.id}).mp3` }, { quoted: m })
      }
        break;


      case 'togif': case 'makegif': case 'getgif': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.wait)
        let { webp2mp4File } = require('./lib/uploader.js')
        let media = await AMD.downloadAndSaveMediaMessage(quoted)
        let webpToMp4 = await webp2mp4File(media)
        await AMD.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Converted From Webp To Gif' }, gifPlayback: true }, { quoted: m })
        await fs.unlinkSync(media)
      }
        break;


      case "tourl": case 'tolink':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        let { GraphOrg } = require("./lib/uploader.js");
        if (!m.quoted) {
          //
          AMD.sendMessage(from, { react: { text: "❔", key: m.key } })
          return m.reply(
            `With caption not working, first send an *Image* / *Video* to generate a link! then tag with *${prefix}tourl*`
          );
        }
        let media5 = await AMD.downloadAndSaveMediaMessage(quoted);
        if (/image/.test(mime)) {
          //
          let anu = await GraphOrg(media5);
          m.reply(`*Generated Image URL:* \n\n${util.format(anu)}\n`);
        } else if (/video/.test(mime)) {
          //
          try {
            let anu = await GraphOrg(media5);
            m.reply(`*Generated Video URL:* \n\n${util.format(anu)}\n`);
          } catch (e) {
            //
            await fs.unlinkSync(media5);
            return AMD.sendMessage(
              m.from,
              {
                text: `*Your video size is too big!*\n\n*Max video size:* 5MB`,
              },
              { quoted: m }
            );
          }
        } else {
          //
          return m.reply(
            `Plese provide an *Image* / *Video* to generate a link!`
          );
        }
        await fs.unlinkSync(media5);
        break;



      case 'translate': case 'ts': case 'trans': {
        if (isBan) return reply(mess.banned);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!args.join(" ")) return reply("Pls enter any text to translate")
        tes = await fetchJson(`https://megayaa.herokuapp.com/api/translate?to=en&kata=${args.join(" ")}`)
        Infoo = tes.info
        Detek = tes.translate
        reply(`Input : ${Detek}\nTranslation Results : ${Infoo}`)
      }
        break;


 
      case 'gimage':
      case 'gig':
      case 'googleimage': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } });

        if (!args[0]) return reply("Enter a search term to get Google Image!");
        let gis = require('g-i-s');
        gis(args.join(" "), async (error, result) => {
          if (error) {
            console.error(error);
            return reply("Error occurred while searching for images.");
          }

          if (!result || result.length === 0) {
            return reply("No images found for the given search term.");
          }

          n = result;
          images = n[Math.floor(Math.random() * n.length)].url;
          let buttonMessage = {
            image: { url: images },
            caption: `「 _Google Image Search_ 」\n\n_Search Term_ : ${text}\n_Media Url_ : ${images}`,
            footer: `${global.BotName}`,
            headerType: 4,
          };
          AMD.sendMessage(m.chat, buttonMessage, { quoted: m });
        });
      }
        break;


      case 'apod': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        //AMD.sendMessage(from, { react: { text: "🌌", key: m.key }});
        const randomEmoji = spaceemojis[Math.floor(Math.random() * spaceemojis.length)]; // Select a random emoji
        AMD.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        const apiKey = 'ugce43VIO63s8gQhcQ7Ts2DHQo1Srcchdh9mgI2S'; // Replace with your actual NASA API key // You can use it.
        const moment = require('moment'); // Import moment library here
        const timeZone = 'Africa/Nairobi'; // Set desired timezone.

        const currentDate = moment().tz(timeZone).format('YYYY-MM-DD'); // Initialize currentDate here

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.url) {
            AMD.sendMessage(from, {
              image: { url: data.url },
              caption: `*Astronomy Picture of the Day:*\n\n${data.title}\n${data.explanation}`,
            });
          } else {
            console.log("No APOD image data available.");

            return reply('No APOD image data available.');
          }
        } catch (error) {
          console.error('Error fetching APOD data:', error);

          return reply('An error occurred while fetching APOD data.');
        }
      }
        break;


      case 'google': case 'search': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "✨", key: m.key } })

        if (!args[0]) return reply(`Example: ${prefix + command} <query>\nUses : ${prefix + command} anything...`)
        let google = require('google-it')
        google({ 'query': args.join(" ") }).then(res => {
          let teks = `「 *Google Search Engine* 」\n\n*Search term:* ${text}\n\n\n`
          for (let g of res) {
            teks += `*Title* : ${g.title}\n\n`
            teks += `*Description* : ${g.snippet}\n\n`
            teks += `*Link* : ${g.link}\n\n\n        -----------------------------------------------------------------------------\n\n`
          }
          reply(teks)
        })
      }
        break;


      case "tts": case "texttospeech": case "say": case "speak": {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!args[0]) return reply("Please give me a text so that i can speak it!")

        let texttosay = text
          ? text
          : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
        const SpeakEngine = require("google-tts-api");
        const texttospeechurl = SpeakEngine.getAudioUrl(texttosay, { lang: "en", slow: false, host: "https://translate.google.com", });
        AMD.sendMessage(m.chat, { audio: { url: texttospeechurl, }, mimetype: "audio/mpeg", fileName: `AMDSpeechEngine.mp3`, }, { quoted: m, });
      }
        break;


      case 'wiki':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (args.length < 1) return reply('What Are You Looking For?? ')
        const res2 = await wikiSearch(q).catch(e => {
          return reply('Error Result Not Found!')
        })
        const result2 = `*Title :* ${res2[0].judul}\n*Wiki :* ${res2[0].wiki}`
        AMD.sendMessage(from, { image: { url: res2[0].thumb }, caption: result2 })
        break;

      case 'earthquake':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const tres = await Gempa()
        var { Waktu, Lintang, Bujur, Magnitude, Kedalaman, Wilayah, Map } = tres.result
        console.log(Map)
        const captt = `Time : ${Waktu}\nLatitude : ${Lintang}\nLongitude : ${Bujur}\nRegion : ${Wilayah}`
        AMD.sendMessage(from, { image: { url: Map }, caption: captt })
        break;


      case 'covidinfo':
      case 'covid':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const c = await covid()
        var { cases, death, healed } = c[0]
        AMD.sendMessage(from, { text: `\nCovid India \n\nCase : ${cases}\n\nDead : ${death}\n\nHealed : ${healed}\n` }, m)
        break;


      case 'igdl':
      case 'instagram':
      case 'instagramreels':
      case 'igreels':

        {
          if (isBan) {
            return reply(mess.banned);
          }

          if (isBanChat) {
            return reply(mess.bangc);
          }

          // Send a reaction emoji
          AMD.sendMessage(from, { react: { text: "🪄", key: m.key } });

          // Check if a link is provided
          if (!text) {
            return reply(`Where is the link?\n\nExample: ${prefix + command} https://www.instagram.com/reel/Ctjt0srIQFg/?igshid=MzRlODBiNWFlZA==`);
          }

          try {
            // Download the Instagram video
            let instadownload = await instadl(text);

            // Send the downloaded video as a reply to the command
            await AMD.sendMessage(m.chat, { video: { url: instadownload.url[0].url }, caption: mess.jobdone }, { quoted: m });
          } catch (error) {
            console.error('Error while processing Instagram video:', error);
            return reply('An error occurred while processing the Instagram video.');
          }
        }
        break;



      case 'ig': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args[0] === "mp4") {
          AMD.sendMessage(from, { video: { url: args[1] }, caption: 'Here it is...', mimetype: 'video/mp4' }, { quoted: m })
        } else if (args[0] === "jpg") {
          AMD.sendMessage(from, { image: { url: args[1] }, caption: 'Here it is...' }, { quoted: m })
        } else {
          reply("Error! ")
        }
      }
        break;


      case 'mp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Pls provide link!`)
        try {
          AMD.sendMessage(from, {
            video: { url: args[0] }, caption: "Succes!", contextInfo: {
              externalAdreply: {
                title: `${global.BotName}`,
                body: `${global.OwnerName}`,
                thumbnail: BotLogo,
                mediaType: 2,
                mediaUrl: `${global.websitex}`,
                sourceUrl: `${global.websitex}`
              }
            }
          }, { quoted: m })
        } catch {
          reply("Link error!")
        }
      }
        break;


      case 'jpeg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Please provide link!`)
        try {
          AMD.sendMessage(from, { image: { url: args[0] }, caption: "Success!" }, { quoted: m })
        } catch {
          reply("Link error")
        }
      }
        break;


      case 'igtv': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide link!`)
        const { instagramdl, instagramdlv2, instagramdlv3 } = require('@bochilteam/scraper')
        if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply('*Invalid link!*')
        instagramdlv3(`${text}`).then(async (data) => {
          var buf = await getBuffer(data[0].thumbnail)
          AMD.sendMessage(m.chat, { video: { url: data[0].url }, jpegThumbnail: buf, caption: `${BotName}` }, { quoted: m })
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      ///  
      case 'twitter': case 'td': case 'twitterdl': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide link!`)
        if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(`*Invalid link!*`)
        xfarrapi.Twitter(`${text}`).then(async (data) => {
          let txt = `「 _Twitter Downloader_ 」\n\n`
          txt += `*Title :* ${data.title}\n`
          txt += `*Quality :* ${data.medias[1].quality}\n`
          txt += `*Type :* ${data.medias[1].extension}\n`
          txt += `*Size :* ${data.medias[1].formattedSize}\n`
          txt += `*Duration :* ${data.medias.length}\n`
          txt += `*URL :* ${data.url}\n\n`
          txt += `*${BotName}*`
          buf = await getBuffer(data.thumbnail)
          AMD.sendMessage(m.chat, { image: { url: data.thumbnail }, jpegThumbnail: buf, caption: `${txt}` }, { quoted: m })
          for (let i of data.medias) {
            AMD.sendMessage(m.chat, { video: { url: i.url }, jpegThumbnail: buf, caption: `*${text}*` }, { quoted: m })
          }
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'twittermp3': case 'twitteraudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide link!`)
        if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(`*Invalid link!*`)
        xfarrapi.Twitter(`${text}`).then(async (data) => {
          AMD.sendMessage(m.chat, { audio: { url: data.medias[1].url }, mimetype: 'audio/mp4' }, { quoted: m })
        }).catch((err) => {
          reply(mess.reply)
        })
      }
        break;


      case 'twitterxx': case 'twdlxx': case 'twmp4xx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Example :\n${prefix + command} https://twitter.com/cinema21/status/1517754155644821504?t=rUnbyqwh4vAE1QXMXlsVeQ&s=19`)
        try {
          let lotwit = await aiovideodl(args[0])
          teks = `「 _Twitter Downloader_ 」
Caption : ${lotwit.title ? lotwit.title : "undefined"}
Type : ${lotwit.medias[1].extension}
Size : ${lotwit.medias[1].formattedSize}
Link : ${lotwit.medias[1].url}
_Please choose the video quality_`
          let buttons = [
            { buttonId: `${prefix}twitter ${lotwit.medias[0].url}`, buttonText: { displayText: `Quality ${lotwit.medias[0].quality}` }, type: 1 },
            { buttonId: `${prefix}twitter ${lotwit.medias[2].url}`, buttonText: { displayText: `Quality ${lotwit.medias[2].quality}` }, type: 1 }
          ]
          let buttonMessage = {
            video: { url: lotwit.medias[1].url },
            caption: teks,
            footer: `${pushname}`,
            buttons: buttons,
            headerType: 4,

          }
          AMD.sendMessage(from, buttonMessage, { quoted: m })
        } catch {
          reply("Link Error!")
        }
      }
        break;


      case 'twddlxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let buttons = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: '✨Menu✨' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: args[0] },
          caption: "Here it is...",
          footer: `${pushname}`,
          buttons: buttons,
          headerType: 4,

        }
        AMD.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      ///
      case 'fbdl': case 'fb': case 'facebook': case 'fbmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide the link!\n\nExample: ${prefix}facebook https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
        if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(`Invalid link!`)
        let bocil = require('@bochilteam/scraper')
        bocil.facebookdlv2(`${text}`).then(async (data) => {
          let txt = `「 _Facebook Downloader_ 」\n\n`
          txt += `*Title :* ${data.title}\n`
          txt += `*Quality :* ${data.result[0].quality}\n`
          txt += `*Description:* ${data.description}\n`
          txt += `*URL :* ${text}\n\n`
          buf = await getBuffer(data.thumbnail)
          AMD.sendMessage(m.chat, { image: { url: data.thumbnail }, jpegThumbnail: buf, caption: `${txt}` }, { quoted: m })
          for (let i of data.result) {
            AMD.sendMessage(m.chat, { video: { url: i.url }, jpegThumbnail: buf, caption: `*Quality :* ${i.quality}` }, { quoted: m })
          }
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'fbmp3': case 'facebookmp3': case 'facebookaudio': case 'fbaudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide the link!\n\nExample: ${prefix + command} https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
        if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(`Invalid link!`)
        let noh = require('@bochilteam/scraper')
        noh.savefrom(`${text}`).then(async (anu) => {
          AMD.sendMessage(m.chat, { audio: { url: anu.url[0].url }, mimetype: 'audio/mp4' }, { quoted: m })
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'facebookxx': case 'fbdlxxx': case 'fbmp4xxx': case 'fbxxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Example :\n${prefix + command} https://fb.watch/cAX2dep-BZ/`)
        try {
          let resd = await aiovideodl(args[0])
          teks = `「 _Facebook Downloader_ 」
Type : video/${resd.medias[0].extension}
Quality : ${resd.medias[0].quality}
Size : ${resd.medias[0].formattedSize}
_Click the button below to download_`
          let buttons = [
            { buttonId: `${prefix}fbdl ${resd.medias[1].url}`, buttonText: { displayText: 'QualityHD' }, type: 1 }
          ]
          let buttonMessage = {
            video: { url: resd.medias[0].url },
            caption: teks,
            footer: `${pushname}`,
            buttons: buttons,
            headerType: 4,

          }
          AMD.sendMessage(from, buttonMessage, { quoted: m })
        } catch {
          reply("Link invalid!")
        }
      }
        break;


      case 'fbddlxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let buttons = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: '✨Menu✨' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: args[0] },
          caption: "Done!",
          footer: `${pushname}`,
          buttons: buttons,
          headerType: 4,

        }
        AMD.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      ///
      case 'tiktok': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!q) return reply('Please provide the link !')
        reply(mess.wait)
        if (!q.includes('tiktok')) return reply(`Invalid tiktok link!`)
        const musim_rambutan = await AMDTiktok(`${q}`).catch(e => {
          reply(mess.error)
        })
        console.log(musim_rambutan)
        const AMDtiktokop = musim_rambutan.result.watermark
        texttk = `_Please choose the button below_`
        let buttons = [
          { buttonId: `${prefix}ttnowm ${q}`, buttonText: { displayText: 'Watermark Free' }, type: 1 },
          { buttonId: `${prefix}ttaud ${q}`, buttonText: { displayText: 'Audio ' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: AMDtiktokop },
          caption: texttk,
          footer: `${BotName}`,
          buttons: buttons,
          headerType: 4,

        }
        AMD.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      case 'tiktoknowm': case 'ttnowm': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!q) return reply('Please provide the link !')
        reply(mess.wait)
        if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
        const musim_rambutan = await AMDTiktok(`${q}`).catch(e => {
          reply(mess.error)
        })
        console.log(musim_rambutan)
        const AMDtiktoknowm = musim_rambutan.result.nowatermark
        AMD.sendMessage(from, { video: { url: AMDtiktoknowm }, caption: "Here it is..." }, { quoted: m })
      }
        break;


      case 'tiktokaudio':
      case 'tiktokmusic':
      case 'ttaud': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!q) return reply('Where is the audio?')
        if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
        const musim_rambutan = await AMDTiktok(`${q}`).catch(e => {
          reply(mess.error)
        })
        console.log(musim_rambutan)
        const AMDtiktokaudio = musim_rambutan.result.nowatermark
        AMD.sendMessage(from, { audio: { url: AMDtiktokaudio }, mimetype: 'audio/mp4' }, { quoted: m })
      }
        break;


      ///
      case 'yts': case 'ytsearch': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "📍", key: m.key } })

        if (!args.join(" ")) return reply(`Example : -yts Heat waves`)
        let yts = require("youtube-yts")
        let search = await yts(args.join(" "))
        let teks = '```「 YouTube search Engine 」```\n\n Search Term: ' + text + '\n\n'
        let no = 1
        for (let i of search.all) {
          teks += `Result No : ${no++}\n\nTitle : ${i.title}\n\nViews : ${i.views}\n\nDuration : ${i.timestamp}\n\nUploaded : ${i.ago}\n\nAuthor : ${i.author.name}\n\nUrl : ${i.url}\n\n\n-----------------------------------------------------------------------------\n\n\n`
        }
        AMD.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: m })
      }
        break;


      case 'play':
      case 'song':
      case 'music': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🍁", key: m.key } });

        const YT = require('./lib/ytdl-core.js');
        const yts = require('youtube-yts');
        const ffmpeg = require('fluent-ffmpeg');

        let search = await yts(text);
        let anu = search.videos[0];
        const ytmp3play = await YT.mp3(anu.url);

        // Fetch the thumbnail URL from the 'anu' object
        let thumbnailUrl = anu.thumbnail;

        await AMD.sendMessage(
          from,
          {
            image: { url: thumbnailUrl }, // Include the thumbnail image in the response
            caption: `\n*Downloading:* *${anu.title}*
            
  ⏳ *Duration :* ${anu.timestamp}

  📈 *Viewers :* ${anu.views}

  🎐 *Channel :* ${anu.author.name}

  🏮 *Video Uploaded:* ${anu.ago}

  🔗 *Url :* ${anu.url}\n`,

          },
          { quoted: m }
        );

        // Send the audio file with the proper 'type' property set to 'audio'
        await AMD.sendMessage(from, {
          audio: fs.readFileSync(ytmp3play.path),
          filename: anu.title + '.mp3',
          mimetype: 'audio/mpeg',
          quoted: m,
        });

        // Rest of the code remains unchanged.
        // ...
      }
        break;

      case 'spotify': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🍁", key: m.key } });

        if (!q) return reply(`Please provide a query. Example: ${prefix + command} 295`);

        const YT = require('./lib/ytdl-core.js');
        const yts = require('youtube-yts');
        const ffmpeg = require('fluent-ffmpeg');

        let search = await yts(text);
        let anu = search.videos[0];
        const ytmp3play = await YT.mp3(anu.url);

        await AMD.sendMessage(from, {
          audio: fs.readFileSync(ytmp3play.path),
          ptt: true,
          filename: 'error.mp3',
          mimetype: 'audio/mpeg',
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: "↺ |◁   II   ▷|   ♡",
              body: `Now playing: ${anu.title}`,
              thumbnailUrl: anu.thumbnail,
              sourceUrl: "open.spotify.com",
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m }
        );
      }
        break;


      case 'ytvd': case 'video': case 'ytvideo': case 'ytmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🍃", key: m.key } })
        const YT = require('./lib/ytdl-core.js')
        let yts = require("youtube-yts")
        let search = await yts(text)
        let anu = search.videos[0]
        const ytmp4play = await YT.mp4(anu.url)
        AMD.sendMessage(from, { video: { url: ytmp4play.videoUrl }, mimetype: "video/mp4", caption: anu.title + ' By *AMD MD*', }, { quoted: m })
      }

        break;

      


      case 'ytmp3': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const YT = require('./lib/ytdl-core.js')
        const ytmp3play2 = await YT.mp3(text)

        await AMD.sendMessage(from, { document: fs.readFileSync(ytmp3play2.path), fileName: 'AMD_YTmp3_Downloader.mp3', mimetype: 'audio/mpeg', }, { quoted: m })
      }
        break;


      case 'ytvd2': case 'ytmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🍁", key: m.key } })
        const YT = require('./lib/ytdl-core.js')
        const ytmp4play2 = await YT.mp4(text)
        AMD.sendMessage(from, { video: { url: ytmp4play2.videoUrl }, mimetype: "video/mp4", caption: 'Downloaded by *AMD MD*', }, { quoted: m })
      }
        break;


      case 'lyrics': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🍁", key: m.key } })
        if (!text) return reply(`Comand usage: ${prefix}lyrics Thunder`)
        reply(mess.waiting)
        const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
        const result = await lyricsv2(text).catch(async _ => await lyrics(text))
        reply(`
*Title :* ${result.title}
*Author :* ${result.author}
*Url :* ${result.link}

*Lyrics :* ${result.lyrics}

`.trim())
      }
        break;


      case 'pinterest':
      case 'pin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🐦", key: m.key } });

        if (!args.join(" ")) return reply(`${pushname} Please provide a search term!`);
        reply(mess.waiting)
        let { pinterest } = require('./lib/scraper.js');
        let anutrest = await pinterest(text);
        let results = [];

        // Get multiple random images (let's say 5 images)
        const numImages = 5;
        for (let i = 0; i < numImages && i < anutrest.length; i++) {
          results.push(anutrest[Math.floor(Math.random() * anutrest.length)]);
        }

        // Send each image without any caption
        for (let i = 0; i < results.length; i++) {
          AMD.sendMessage(m.chat, { image: { url: results[i] } }, { quoted: m });
        }
      }
        break;


      case 'sgif': case 'sticker': case 's': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "🌝", key: m.key } })
        if (/image/.test(mime)) {
          let media = await quoted.download()
          let encmedia = await AMD.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 11) return reply('Maximum 10 seconds!')
          let media = await quoted.download()
          let encmedia = await AMD.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia)
        } else {
          reply(`Send Image/Video With Caption ${prefix + command}\nVideo Duration 1-9 Seconds`)
        }
      }
        break;


      case 'mediafire': case 'mediafiredl': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(mess.linkm)
        if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return reply(`The link you provided is invalid`)
        const baby1 = await mediafireDl(text)
        if (baby1[0].size.split('MB')[0] >= 999) return reply('*File Over Limit* ' + util.format(baby1))
        const result4 = `「  *Mediafire Downloader*  」
      
*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`
        reply(`${result4}`)
        AMD.sendMessage(m.chat, { document: { url: baby1[0].link }, fileName: baby1[0].nama, mimetype: baby1[0].mime }, { quoted: m }).catch((err) => reply(mess.error))
      }
        break;


      case 'help': case 'h': case 'menu': case 'allmenu': case 'listmenu': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "✨", key: m.key } })
        const helpmenu = `Hi👋 *${pushname}*  ${nowtime} 
  
I am *AMD388* a WhatsApp bot created  by aspect-M.

  ⌯    *Time* : ${kaitime}
  ⌯    *Date* : ${kaidate}

   〢━━━ 〄 Bot Info 〄 ━━━〢

  ⌯    *Bot user name :* ${pushname} 
  ⌯    *My prefix is :*  ${prefix}
  ⌯    *Owner name :* ${global.OwnerName} 
  ⌯    *Bot runtime :* ${runtime(process.uptime())} 
  ⌯    *Platform :* ${os.platform()} ${os.release}
  ⌯    *Latency :* ${(latensie*1000).toFixed(1)} ms

  〢━━━ 🔍 *Search* 🔎 ━━━〢
  
  ⌯     ${prefix}play
  ⌯     ${prefix}song
  ⌯     ${prefix}video
  ⌯     ${prefix}ytmp3
  ⌯     ${prefix}ytmp4 
  ⌯     ${prefix}yts
  ⌯     ${prefix}lyrics
  ⌯     ${prefix}google
  ⌯     ${prefix}gimage
  ⌯     ${prefix}pinterest
  ⌯     ${prefix}wallpaper
  ⌯     ${prefix}image
  ⌯     ${prefix}searchgc
  ⌯     ${prefix}wikimedia

  〢━━ 🌌 *Downloader* 🌌 ━━〢
 

  ⌯     ${prefix}ytvideo
  ⌯     ${prefix}mediafire
  ⌯     ${prefix}instagram
  ⌯     ${prefix}igtv
  ⌯     ${prefix}facebook
  ⌯     ${prefix}fbmp3
  ⌯     ${prefix}twitter
  ⌯     ${prefix}twittermp3
  ⌯     ${prefix}tiktok
  ⌯     ${prefix}tiktokaudio
  ⌯     ${prefix}happymod
  ⌯     ${prefix}tiktoknowm

  〢━━━ 🛠️ *Convert* 🛠️ ━━━〢
 

  ⌯     ${prefix}sticker
  ⌯     ${prefix}toimg
  ⌯     ${prefix}tovideo
  ⌯     ${prefix}togif
  ⌯     ${prefix}tourl
  ⌯     ${prefix}tomp3
  ⌯     ${prefix}toaudio
  ⌯     ${prefix}steal
  ⌯     ${prefix}stickermeme
  ⌯     ${prefix}emojimix

  〢━━━❗ *Anti Link ❗* ━━━〢

  
  ⌯     ${prefix}antilinkgc
  ⌯     ${prefix}antilinktt
  ⌯     ${prefix}antilinkytch
  ⌯     ${prefix}antilinkytch
  ⌯     ${prefix}antilinkig
  ⌯     ${prefix}antilinkfb
  ⌯     ${prefix}antilinktwit
  ⌯     ${prefix}antiwame
  ⌯     ${prefix}antilinkall
  
  〢━━━ ◈ Sound Edit ◈ ━━━〢

  ⌯     ${prefix}ringtone
  ⌯     ${prefix}bass
  ⌯     ${prefix}tempo
  ⌯     ${prefix}blown
  ⌯     ${prefix}robot
  ⌯     ${prefix}slow
  ⌯     ${prefix}squirrel
  ⌯     ${prefix}deep
  ⌯     ${prefix}earrape
  ⌯     ${prefix}fast
  ⌯     ${prefix}fat
  ⌯     ${prefix}nightcore
  ⌯     ${prefix}reverse

  〢━━━ ♨️ *Informative* ♨️ ━━━〢
  

  ⌯     ${prefix}quote
  ⌯     ${prefix}weather
  ⌯     ${prefix}covid
  ⌯     ${prefix}earthquake
  ⌯     ${prefix}wiki
  ⌯     ${prefix}stalknumber

  〢━━━ 🪁 *Essentials* 🪁 ━━━〢
 
  
  ⌯     ${prefix}qr
  ⌯     ${prefix}say
  ⌯     ${prefix}fliptext
  ⌯     ${prefix}translate
  ⌯     
  ⌯    
  ⌯   『  *${global.BotName}*  』
  ⌯       Developed By: *m-aspect*
  ⌯    
  ⌯   🍁 To use any of these
  ⌯       commands type.
  ⌯    
  ⌯   *${prefix}<Command name>*.
  ⌯    
  ⌯    
  ⌯   🍁 Type *${prefix}help* to get
  ⌯       full command list.
  ┬│▸
  ╰─────────────────···▸`
        let buttonMessage = {
          video: fs.readFileSync('./system/AMD_1.mp4'), gifPlayback: true,
          caption: helpmenu,

          headerType: 4

        }
        AMD.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      case '':
        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          AMD.sendMessage(from, { react: { text: "✨", key: m.key } })

          reply(`Do you need any help ${pushname} ? Type *${prefix}help* to get my full command list.`)
        }

        break;


      case 'qr': case 'scanner': case 'qrcode':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        AMD.sendMessage(from, { react: { text: "🍁", key: m.key } })

        reply(`Running repl....Please wait until repl.it responds...`)
        var replqr = await getBuffer(`https://AMD-qr-scanner.broken0007.repl.co/`)
        let bmffg = {
          image: replqr,
          caption: `Scan the qr within 10-15 seconds...`,
        };
        await AMD.sendMessage(m.chat, bmffg, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      //////search
      case 'weather':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        AMD.sendMessage(from, { react: { text: "✨", key: m.key } })
        if (!args[0]) return reply("Enter your location to search weather.")
        myweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(" ")}&units=metric&appid=e409825a497a0c894d2dd975542234b0&language=tr`)

        const weathertext = `           🌤 *Weather Report* 🌤  \n\n🔎 *Search Location:* ${myweather.data.name}\n*💮 Country:* ${myweather.data.sys.country}\n🌈 *Weather:* ${myweather.data.weather[0].description}\n🌡️ *Temperature:* ${myweather.data.main.temp}°C\n❄️ *Minimum Temperature:* ${myweather.data.main.temp_min}°C\n📛 *Maximum Temperature:* ${myweather.data.main.temp_max}°C\n💦 *Humidity:* ${myweather.data.main.humidity}%\n🎐 *Wind:* ${myweather.data.wind.speed} km/h\n`
        AMD.sendMessage(from, { video: { url: 'https://media.tenor.com/bC57J4v11UcAAAPo/weather-sunny.mp4' }, gifPlayback: true, caption: weathertext }, { quoted: m })

        break;

      default:

        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          AMD.sendMessage(from, { react: { text: "❌", key: m.key } })
          reply(`Hey *${pushname}* senpai! this command are not programmed! Type *${prefix}help* to get my full command list!`)

        }


        if (budy.startsWith('=>')) {
          if (!isCreator) return reply(mess.botowner)
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
            reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
          } catch (e) {
            AMD.sendMessage(from, { image: ErrorPic, caption: String(e) }, { quoted: m })
          }
        }
        if (budy.startsWith('>')) {
          if (!isCreator) return reply(mess.botowner)
          try {
            let evaled = await eval(budy.slice(2))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            await reply(evaled)
          } catch (err) {
            await AMD.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
          }
        }


        if (budy.startsWith('$')) {
          if (!isCreator) return reply(mess.botowner)
          exec(budy.slice(2), (err, stdout) => {
            if (err) return AMD.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
            if (stdout) return replyH(stdout)
          })
        }


        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith('broadcast')) return
          if (m.isBaileys) return
          let msgs = global.db.database
          if (!(budy.toLowerCase() in msgs)) return
          AMD.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
        }
    }
  } catch (err) {
    AMD.sendMessage(`${ownertag}@s.whatsapp.net`, util.format(err), { quoted: m })
    console.log(err)
  }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})

