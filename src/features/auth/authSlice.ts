import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "../../model/UserInfo";
import { Key } from "../../constants/Key";
import { useAppSelector } from "../../redux/store";

export interface AuthSate {
  principle: UserInfo | null;
  loading: boolean;
}

const initialState: AuthSate = {
  principle: null,
  loading: false,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.principle = null;
      localStorage.removeItem(Key.ACCESS_TOKEN);
    },

    setPrinciple(state, action: PayloadAction<UserInfo | null>){
        state.principle = action.payload
    }
  },

});


export default authSlice;