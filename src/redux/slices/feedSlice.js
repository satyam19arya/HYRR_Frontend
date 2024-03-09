import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndUnlikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
        try {
            const response = await axiosClient.get("/api/user/getFeedData");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

export const getAllPosts = createAsyncThunk("user/getAllPosts", async () => {
        try {
            const response = await axiosClient.get("/api/posts/posts");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

export const followAndUnfollowUser = createAsyncThunk("user/followAndUnfollow", async (body) => {
        try {
            const response = await axiosClient.post("/api/user/follow", body);
            return response.result.user;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
        feedData: {},
        allPosts: {},
        feedData_status: "idle",
        allPosts_status: "idle",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedData.pending, (state, action) => {
                state.feedData_status = "loading";
            })
            .addCase(getFeedData.fulfilled, (state, action) => {
                state.feedData = action.payload;
                state.feedData_status = "success";
            })
            .addCase(getAllPosts.pending, (state, action) => {
                state.allPosts_status = "loading";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.allPosts = action.payload;
                state.allPosts_status = "success";
            })
            .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
                const post = action.payload;

                const index = state?.feedData?.posts?.findIndex(
                    (item) => item._id === post._id
                );
                console.log("feed like", post, index);
                if (index !== undefined && index !== -1) {
                    state.feedData.posts[index] = post;
                }
            })
            .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
                const user = action.payload;
                const index = state?.feedData?.followings.findIndex(item => item._id === user._id);
                if(index !== -1) {
                    state?.feedData.followings.splice(index, 1);
                } else {
                    state?.feedData.followings.push(user);
                }
            })
    },
});

export default feedSlice.reducer;