import { useState, useEffect } from "react";
import liff from "@line/liff";

import {Profile} from '../types/Profile';

interface UseLiffResult {
    isInitialized: boolean;
    error: Error | null;
    liff: typeof liff;
}

interface UserDataState {
    profile: Profile | null;
}

export const useLiff = (liffId: string): UseLiffResult => {
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserDataState>({ profile: null });
    const [error, setError] = useState<Error | null>(null);

    const fetchProfile = async () => {
        try {
            const profile = await liff.getProfile();
            setUserData((prevState) => ({
                ...prevState,
                profile,
            }));
        } catch (err) {
            console.error("Error fetching profile:", err);
            if (err instanceof Error) {
                setError(err);
            }
        }
    };

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({
                    liffId: liffId,
                });

                // 確保 LIFF 初始化完成
                await liff.ready;

                // 檢查是否在 LINE 客戶端內
                if (!liff.isInClient()) {
                    console.warn("不在 LINE 客戶端內");
                }

                if (liff.isLoggedIn()) {
                    await fetchProfile(); // 取得使用者資料
                }

                console.log(userData, "init中的使用者資料");
                

            } catch (err) {
                setIsInitialized(false);
                console.error("Error initializing LIFF:", err);
                setError(err instanceof Error ? err : null);
            } finally {
                setIsInitialized(true); // 確保初始化狀態設置完成
            }
        };

        initializeLiff();
    }, [liffId]);

    return { isInitialized, error, liff };
};