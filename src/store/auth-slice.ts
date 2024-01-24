import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginSuccessDTO} from "../utils/api/dtos/auth";

interface AuthState {
    isLoggedIn: boolean;
    id: number;
    name: string;
    email: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    id: 0,
    name: "undefined",
    email: "undefined",
};

export const AuthSlice = createSlice({
    name: "authState",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout() {
            return initialState;
        },
    },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
