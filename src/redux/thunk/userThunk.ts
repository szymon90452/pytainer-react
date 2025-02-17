/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:2137/api/v1/auth";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const loginUserThunk = createAsyncThunk(
  "users/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Logowanie jako konto klienta, aby uzyskać token admina
      // const clientLoginResponse = await fetch(`${API_BASE_URL}/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: new URLSearchParams({
      //     client_id: "pytainerfrontend",
      //     grant_type: "password",
      //     username: "frontend",
      //     password: "SomeFrontendPassword123!",
      //   }).toString(),
      // });

      // if (!clientLoginResponse.ok) {
      //   throw new Error("Failed to authenticate client");
      // }

      // const clientData = await clientLoginResponse.json();
      // const adminToken = clientData.access_token;

      // // Pobieranie informacji o użytkowniku
      // const userResponse = await fetch(`${API_BASE_URL}/user/by-username/${username}`, {
      //   method: "GET",
      //   headers: {
      //     "Authorization": `Bearer ${adminToken}`,
      //   },
      // });

      // if (!userResponse.ok) {
      //   throw new Error("Failed to fetch user information");
      // }

      // const userData = await userResponse.json();
      // if (userData.requiredActions && userData.requiredActions.length > 0) {
      //   throw new Error("User has required actions to complete");
      // }

      // Normalne logowanie użytkownika
      const userLoginResponse = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "pytainerfrontend",
          grant_type: "password",
          username,
          password,
        }).toString(),
      });

      if (!userLoginResponse.ok) {
        throw new Error("Invalid credentials");
      }

      const userLoginData = await userLoginResponse.json();
      localStorage.setItem("token", userLoginData.access_token);
      toast.success("Logged in successfully.");
      return userLoginData;
    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
      return rejectWithValue(error.message || "Failed to log in");
    }
  }
);

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

export const addUserThunk = createAsyncThunk(
  "users/addUser",
  async (
    userData: {
      username: string;
      fullname: string;
      firstname: string;
      surname: string;
      email: string;
      enabled: boolean;
      emailVerified: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:2137/api/v1/auth/user", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const data = await response.json();
      toast.success(`User added successfully.`);
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
    userData: {
      id: string;
      username: string;
      firstname: string;
      surname: string;
      email: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:2137/api/v1/auth/user", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

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
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:2137/api/v1/auth/user?userId=${userId}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      toast.success("User deleted successfully.");
      return userId;
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
      return rejectWithValue(error.message || "Failed to delete user");
    }
  }
);