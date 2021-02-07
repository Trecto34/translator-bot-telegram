require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const translate = require("@iamtraction/google-translate");

const token = process.env.TELEGRAM_TOKEN; //your token
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const start = "/start";
  if (msg.text.toString().toLowerCase().indexOf(start) === 0) {
    bot.sendMessage(
      msg.chat.id,
      "I'm a bot that will translate your messages!"
    );
  }
});

bot.on("message", (msg) => {
  const creator = "/creator";
  if (msg.text.toString().toLowerCase().indexOf(creator) === 0) {
    bot.sendMessage(
      msg.chat.id,
      "Adan de Oliveira Ferreira\nGithub: https://github.com/Trecto34"
    );
  }
});

bot.onText(/\/translate (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  translate(resp, { to: "pt" }) // the language
    .then((res) => {
      bot.sendMessage(chatId, res.text); // the bot response
    })
    .catch((err) => {
      console.error(err);
    });
});
