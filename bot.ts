import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';


const TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!;

// Set up your Telegram bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });


const keyboardButtons: TelegramBot.KeyboardButton[][] = [
    [{text: 'Get Ethereum Price'}],
    [{text:'Convert ETH to USD'}]
];

// Handle /start command with buttons
// const startBot = (bot: TelegramBot) => {
//     bot.onText(/\/start/, (msg) => {
//     const options: TelegramBot.SendMessageOptions = {
//       reply_markup: {
//         keyboard:keyboardButtons,
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       }
//     };
    
//     bot.sendMessage(msg.chat.id, 'Hello! Choose an option:', options);
//   });
// };

const startBot = () => {
  return new Promise((resolve, reject) => {
    bot.onText(/\/start/, async (msg) => {
      try {
        const options: TelegramBot.SendMessageOptions = {
          reply_markup: {
            keyboard: keyboardButtons,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        };

        const result = await bot.sendMessage(msg.chat.id, 'Hello! Choose an option:', options);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};


// Handle button clicks for 'get ethereum price'
const handleGetEthereumPrice = () => {
bot.onText(/Get Ethereum Price/, async (msg) => {
  try {
    // Fetch Ethereum price from CoinGecko API
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethereumPrice = response.data.ethereum.usd;

    bot.sendMessage(msg.chat.id, `Current Ethereum Price: $${ethereumPrice}`);
  } catch (error) {
    // console.error('Error fetching Ethereum price:', error);
    bot.sendMessage(msg.chat.id, 'Unable to fetch Ethereum price at the moment. Please try again later.');
  }
});
};

// Handle button clicks for 'Convert ETH to USD'
const handleConvertEthToUsd = () => {
bot.onText(/Convert ETH to USD/, (msg) => {
    const chatId = msg.chat.id;
  
    bot.sendMessage(chatId, 'Enter the Ethereum amount to convert:');
  
    // Listen for the user's response
    const listenerCallback = (responseMsg: TelegramBot.Message) => {
      try {
        const ethAmount = parseFloat(responseMsg.text || '0');
  
        // Check if the input is a valid number
        if (isNaN(ethAmount)) {
          throw new Error('Invalid input. Please enter a valid Ethereum amount.');
        }
  
        // Fetch the exchange rate
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
          .then((response) => {
            const exchangeRate = response.data.ethereum.usd;
            const usdAmount = ethAmount * exchangeRate;
  
            bot.sendMessage(chatId, `Ethereum in USD: $${usdAmount.toFixed(2)}`);
          })
          .catch((error) => {
            // console.error('Error fetching exchange rate:', error);
            bot.sendMessage(chatId, 'Error fetching exchange rate. Please try again later.');
          })
          .finally(() => {
            // Remove the listener after processing the response
            bot.removeListener('text', listenerCallback);
          });
      } catch (error) {
        console.error('Error converting ETH to USD:', error);
        bot.sendMessage(chatId, (error as Error).message || 'An error occurred. Please try again.');

        bot.removeListener('text', listenerCallback);
      }
    };
  
    // Register the listener for the user's response
    bot.on('text', listenerCallback);
  });
};
  
  export { startBot, handleGetEthereumPrice, handleConvertEthToUsd};
  