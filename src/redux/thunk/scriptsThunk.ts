/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllScriptsThunk = createAsyncThunk(
  "scripts/getAllScripts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:2137/api/v1/script/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);

export const runScriptThunk = createAsyncThunk(
  "scripts/runScript",
  async (processKey: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:2137/api/v1/script/run?processKey=${encodeURIComponent(
          processKey
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to run script");
    }
  }
);

export const stopScriptThunk = createAsyncThunk(
  "scripts/stopScript",
  async (processKey: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:2137/api/v1/script/stop?processKey=${encodeURIComponent(
          processKey
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to stop script");
    }
  }
);
