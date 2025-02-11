import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import liff from '@line/liff';

import Profile from '../types/Profile';

import "./all.scss"


interface UserDataState {
    profile: Profile | null;
}

function Home() {
    const [userData, setUserData] = useState<UserDataState>({ profile: null });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
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

    useEffect(() => {
        const initializeLiff = async () => {

            try {
                await liff.init({
                    liffId: liffId,
                });
                console.log('LIFF initialized');

                if (!liff.isLoggedIn()) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                    await fetchProfile(); // 呼叫 fetchProfile 取得使用者資料
                }
            } catch (error) {
                console.error('Error initializing LIFF:', error);
            }
        };

        initializeLiff(); // 初始化 LIFF
    }, [liffId]);


    useEffect(() => {
        if (userData) {
            console.log(liff, "liff");

            console.log('User Data:', userData)
        }

    }, [userData])

    return (
        <>
            <div className=''>
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
                        <button className='btn btn-success' onClick={() => liff.login()}>點我登入</button>
                    }
                </div>
            </div >
        </>
    );
}
export default Home;
