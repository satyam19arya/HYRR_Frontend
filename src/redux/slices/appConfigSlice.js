import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyProfile = createAsyncThunk("user/getMyProfile", async () => {
    try{
        const response = await axiosClient.get('/api/user/getMyProfile')
        return response.result;
    }catch(e){
        return Promise.reject(e);
     }
});

export const updateMyProfile = createAsyncThunk("user/updateMyProfile", async (body) => {
    try{
        const response = await axiosClient.put('/api/user/', body)
        return response.result;
    }catch(e){
        return Promise.reject(e);
    }
});

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        toastData: {},
        myProfile: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        showToast: (state, action) => {
            state.toastData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        })
        .addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        })
    }
})

export default appConfigSlice.reducer;
export const {setLoading, showToast} = appConfigSlice.actions;