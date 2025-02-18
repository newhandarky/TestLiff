import { useEffect, useState } from 'react';
import axios from 'axios';

import liff from "@line/liff";

import Profile from "../types/Profile";
import useToggleHandle from '../hooks/useToggleHandle';

// import { sendMessage, tryGetMessage, getFollowers } from "../utils/lineMessaging"

interface ProfileState {
    profile: Profile;
}

function Info() {
    const [isOpen, handleModal] = useToggleHandle(false); // 初始狀態為關閉
    const [profile, setProfile] = useState<ProfileState | null>(null);
    const [message, setMessage] = useState<string>('');
    const [followers, setFollowers] = useState<number>(0);

    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const apiUrl = import.meta.env.VITE_API_URL as string;

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
                console.log(error);

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

    const getFollowers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/webhook/get-followers`);
            console.log('取得粉絲人數:', response.data);
            setFollowers(response.data.followers);
        } catch (error) {
            console.error('取得粉絲人數失敗: in Info.tsx', error);
        }
    };

    // const shareTarget = async () => {
    const shareTarget = async (message: string, option: boolean) => {
        liff
            .shareTargetPicker(
                [
                    {
                        type: "text",
                        text: "Hello, World!",
                    },
                    {
                        type: "text",
                        text: message,
                    },
                    {
                        type: "text",
                        text: "Goodbye, World!",
                    },
                ],
                {
                    isMultiple: option,
                }
            )
            .then(function (res) {
                if (res) {
                    // succeeded in sending a message through TargetPicker
                    console.log(`[${res.status}] Message sent!`);
                } else {
                    // sending message canceled
                    console.log("TargetPicker was closed!");
                }
            })
            .catch(function (error) {
                // something went wrong before sending a message
                console.log("something wrong happen");
                throw error;
            });

        if (liff.isApiAvailable('shareTargetPicker')) {
            console.log("shareTargetPicker is available");

        } else {
            console.log("shareTargetPicker is not available");

        }
    };

    // const scanCode = async () => {
    //     liff
    //         .scanCodeV2()
    //         .then((result) => {
    //             // result = { value: "" }
    //             console.log("result", result.value);

    //         })
    //         .catch((error) => {
    //             console.log("error", error);
    //         });
    // };

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
            <button className='btn btn-primary mb-3' type="button" onClick={() => getFollowers()
            }>{followers ? `關注人數：${followers}` : "取得關注人數"}</button>
            {/* <button className='btn btn-primary mb-3' type="button" onClick={() => shareTarget("單純測試", true)
            }>選擇發送目標</button> */}
            <button className='btn btn-primary mb-3' type="button" onClick={() => shareTarget("我只是測試", true)
            }>選擇發送目標</button>
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
