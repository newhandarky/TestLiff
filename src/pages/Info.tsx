import { useEffect, useState } from 'react';
import { saveUser } from "../utils/api-user"
import { sendMessage } from "../utils/lineMessaging"

import liff from "@line/liff";

import useToggleHandle from '../hooks/useToggleHandle';
function Info() {
    const [isOpen, handleModal] = useToggleHandle(false); // 初始狀態為關閉
    const [sendNow, setSendNow] = useState(false);

    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;

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

                // 傳送訊息告知登入成功
                await sendMessage(profile.userId, "登入成功！");
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
            {
                sendNow ?
                    <button className='btn btn-primary' type="button" onClick={() => handleModal()
                    }>顯示用戶訊息</button> :
                    <button className='btn btn-primary' type="button" onClick={() => setSendNow()
                    }>發送登入訊息給用戶</button>
            }
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