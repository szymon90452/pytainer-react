import { useEffect, useState } from "react";
import clsx from "clsx";
import { Play, Square, RefreshCw, Trash2, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getScriptLogsThunk,
  getScriptThunk,
  getStaticScriptLogsThunk,
  removeScriptThunk,
  runScriptThunk,
  stopScriptThunk,
} from "@/redux/thunk/scriptsThunk";
import { useNavigate, useParams } from "react-router-dom";
import { ScriptStatus } from "@/types/IScript";
import { formatDateTime } from "@/functions/formatDateTime";
import { restartRemoveScriptStatus } from "@/redux/slice/scriptsSlice";

const ScriptPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [command, setCommand] = useState("");

  const { script, getScriptStatus, scriptLogs, removeScriptStatus } =
    useAppSelector((state) => state.scripts);

  useEffect(() => {
    if (id) {
      dispatch(getScriptThunk(id));
    }
  }, []);

  useEffect(() => {
    if (script) {
      if (script.status === ScriptStatus.RUNNING) {
        dispatch(getScriptLogsThunk({ processKey: script.processKey }));
      } else {
        dispatch(getStaticScriptLogsThunk({ processKey: script.processKey }));
      }
    }
  }, [dispatch, script]);

  useEffect(() => {
    if (removeScriptStatus === "success") {
      dispatch(restartRemoveScriptStatus());
      navigate("/scripts");
    }
  }, [dispatch, removeScriptStatus, navigate]);

  if (!script && getScriptStatus === "loading") {
    return "Loading";
  }

  if (!script) {
    return "Something went wrong!";
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{script.name}</h1>
          <p className="text-sm text-gray-500">ID: {script.processKey}</p>
        </div>
        <span
          className={clsx("inline-block px-2 py-1 rounded-full text-xs", {
            "bg-gray-100 text-gray-800":
              script.status === ScriptStatus.NOT_STARTED,
            "bg-green-100 text-green-800":
              script.status === ScriptStatus.RUNNING,
            "bg-red-100 text-red-800": script.status === ScriptStatus.FAILED,
            "bg-yellow-100 text-yellow-800":
              script.status === ScriptStatus.STOPPED,
          })}>
          {script.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          onClick={() => {
            dispatch(runScriptThunk(script.processKey));
          }}>
          <Play className="mr-2 h-4 w-4" /> Start
        </Button>
        <Button
          onClick={() => {
            dispatch(stopScriptThunk(script.processKey));
          }}>
          <Square className="mr-2 h-4 w-4" /> Stop
        </Button>
        <Button
          onClick={() => {
            dispatch(stopScriptThunk(script.processKey));
            setTimeout(() => {
              dispatch(runScriptThunk(script.processKey));
            }, 1000);
          }}>
          <RefreshCw className="mr-2 h-4 w-4" /> Restart
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            dispatch(removeScriptThunk(script.processKey));
          }}>
          <Trash2 className="mr-2 h-4 w-4" /> Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Script Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-2 text-sm overflow-hidden">
              <div className="flex justify-between">
                <dt className="font-medium">Name:</dt>
                <dd>{script.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">File Path:</dt>
                <dd className="text-clip">{script.filePath}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Process Key:</dt>
                <dd>{script.processKey}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Last Execution:</dt>
                <dd>{formatDateTime(script.lastExecutionTime)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Status:</dt>
                <dd>{script.status}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium">CPU Usage:</dt>
                <dd>...</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Memory Usage:</dt>
                <dd>...</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Network I/O:</dt>
                <dd>...</dd>
              </div>
            </dl>
          </CardContent>
        </Card> */}
      </div>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger disabled value="console">
            Console
          </TabsTrigger>
        </TabsList>
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Script Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap max-h-60 overflow-auto">
                {scriptLogs && scriptLogs}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="console">
          <Card>
            <CardHeader>
              <CardTitle>Console</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Label htmlFor="command" className="sr-only">
                  Command
                </Label>
                <Input
                  id="command"
                  placeholder="Enter command..."
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                />
                <Button type="submit">
                  <Terminal className="mr-2 h-4 w-4" />
                  Execute
                </Button>
              </div>
              <div className="mt-4 bg-gray-100 p-4 rounded-md h-40 overflow-y-auto">
                <p className="text-sm text-gray-600">
                  Command output will appear here...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScriptPage;
