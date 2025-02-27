import { ReactNode } from "react";
import { UserDataState } from "./Profile";
import { liff } from "@line/liff";

export interface LiffData {
    // os?: string;
    aLang?: string;
    lang?: string;
    ver?: string;
    // lineVer?: string;
    isInClient?: boolean;
    isLoggedIn?: boolean;
}

export interface LiffContextType {
    isInitialized: boolean;
    error: Error | null;
    liff: typeof liff;
    isLoggedIn: boolean;
    userData: UserDataState;
}

export interface LiffProviderProps {
    children?: ReactNode;
}
