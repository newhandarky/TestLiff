import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLiffContext } from '../utils/LiffProvider';

import "./all.scss"

function Home() {
    const { isInitialized, error, isLoggedIn, liff, userData } = useLiffContext();
    const homePath = import.meta.env.VITE_HOME_PATH as string;

    const navigate = useNavigate();

    const login = () => {
        console.log(liff, "liff.login(),");
        liff.login({ redirectUri: homePath });
    }

    useEffect(() => {
        if (isInitialized) {
            console.log("Home - 已初始化完畢");
        } else {
            console.log("Home - 尚未初始化", error);
            return
        }
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
