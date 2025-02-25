import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import liff from '@line/liff';

import LIFFInspectorPlugin from '@line/liff-inspector';
import { LiffMockPlugin } from '@line/liff-mock';

import Profile from '../types/Profile';

import "./all.scss"

interface UserDataState {
    profile: Profile | null;
}


function Home() {
    const [userData, setUserData] = useState<UserDataState>({ profile: null });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [showBtn, setShowBtn] = useState(false);

    const navigate = useNavigate();


    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const homePath = import.meta.env.VITE_HOME_PATH as string;

    const fetchProfile = async () => {
        try {
            const profile = await liff.getProfile();
            setUserData(prevState => ({
                ...prevState,
                profile
            }));
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const login = () => {
        console.log(liff, "liff.login(),");
        liff.login({ redirectUri: homePath });
    }

    // 正式環境下使用 LIFF 初始化
    const initializeLiff = async () => {

        console.log(liffId, "liffId");

        console.log("環境：", import.meta.env.VITE_MODE);


        try {
            await liff.init({
                liffId: liffId,
            });

            // 等待 LIFF 準備完成
            await liff.ready;

            // 確認是否在 LINE 客戶端內
            if (!liff.isInClient()) {
                console.warn("不在 LINE 客戶端內");
            }

            if (!liff.isLoggedIn()) {
                console.log("尚未登入");
                setIsLoggedIn(false);
            } else {
                console.log("已經登入");
                setIsLoggedIn(true);
                await fetchProfile(); // 呼叫 fetchProfile 取得使用者資料
            }
        } catch (error) {
            console.error('Error initializing LIFF:', error);
        }
    };

    // 測試環境用
    const initializeLiffForTest = async () => {
        try {
            // 開發環境：啟用 Mock 和 Inspector 插件
            liff.use(new LiffMockPlugin());
            liff.use(new LIFFInspectorPlugin({ origin: 'wss://localhost:9222' }));

            // 初始化並啟用 Mock 模式
            await liff.init({ liffId: import.meta.env.VITE_LIFF_APP_ID, mock: true });

            // 設定模擬數據
            liff.$mock.set({
                getProfile: () => ({
                    displayName: 'Mock User',
                    userId: 'mock-user-id',
                    statusMessage: 'This is a mocked profile!',
                }),
                isInClient: () => true, // 模擬在 LINE 客戶端內運行
            });

        } catch (error) {
            console.error('LIFF 初始化失敗:', error);
        }
    };

    useEffect(() => {
        console.log(import.meta.env.VITE_MODE === 'production' ? "正式環境" : "開發環境");

        if (import.meta.env.VITE_MODE === 'production') {
            initializeLiff(); // 正式環境初始化 LIFF
        } else {
            initializeLiffForTest() // 測試環境用
        }

        console.log(liff.isInClient() ? 'init前判斷 is in client' : 'init前判斷 not in client');
    }, []);

    return (
        <>
            <div className='p-4'>
                <div>
                    <h1>Welcome to My App</h1>
                    <p>This is the home page.</p>
                </div>
                <div>
                    {isLoggedIn ?
                        <div>
                            <h2>User Profile</h2>
                            <p>{userData.profile?.displayName} 歡迎你回來</p>
                            <img className='user-photo' src={userData.profile?.pictureUrl} alt="用戶頭像" />
                            <button className='btn btn-success' onClick={() => navigate('/Info')}>查看個人資料</button>
                        </div> :
                        // <button className='btn btn-success' onClick={() => liff.login({ redirectUri: homePath })}>點我登入</button>
                        <button className='btn btn-success' onClick={() => login()}>點我登入</button>
                    }
                </div>
            </div >
        </>
    );
}
export default Home;
