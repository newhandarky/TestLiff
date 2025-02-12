import { useEffect } from 'react';
import { saveUser } from "../utils/api-user"

import liff from "@line/liff";

function Info() {
    const liffId = import.meta.env.VITE_LIFF_APP_ID as string;
    const homePath = import.meta.env.VITE_LIFF_APP_HOME_PATH as string;

    // function sendMsg() {
    //     liff.sendMessages([
    //         {
    //             type: 'text',
    //             text: 'Hello, World!'
    //         }
    //     ]).then(function (res) {
    //         console.log(res)
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }

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
        <div className='p-4'>
            <h2>Info Page</h2>
            <button className='btn btn-primary' type="button" onClick={() => console.log(saveUser())
            }>發送訊息</button>
            {liff.isLoggedIn() && (
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