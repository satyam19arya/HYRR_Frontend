import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfile = createAsyncThunk("/api/user/getUserProfile", async (body) => {
        try {
            const response = await axiosClient.post("/api/user/getUserProfile",body);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const likeAndUnlikePost = createAsyncThunk("post/likeAndUnlike", async (body) => {
        try {
            const response = await axiosClient.post("/api/posts/like", body);
            return response.result.post;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {
        userProfile: {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
                const post = action.payload;

                const index = state?.userProfile?.posts?.findIndex(
                    (item) => item._id === post._id
                );
                console.log("postslice", index);
                if (index !== undefined && index !== -1) {
                    state.userProfile.posts[index] = post;
                }
            });
    },
});

export default postsSlice.reducer;