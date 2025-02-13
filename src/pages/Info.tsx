import { useEffect, useState } from 'react';
import axios from 'axios';

import liff from "@line/liff";

import useToggleHandle from '../hooks/useToggleHandle';
function Info() {
    const [isOpen, handleModal] = useToggleHandle(false); // 初始狀態為關閉
    const [sendNow, setSendNow] = useState(false);
    // const [newMessage, setNewMessage] = useState<string>('');

    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;
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
                    liff.login({ redirectUri: homePath });
                } else {
                    console.log(liff.isLoggedIn(), "已經登入");
                }

            } catch (error) {
                console.error('Error initializing LIFF:', error);
            }
        };
        initializeLiff();
    }, [liffId, homePath]);

    useEffect(() => {
        const handleLoggedIn = async () => {
            try {
                // 等待 getProfile 完成，並取得用戶資料
                const profile = await liff.getProfile();
                console.log(profile.displayName, "用戶資訊");

                // 發送請求
                axios.post(`${apiUrl}/webhook/send-message`, {
                    userId: profile.userId,
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

        if (liff.isLoggedIn()) {
            handleLoggedIn(); // 調用 async 函式，記得加上 await
        }
    }, [sendNow]);

    return <>
        <div className='p-4'>
            <h2>Info Page</h2>
            <button className='btn btn-primary' type="button" onClick={() => handleModal()
            }>顯示用戶訊息</button>
            <br />
            <button className='btn btn-primary' type="button" onClick={() => setSendNow(true)
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