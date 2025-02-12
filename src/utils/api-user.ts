import liff from '@line/liff';
import axios from 'axios';

export async function saveUser() {
    try {
        const profile = await liff.getProfile(); // 確保 LIFF 已初始化並用戶已登入
        const userId = profile.userId;

        const response = await axios.post('/api/save-user', {
            userId: userId,
        }, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('用戶資料儲存成功:', response);
    } catch (error) {
        console.error('儲存用戶資料失敗:', error);
        // console.error('儲存用戶資料失敗:', error.response ? error.response.data : error.message);
    }
}
