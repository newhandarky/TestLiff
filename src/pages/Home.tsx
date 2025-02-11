// import { useState } from 'react';
import liff from '@line/liff';
const liffId = '2006884711-Q5r6z736';

function Home() {
    // const [userData, setUserData] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    liff.init({
        liffId: liffId,


        // withLoginOnExternalBrowser: true
    }).then(function () {
        console.log('LIFF init');

        if (liff.isLoggedIn()) {
            console.log('已登入');
        } else {
            console.log('未登入');
        }

        // 這邊開始寫使用其他功能


    }).catch(function (error) {
        console.log(error);
    });

    // if (!liff.isLoggedIn()) {
    //     liff.login();
    // } else {
    //     liff.getProfile().then(function (profile) {
    //         setUserData(profile);
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }
    return (
        <>
            <div className=''>
                <div>
                    <h1>Welcome to My App</h1>
                    <p>This is the home page.</p>
                </div>
            </div >
        </>
    );
}
export default Home;