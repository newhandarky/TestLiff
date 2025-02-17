import { useEffect, useState } from 'react';
import axios from 'axios';

import liff from "@line/liff";

import Profile from "../types/Profile";
import useToggleHandle from '../hooks/useToggleHandle';

interface ProfileState {
    profile: Profile;
}

function Info() {
    const [isOpen, handleModal] = useToggleHandle(false); // 初始狀態為關閉
    const [profile, setProfile] = useState<ProfileState | null>(null);
    const [message, setMessage] = useState<string>('');

    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    // const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;
    const apiUrl = import.meta.env.VITE_API_URL as string;

    // const
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
    }, [liffId]);

    const handleLoggedIn = async () => {
        try {
            // 發送請求
            axios.post(`${apiUrl}/webhook/send-message`, {
                userId: profile?.profile.userId, // 使用可選鏈接操作符檢查 profile 是否為 null
                message: "您已成功登入"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('傳送成功:', response.data);
                    // 你可以根據響應數據做進一步處理，例如彈出提示
                    alert(response.data);
                })
                .catch(error => {
                    console.error('在前端傳送失敗:', error);
                    // 處理錯誤情況，例如提醒用戶
                    alert('傳送訊息失敗');
                });

        } catch (error) {
            console.error('傳送訊息失敗:', error);
        }
    };

    const tryGetMessage = async () => {
        try {
            // 發送請求
            axios.get(`${apiUrl}/hello`)
                .then(response => {
                    console.log('接收成功:', response.data);
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
        <div className='p-4 '>
            <h2>Info Page</h2>
            <button className='btn btn-primary mb-3' type="button" onClick={() => handleModal()
            }>顯示用戶訊息</button>
            <button className='btn btn-primary mb-3' type="button" onClick={() => tryGetMessage()
            }>取得訊息{`${message && "測試GET方法"}`}</button>
            <button className='btn btn-primary mb-3' type="button" onClick={() => handleLoggedIn()
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