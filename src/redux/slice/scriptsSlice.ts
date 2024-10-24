import { createSlice } from "@reduxjs/toolkit";

import { TStatus } from "@/types/TStatus";

interface ScriptState {
    script: any;
    scripts: any;
    getScriptsStatus: TStatus;
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
    getScriptsStatus: null,
    getScript: null,
    getScriptLogsStatus: null,
    getScriptStatusStatus: null,
    getScriptFilesStatus: null,
    runScriptStatus: null,
    stopScriptStatus: null,
    uploadScriptStatus: null,
};

const userSlice = createSlice({
    name: "script",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});

// export const {  } = userSlice.actions;

export default userSlice.reducer;