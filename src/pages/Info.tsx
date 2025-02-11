import { useEffect, useState } from 'react';

import liff from "@line/liff";

import LiffData from "../types/LiffData";

function Info() {
    const [liffData, setLiffData] = useState<LiffData>(null);
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

                    setLiffData({
                        os: liff.getOS(),
                        aLang: liff.getAppLanguage(),
                        lang: liff.getLanguage(),
                        ver: liff.getVersion(),
                        isInClient: liff.isInClient(),
                        isLoggedIn: liff.isLoggedIn()
                    })


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
            {liffData && (
                <div>
                    <p>OS: {liffData.os}</p>
                    <p>App Language: {liffData.aLang}</p>
                    <p>Language: {liffData.lang}</p>
                    <p>Version: {liffData.ver}</p>
                    <p>Is In Client: {liffData.isInClient ? 'Yes' : 'No'}</p>
                    <p>Logged In: {liffData.isLoggedIn ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    </>;
}
export default Info;