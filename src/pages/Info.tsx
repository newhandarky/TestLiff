import { useEffect, useState } from 'react';
import axios from 'axios';

import liff from "@line/liff";

import Profile from "../types/Profile";
import useToggleHandle from '../hooks/useToggleHandle';

interface ProfileState {
    profile: Profile;
}

// 定義錯誤回應資料的型別
// interface ErrorResponseData {
//     message: string;
//     status: number;
// }



function Info() {
    const [isOpen, handleModal] = useToggleHandle(false); // 初始狀態為關閉
    const [profile, setProfile] = useState<ProfileState | null>(null);
    const [message, setMessage] = useState<string>('');

    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    // const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;
    const apiUrl = import.meta.env.VITE_API_URL as string;

    // const userId = localStorage.getItem("userId") || "defaultUserId";
    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({
                    liffId: liffId,
                });

                if (!liff.isLoggedIn()) {
                    console.log("尚未登入");
                    liff.login();
                } else {
                    console.log(liff.isLoggedIn(), "已經登入");
                }

            } catch (error) {
                console.error('Error initializing LIFF:', error);
            }
        };
        initializeLiff();
    }, []);

    const sendMessage = async () => {
        try {
            // 假設 apiUrl 是後端 API 的基礎 URL，例如 https://your-backend.com
            const apiUrl = import.meta.env.VITE_API_URL;

            // 檢查 profile 是否存在，確保 userId 可用
            if (!profile?.profile?.userId) {
                alert('找不到用戶 ID，無法發送訊息');
                return;
            }

            // 發送 POST 請求到後端 /send-message 路徑
            const response = await axios.post(`${apiUrl}/webhook/send-message`, {
                userId: profile.profile.userId, // 從 profile 中獲取 userId
                message: "您已成功登入" // 要發送的訊息內容
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // 如果需要授權，可以在這裡添加 Authorization 標頭
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            console.log('傳送成功:', response.data);
            alert('訊息已成功發送！');
        } catch (error: unknown) {
            // 使用 Axios 提供的工具進行類型檢查
            if (axios.isAxiosError(error)) {
                // Axios 錯誤，處理回應中的錯誤訊息
                console.error('傳送訊息失敗（Axios 錯誤）:', error.response?.data || error.message);
                alert(`傳送訊息失敗：${error.response?.data.message || '請稍後再試'}`);
            } else {
                // 非 Axios 錯誤，處理其他未知錯誤
                console.error('傳送訊息失敗（未知錯誤）:', error);
                alert('傳送訊息失敗，請稍後再試');
            }
        }
    };

    const tryGetMessage = async () => {
        try {
            // 發送請求
            axios.get(`${apiUrl}/hello`)
                .then(response => {
                    console.log('接收成功:', response);
                    setMessage(response.data);
                })
                .catch(error => {
                    console.error('請求發送失敗:', error);
                    // 處理錯誤情況，例如提醒用戶
                    alert('GET請求發送失敗');
                });

        } catch (error) {
            console.error('取得訊息失敗:', error);
        }
    };

    useEffect(() => {
        // 等待 getProfile 完成，並取得用戶資料
        const fetchProfile = async () => {
            try {
                const data = await liff.getProfile(); // 獲取用戶資料
                console.log(data.displayName, "用戶資訊");
                setProfile({ profile: data }); // 將資料存入狀態
            } catch (error) {
                console.error("取得用戶資訊時發生錯誤:", error);
            }
        };

        fetchProfile(); // 呼叫非同步函數
    }, []); // 空依賴陣列，僅在組件掛載時執行

    return <>
        {console.log(message, "是否有訊息")}
        <div className='p-4 d-flex flex-column'>
            <h2>Info Page</h2>
            <button className='btn btn-primary mb-3' type="button" onClick={() => handleModal()
            }>顯示用戶訊息</button>
            <button className='btn btn-primary mb-3' type="button" onClick={() => tryGetMessage()
            }>取得訊息{`${message && "：" + message}`}</button>
            <button className='btn btn-primary mb-3' type="button" onClick={() => sendMessage()
            }>發送登入訊息給用戶</button>
            {isOpen && (
                <div>
                    <p>App Language: {liff.getAppLanguage()}</p>
                    <p>Language: {liff.getLanguage()}</p>
                    <p>Version: {liff.getVersion()}</p>
                    <p>Is In Client: {liff.isInClient() ? 'Yes' : 'No'}</p>
                    <p>Logged In: {liff.isLoggedIn() ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    </>;
}
export default Info;