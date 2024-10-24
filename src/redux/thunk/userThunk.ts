import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserThunk = createAsyncThunk(
    "users/fetchUser",
    async ({ uuid }: { uuid: string | null }, { rejectWithValue }) => {
        try {
            if (uuid === null) {
                return null;
            }

            return true;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);