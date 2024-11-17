export enum ScriptStatus {
  NOT_STARTED = "NOT_STARTED",
  RUNNING = "RUNNING",
  FAILED = "FAILED",
  STOPPED = "STOPPED",
}
export interface IScript {
  processKey: string;
  name: string;
  filePath: string;
  status: ScriptStatus;
  lastExecutionTime: string | null;
}
