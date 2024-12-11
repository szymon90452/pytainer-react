/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addLogChunk } from "../slice/scriptsSlice";

export const getAllScriptsThunk = createAsyncThunk(
  "scripts/getAllScripts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/all",
        {
          method: "GET",
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
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);

export const runScriptThunk = createAsyncThunk(
  "scripts/runScript",
  async (processKey: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/run?processKey=${encodeURIComponent(
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
      toast.success("Script started successfully.");
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
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/stop?processKey=${encodeURIComponent(
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
      toast.success("Script stopped successfully.");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to stop script");
    }
  }
);

export const restartScriptThunk = createAsyncThunk(
  "scripts/restartScript",
  async (processKey: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/restart?processKey=${encodeURIComponent(
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
      toast.success("Script restarted successfully.");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to stop script");
    }
  }
);

export const uploadScriptThunk = createAsyncThunk(
  "scripts/uploadScript",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Script uploaded successfully.");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to upload script");
    }
  }
);

export const getScriptThunk = createAsyncThunk(
  "scripts/getScript",
  async (processKey: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/process-key?processKey=${encodeURIComponent(
          processKey
        )}`,
        {
          method: "GET",
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
      return rejectWithValue(error.message || "Failed to fetch script");
    }
  }
);

export const removeScriptThunk = createAsyncThunk(
  "scripts/removeScript",
  async (processKey: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/remove?processKey=${encodeURIComponent(
          processKey
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Script removed successfully.");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to remove script");
    }
  }
);

export const getScriptLogsThunk = createAsyncThunk(
  "scripts/fetchScriptLogs",
  async (
    { processKey }: { processKey: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/log/stream?processKey=${encodeURIComponent(
          processKey
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("ReadableStream reader not available");

      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          dispatch(addLogChunk(chunk));
        }
      }

      return "Stream completed";
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch script logs");
    }
  }
);

export const getStaticScriptLogsThunk = createAsyncThunk(
  "scripts/fetchStaticScriptLogs",
  async (
    { processKey, maxLines = 100 }: { processKey: string; maxLines?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://pytainerbackend-bab3amgdbyh0ftg2.polandcentral-01.azurewebsites.net/api/v1/script/log?processKey=${encodeURIComponent(
          processKey
        )}&maxLines=${maxLines}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch script logs");
    }
  }
);
