import React, { createContext, useContext, useEffect, useState } from "react";
import liff from "@line/liff";
import { UserDataState } from '../types/Profile';
import { LiffContextType, LiffProviderProps } from '../types/LiffData';

const LiffContext = createContext<LiffContextType | null>(null);

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [userData, setUserData] = useState<UserDataState>({ profile: null });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                await liff.init({ liffId: import.meta.env.VITE_LIFF_APP_ID as string });

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

                console.log("userData", userData);
                console.log("isLoggedIn : ", isLoggedIn);

                setIsInitialized(true);
            } catch (err) {
                console.error("LIFF 初始化失敗：", err);
                setError(err instanceof Error ? err : new Error("未知錯誤"));
            }
        };

        initializeLiff();
    }, []);

    if (!isInitialized) {
        return (<div>Loading...</div>)
    }

    return (
        <LiffContext.Provider value={{ isInitialized, error, liff, userData, isLoggedIn }}>
            {children}
        </LiffContext.Provider>
    );
};

export const useLiffContext = (): LiffContextType => {
    const context = useContext(LiffContext);
    if (!context) {
        throw new Error("useLiffContext 必須在 LiffProvider 中使用");
    }
    return context;
};

export default LiffProvider;
