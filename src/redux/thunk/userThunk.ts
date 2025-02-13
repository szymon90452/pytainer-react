/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchUserThunk = createAsyncThunk(
  "users/fetchUser",
  async ({ uuid }: { uuid: string | null }, { rejectWithValue }) => {
    try {
      if (!uuid) return null;

      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/user/${uuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "users/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      toast.success("Logged in successfully.");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
      return rejectWithValue(error.message || "Failed to log in");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "users/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully.");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
      return rejectWithValue(error.message || "Failed to log out");
    }
  }
);

export const addUserThunk = createAsyncThunk(
  "users/addUser",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const data = await response.json();
      toast.success("User added successfully.");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to add user");
      return rejectWithValue(error.message || "Failed to add user");
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async (
    {
      uuid,
      userData,
    }: { uuid: string; userData: Partial<{ name: string; email: string }> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/update/${uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      toast.success("User updated successfully.");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
      return rejectWithValue(error.message || "Failed to update user");
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/delete/${uuid}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      toast.success("User deleted successfully.");
      return uuid;
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
      return rejectWithValue(error.message || "Failed to delete user");
    }
  }
);
