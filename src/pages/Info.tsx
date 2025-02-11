import { useEffect } from 'react';

import liff from "@line/liff";



function Info() {
    // const []
    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({
                    liffId: liffId,
                });

                if (!liff.isLoggedIn()) {
                    liff.login({ redirectUri: homePath });
                } else {
                    console.log(liff.isLoggedIn(), "已經登入");
                }

            } catch (error) {
                console.error('Error initializing LIFF:', error);
            }
        };
        initializeLiff();
    }, []);

    return <>
        <div>
            <h2>User Profile</h2>
            {/* <p>{userData.profile?.displayName} 歡迎你回來</p>
            <img className='user-photo' src={userData.profile?.pictureUrl} alt="用戶頭像" /> */}
        </div>
    </>;
}
export default Info;