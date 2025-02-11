import { useEffect, useState } from 'react';
import liff from '@line/liff';

import Profile from '../trpes/Profile';

const liffId = '2006884711-Q5r6z736';

interface UserDataState {
    profile: Profile | null;
}

function Home() {
    const [userData, setUserData] = useState<UserDataState>({ profile: null });
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                    withLoginOnExternalBrowser: true,
                });
                console.log('LIFF initialized');

                if (!liff.isLoggedIn()) {
                    liff.login();
                } else {
                    await fetchProfile(); // 呼叫 fetchProfile 取得使用者資料
                }
            } catch (error) {
                console.error('Error initializing LIFF:', error);
            }
        };

        initializeLiff(); // 初始化 LIFF
    }, []);


    useEffect(() => {
        if (userData) {
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
                    { }
                </div>
            </div >
        </>
    );
}
export default Home;

