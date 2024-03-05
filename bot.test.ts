// import TelegramBot from 'node-telegram-bot-api';
// import { mocked } from "jest-mock";
// import axios from 'axios';
// import { startBot, handleGetEthereumPrice, handleConvertEthToUsd } from './bot';

// // const { mocked } = jestTest;

// jest.mock('node-telegram-bot-api');
// jest.mock('axios');

// const TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!

// const mockBot = mocked(new TelegramBot("6510780709:AAElflR9v9mnTgdOBxFeV4SRH36tF3NMJ2M", { polling: false })) as jest.Mocked<TelegramBot>;
// const mockAxios = mocked(axios);

// // const mockSendMessage = jest.fn()

// mockBot.sendMessage = jest.fn();
// const keyboardButtons: TelegramBot.KeyboardButton[][] = [
//   [{text: 'Get Ethereum Price'}],
//   [{text:'Convert ETH to USD'}]
// ];

// // mockBot.sendMessage = mockSendMessage

// describe('Telegram Bot', () => {
// //   const mockBot = mocked(new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: false }));
// //   const mockAxios = mocked(axios);

//   // beforeEach(() => {
//   //   mockSendMessage.mockClear();
//   //   mockAxios.get.mockClear();
//   // });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('Start Bot sends the correct message', () => {
//     startBot(mockBot);
//     const mockMessage : TelegramBot.Message = {
//         chat: {
//             id: 123,
//             type: 'private'
//         },
//         message_id: 456,
//         date: 0
//     };

//     expect(mockBot.sendMessage).toHaveBeenCalledWith(
//       123,
//       'Hello! Choose an option:',
//       // expect.any(Object)
//       {
//         reply_markup: {
//           keyboard: keyboardButtons,
//           resize_keyboard: true,
//           one_time_keyboard: true,
//         },
//       }
//     );
//   });

//   test('Handle Get Ethereum Price sends the correct message on success', async () => {
//     mockAxios.get.mockResolvedValue({ data: { ethereum: { usd: 2000 } } });
//      handleGetEthereumPrice();

//     const mockMessage: TelegramBot.Message = {
//       chat: { id: 123,            
//               type: 'private' 
//             },
//       message_id: 456,
//       date: 0
//     };

//     expect(mockBot.sendMessage).toHaveBeenCalledWith(
//       mockMessage.chat.id,
//       'Current Ethereum Price: $2000'
//     );
//   });

//   test('Handle Get Ethereum Price sends an error message on failure', async () => {
//     mockAxios.get.mockRejectedValue(new Error('Error fetching Ethereum price'));
//      handleGetEthereumPrice();

//     const mockMessage = {
//       chat: { id: 123 },
//       message_id: 456,
//     } as TelegramBot.Message;

//     expect(mockBot.sendMessage).toHaveBeenCalledWith(
//       mockMessage.chat.id,
//       'Unable to fetch Ethereum price at the moment. Please try again later.'
//     );
//   });

//   test('Handle Convert ETH to USD sends the correct message on success', async () => {
//     mockAxios.get.mockResolvedValue({ data: { ethereum: { usd: 2000 } } });
//      handleConvertEthToUsd();

//     const mockMessage = {
//       chat: { id: 123 },
//       message_id: 456,
//     } as TelegramBot.Message;

//     expect(mockBot.sendMessage).toHaveBeenCalledWith(
//       mockMessage.chat.id,
//       expect.stringContaining('Ethereum in USD')
//     );
//   });

//   test('Handle Convert ETH to USD sends an error message on invalid input', async () => {
//      handleConvertEthToUsd();

//     const mockMessage = {
//       chat: { id: 123 },
//       message_id: 456,
//     } as TelegramBot.Message;

//     expect(mockBot.sendMessage).toHaveBeenCalledWith(
//       mockMessage.chat.id,
//       'Invalid input. Please enter a valid Ethereum amount.'
//     );
//   });
// });


//----------------------------------------------------------------------------------------------

// bot.test.ts
// import TelegramBot from 'node-telegram-bot-api';
// import { mocked } from 'jest-mock';
// import { startBot } from './bot';

// jest.mock('node-telegram-bot-api');

// const mockBot = mocked(new TelegramBot("YOUR_TELEGRAM_BOT_TOKEN", { polling: false })) as jest.Mocked<TelegramBot>;

// mockBot.sendMessage = jest.fn();

// describe('Telegram Bot', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('Start Bot sends the correct message', () => {
//     startBot();
//     const mockMessage: TelegramBot.Message = {
//       chat: { id: 123, type: 'private' },
//       message_id: 456,
//       date: 0,
//     };

//     expect(mockBot.sendMessage).toHaveBeenCalledWith(
//       123,
//       'Hello! Choose an option:',
//       {
//         reply_markup: {
//           keyboard: [
//             [{ text: 'Get Ethereum Price' }],
//             [{ text: 'Convert ETH to USD' }],
//           ],
//           resize_keyboard: true,
//           one_time_keyboard: true,
//         },
//       }
//     );
//   });
// });

// import TelegramBot from 'node-telegram-bot-api';
// import { mocked } from 'jest-mock';
// import { startBot } from './bot';

// jest.mock('node-telegram-bot-api');

// const mockBot = mocked(new TelegramBot("YOUR_TELEGRAM_BOT_TOKEN", { polling: false })) as jest.Mocked<TelegramBot>;

// mockBot.sendMessage = jest.fn();

// describe('Telegram Bot', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('Start Bot sends the correct message', async () => {
//     // Create a promise to wait for the asynchronous operation to complete
//     const promise = new Promise<void>((resolve) => {
//       // Mock the onText event
//       mockBot.onText(/\/start/, async (msg) => {
//         try {
//           // Your expected message
//           const expectedMessage = 'Hello! Choose an option:';

//           // Trigger the startBot function
//           await startBot(mockBot);

//           // Assert that sendMessage is called with the correct arguments
//           expect(mockBot.sendMessage).toHaveBeenCalledWith(
//             msg.chat.id,
//             expectedMessage,
//             expect.any(Object)
//           );

//           // Resolve the promise to signal the completion of the asynchronous operation
//           resolve();
//         } catch (error) {
//           // Reject the promise if there's an error
//           console.error('Test failed with error:', error);
//           reject(error);
//         }
//       });
//     });

//     // Wait for the promise to resolve
//     await promise;
//   });
// });

// function reject(error: unknown) {
//   throw new Error('Function not implemented.');
// }

