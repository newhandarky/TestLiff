import { useEffect, useState } from 'react';

import liff from "@line/liff";

import LiffData from "../types/LiffData";

interface LiffDataState {
    liffData: LiffData | null;
}

function Info() {
    const [liffState, setLiffState] = useState<LiffDataState>({ liffData: null });
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

                    const info: LiffData = {
                        // os: liff.getOS(),
                        aLang: liff.getAppLanguage(),
                        lang: liff.getLanguage(),
                        ver: liff.getVersion(),
                        isInClient: liff.isInClient(),
                        isLoggedIn: liff.isLoggedIn()
                    };

                    setLiffState(prev => ({
                        liffData: info
                    }));


                }

            } catch (error) {
                console.error('Error initializing LIFF:', error);
            }
        };
        initializeLiff();
    }, [liffId, homePath]);

    useEffect(() => {
        console.log(liffState);
    }, [liffState]);

    return <>
        <div>
            <h2>Info Page</h2>
            <button className='btn btn-primary' type="button" onClick={() => sendMsg()}>發送訊息</button>
            {liffState.liffData && (
                <div>
                    {/* <p>OS: {liffState.liffData.os}</p> */}
                    <p>App Language: {liffState.liffData.aLang}</p>
                    <p>Language: {liffState.liffData.lang}</p>
                    <p>Version: {liffState.liffData.ver}</p>
                    <p>Is In Client: {liffState.liffData.isInClient ? 'Yes' : 'No'}</p>
                    <p>Logged In: {liffState.liffData.isLoggedIn ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    </>;
}
export default Info;