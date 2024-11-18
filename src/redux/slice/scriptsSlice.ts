import { createSlice } from "@reduxjs/toolkit";

import { TStatus } from "@/types/TStatus";
import { IScript } from "@/types/IScript";
import {
  getAllScriptsThunk,
  getScriptLogsThunk,
  getScriptThunk,
  removeScriptThunk,
  restartScriptThunk,
  runScriptThunk,
  stopScriptThunk,
  uploadScriptThunk,
} from "../thunk/scriptsThunk";

interface ScriptState {
  script?: IScript;
  scriptLogs: string;
  scripts?: IScript[];
  getAllScriptsStatus: TStatus;
  getScriptStatus: TStatus;
  getScriptLogsStatus: TStatus;
  getScriptStatusStatus: TStatus;
  getScriptFilesStatus: TStatus;
  runScriptStatus: TStatus;
  stopScriptStatus: TStatus;
  restartScriptStatus: TStatus;
  removeScriptStatus: TStatus;
  uploadScriptStatus: TStatus;
}

const initialState: ScriptState = {
  script: undefined,
  scriptLogs: "",
  scripts: undefined,
  getAllScriptsStatus: null,
  getScriptStatus: null,
  getScriptLogsStatus: null,
  getScriptStatusStatus: null,
  getScriptFilesStatus: null,
  runScriptStatus: null,
  stopScriptStatus: null,
  restartScriptStatus: null,
  removeScriptStatus: null,
  uploadScriptStatus: null,
};

const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    restartUploadScriptStatus: (state) => {
      state.uploadScriptStatus = null;
    },
    restartRemoveScriptStatus: (state) => {
      state.removeScriptStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllScriptsThunk.pending, (state) => {
        state.getAllScriptsStatus = "loading";
      })
      .addCase(getAllScriptsThunk.fulfilled, (state, { payload }) => {
        state.getAllScriptsStatus = "success";
        state.scripts = payload;
      })
      .addCase(getAllScriptsThunk.rejected, (state, { payload }) => {
        state.getAllScriptsStatus = "failed";
        console.error(payload);
      })

      .addCase(runScriptThunk.pending, (state) => {
        state.runScriptStatus = "loading";
      })
      .addCase(runScriptThunk.fulfilled, (state, { payload }) => {
        state.script = payload;
        if (!state.scripts) return;
        state.scripts = state.scripts.map((script) =>
          script.processKey === payload.processKey ? payload : script
        );
        state.runScriptStatus = "success";
      })
      .addCase(runScriptThunk.rejected, (state, { payload }) => {
        state.runScriptStatus = "failed";
        console.error(payload);
      })

      .addCase(stopScriptThunk.pending, (state) => {
        state.stopScriptStatus = "loading";
      })
      .addCase(stopScriptThunk.fulfilled, (state, { payload }) => {
        state.script = payload;
        if (!state.scripts) return;
        state.scripts = state.scripts.map((script) =>
          script.processKey === payload.processKey ? payload : script
        );
        state.stopScriptStatus = "success";
      })
      .addCase(stopScriptThunk.rejected, (state, { payload }) => {
        state.stopScriptStatus = "failed";
        console.error(payload);
      })

      .addCase(restartScriptThunk.pending, (state) => {
        state.restartScriptStatus = "loading";
      })
      .addCase(restartScriptThunk.fulfilled, (state, { payload }) => {
        state.script = payload;
        if (!state.scripts) return;
        state.scripts = state.scripts.map((script) =>
          script.processKey === payload.processKey ? payload : script
        );
        state.restartScriptStatus = "success";
      })
      .addCase(restartScriptThunk.rejected, (state, { payload }) => {
        state.restartScriptStatus = "failed";
        console.error(payload);
      })

      .addCase(removeScriptThunk.pending, (state) => {
        state.removeScriptStatus = "loading";
      })
      .addCase(removeScriptThunk.fulfilled, (state, { payload }) => {
        if (!state.scripts) return;
        state.scripts = state.scripts.filter(
          (script) => script.processKey !== payload.processKey
        );
        state.removeScriptStatus = "success";
      })
      .addCase(removeScriptThunk.rejected, (state, { payload }) => {
        state.removeScriptStatus = "failed";
        console.error(payload);
      })

      .addCase(uploadScriptThunk.pending, (state) => {
        state.uploadScriptStatus = "loading";
      })
      .addCase(uploadScriptThunk.fulfilled, (state) => {
        if (!state.scripts) return;
        state.uploadScriptStatus = "success";
      })
      .addCase(uploadScriptThunk.rejected, (state, { payload }) => {
        state.uploadScriptStatus = "failed";
        console.error(payload);
      })

      .addCase(getScriptThunk.pending, (state) => {
        state.getScriptStatus = "loading";
      })
      .addCase(getScriptThunk.fulfilled, (state, { payload }) => {
        state.script = payload;
        state.getScriptStatus = "success";
      })
      .addCase(getScriptThunk.rejected, (state, { payload }) => {
        state.getScriptStatus = "failed";
        console.error(payload);
      })

      .addCase(getScriptLogsThunk.pending, (state) => {
        state.getScriptLogsStatus = "loading";
      })
      .addCase(getScriptLogsThunk.fulfilled, (state, { payload }) => {
        state.scriptLogs = payload;
        state.getScriptLogsStatus = "success";
      })
      .addCase(getScriptLogsThunk.rejected, (state, { payload }) => {
        state.getScriptLogsStatus = "failed";
        console.error(payload);
      });
  },
});

export const { restartUploadScriptStatus, restartRemoveScriptStatus } =
  scriptSlice.actions;

export default scriptSlice.reducer;
