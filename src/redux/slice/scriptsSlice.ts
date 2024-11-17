import { createSlice } from "@reduxjs/toolkit";

import { TStatus } from "@/types/TStatus";
import { IScript } from "@/types/IScript";
import {
  getAllScriptsThunk,
  runScriptThunk,
  stopScriptThunk,
} from "../thunk/scriptsThunk";

interface ScriptState {
  script?: IScript;
  scripts?: IScript[];
  getAllScriptsStatus: TStatus;
  getScript: TStatus;
  getScriptLogsStatus: TStatus;
  getScriptStatusStatus: TStatus;
  getScriptFilesStatus: TStatus;
  runScriptStatus: TStatus;
  stopScriptStatus: TStatus;
  uploadScriptStatus: TStatus;
}

const initialState: ScriptState = {
  script: undefined,
  scripts: undefined,
  getAllScriptsStatus: null,
  getScript: null,
  getScriptLogsStatus: null,
  getScriptStatusStatus: null,
  getScriptFilesStatus: null,
  runScriptStatus: null,
  stopScriptStatus: null,
  uploadScriptStatus: null,
};

const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {},
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
        if (!state.scripts) return;
        state.scripts = state.scripts.map((script) =>
          script.processKey === payload.processKey ? payload : script
        );
        state.stopScriptStatus = "success";
      })
      .addCase(stopScriptThunk.rejected, (state, { payload }) => {
        state.stopScriptStatus = "failed";
        console.error(payload);
      });
  },
});

export default scriptSlice.reducer;
