export interface Profile {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
}
export interface UserDataState {
    profile: Profile | null;
}