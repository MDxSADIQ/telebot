// all imports and libraries.
const TelegramBot = require("node-telegram-bot-api")
const token = '6609450929:AAEoRx9UUjm9XA9aqqk40_0iwFqayVDFIkM';
const bot = new TelegramBot(token, { polling: true })
const {v4}  = require("uuid")


// my database (tempory)

var ModAppList = [
    ["Spotify MOD APK", "https://t.me/+pOIJfkU6DE82ZDM9", "https://an1.com/uploads/posts/2024-04/1712045875_subway-surfers.png"]
]
var btnlist = []
ModAppList.forEach(btnArr => {
    btnlist.push([{ text: btnArr[0], callback_data: btnArr[1]}])

});

// bot functions and others

bot.onText(/\/start/, (msg) => {
    const opts = {
        reply_markup: {
            inline_keyboard:  btnlist
        }

    };
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Spotify MOD APK:- You will get all the Premium Features of Spotify in this apk free of cost. No Ads, unlimited music, etc.`, opts)
})



// callback query

bot.on("callback_query", async (callbackQuery) => {
    const fileLinK = callbackQuery.data
    const unique_id = v4();
    const verifylink = `https://t.me/Gamy_boy_bot?start=${unique_id}`
    const msg = callbackQuery.message
    var chatId = msg.chat.id

    // using api of ziplinker (link shortner)
    const linkShotnerURL = `https://ziplinker.net/api?api=120c687be1569659415fde9a382f6ee1fa7d3030&url=${verifylink}`
    let responce = await fetch(linkShotnerURL)
    let data = await  responce.json()
    var shortlink = data["shortenedUrl"]

    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "How to Watch Ad", url: "https://t.me/howtodownload_1/9" }],
                [{ text: "👀Watch Ad👀", url: shortlink }]

            ]
        }
    }
    // console.log(shortlink, fileLinK)
    bot.sendMessage(chatId,"Please Watch Ad to get your file", opts )
    bot.onText(`/start ${unique_id}`, (msg)=>{
        bot.sendMessage(msg.chat.id,"Here is your 📂file, Download and Enjoy your life!", {reply_markup:{inline_keyboard: [[{text: "Start Download", url:fileLinK }]]}})
    })

})
