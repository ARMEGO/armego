import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
	username: string;
	token: string | null;
}

const initialState: IUser = {
	username: "",
	token: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		/**
		 * Add user
		 * @param state
		 * @param action
		 */
		setUser: (state, action: PayloadAction<IUser>) => {
			const { username, token } = action.payload;
			state.username = username;
			state.token = token;
		},
		/**
		 * Log user out
		 * @param state
		 */
		signOut: (state) => {
			sessionStorage.clear();
			state.username = "";
			state.token = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, signOut } = userSlice.actions;

export default userSlice.reducer;
