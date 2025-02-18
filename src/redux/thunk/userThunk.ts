/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:2137/api/v1/auth";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const loginUserThunk = createAsyncThunk(
  "users/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Normalne logowanie użytkownika
      const userLoginResponse = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "pytainerfrontend",
          grant_type: "password",
          scope: "openid",
          username,
          password,
        }).toString(),
      });

      if (userLoginResponse.status === 200) {
        const userLoginData = await userLoginResponse.json();
        localStorage.setItem("token", userLoginData.access_token);
        localStorage.setItem("username", username);
        toast.success("Logged in successfully.");
        return userLoginData;
      } else if (userLoginResponse.status === 401) {
        throw new Error("Invalid credentials");
      } else if (userLoginResponse.status === 204) {
        toast.warn("Password change required.");
        return rejectWithValue("Password change required");
      } else {
        throw new Error("Failed to log in");
      }
    } catch (error: any) {
      localStorage.removeItem("token");
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
      localStorage.removeItem("token");
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

      const data = await response;
      toast.success(`User added successfully.`);
      return data;
    } catch (error: any) {
      localStorage.removeItem("token");
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
      localStorage.removeItem("token");
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
      localStorage.removeItem("token");
      toast.error(error.message || "Failed to delete user");
      return rejectWithValue(error.message || "Failed to delete user");
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "users/resetPassword",
  async (
    { username, newPassword }: { username: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const adminLoginResponse = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "pytainerfrontend",
          grant_type: "password",
          username: "frontend",
          password: "SomeFrontendPassword123!",
          scope: "openid",
        }).toString(),
      });

      if (!adminLoginResponse.ok) {
        throw new Error("Failed to authenticate admin account");
      }

      const adminData = await adminLoginResponse.json();
      const adminToken = adminData.access_token;

      const userResponse = await fetch(`${API_BASE_URL}/user/by-username/${username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user information");
      }

      const userData = await userResponse.json();
      const userId = userData.id;

      const resetResponse = await fetch(`${API_BASE_URL}/user/request/password/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!resetResponse.ok) {
        throw new Error("Failed to reset password");
      }

      console.log(resetResponse.body)

      toast.success("Password reset successfully.");
      return { username, userId };
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
      return rejectWithValue(error.message || "Failed to reset password");
    }
  }
);

export const requestPasswordChangeThunk = createAsyncThunk(
  "users/requestPasswordChange",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:2137/api/v1/auth/user/request/password/${userId}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to request password change");
      }

      toast.success("Password change request sent successfully.");
      return { userId };
    } catch (error: any) {
      toast.error(error.message || "Failed to request password change");
      return rejectWithValue(error.message || "Failed to request password change");
    }
  }
);