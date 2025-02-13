// // 寫錯

// import axios from 'axios';

// const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN'; // 替換為你的 Channel Access Token

// export async function sendMessage(userId: string, message: string) {
//     try {
//         const response = await axios.post(
//             'https://api.line.me/v2/bot/message/push',
//             {
//                 to: userId,
//                 messages: [{ type: 'text', text: message }],
//             },
//             { headers: { Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` } }
//         );

//         console.log('訊息推送成功:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('發送訊息失敗:', error);
//         throw error;
//     }
// }
