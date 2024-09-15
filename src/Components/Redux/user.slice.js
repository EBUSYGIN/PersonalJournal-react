import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jwt: null
};

export const login = createAsyncThunk('user/login', async (params) => {
  try {
    const data = await axios.post(
      'https://purpleschool.ru/pizza-api-demo/auth/login',
      {
        email: params.email,
        password: params.password
      }
    );
    return data;
  } catch (e) {
    throw new Error(e.response?.data.message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeJwt: (state) => {
      state.jwt = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload.data.access_token;
    });
  }
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
