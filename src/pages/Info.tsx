import { useEffect } from 'react';

import liff from "@line/liff";

function Info() {
    // const []
    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;


    function sendMsg() {
        liff.sendMessages([
            {
                type: 'text',
                text: 'Hello, World!'
            }
        ]).then(function (res) {
            console.log(res)
        })
            .catch(function (error) {
                console.log(error);
            })
    }

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

    return <>
        <div>
            <h2>Info Page</h2>
            <button className='btn btn-primary' type="button" onClick={() => sendMsg()}>發送訊息</button>
        </div>
    </>;
}
export default Info;