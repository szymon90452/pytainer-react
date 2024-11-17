import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  MoreHorizontal,
  Play,
  Square,
  RefreshCw,
  // Trash2,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getAllScriptsThunk,
  runScriptThunk,
  stopScriptThunk,
} from "@/redux/thunk/scriptsThunk";
import clsx from "clsx";
import { ScriptStatus } from "@/types/IScript";
import { formatDateTime } from "@/functions/formatDateTime";

const ScriptsPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const scripts = useAppSelector((state) => state.scripts.scripts);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(getAllScriptsThunk());
  }, []);

  const filteredScripts =
    scripts &&
    scripts.filter((script) =>
      script.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Scripts</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search by name"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/scripts/add")} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add script
          </Button>
          {/* <Button variant="outline">Start</Button>
          <Button variant="outline">Stop</Button>
          <Button variant="outline">Kill</Button>
          <Button variant="outline">Restart</Button>
          <Button variant="outline">Remove</Button> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-12">
                <Checkbox />
              </TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Last Execution</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredScripts &&
              filteredScripts.map((script) => (
                <TableRow key={script.processKey}>
                  {/* <TableCell>
                    <Checkbox />
                  </TableCell> */}
                  <TableCell>
                    <div>{script.name}</div>
                    <div className="text-sm text-gray-500">
                      {script.filePath}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={clsx(
                        "inline-block px-2 py-1 rounded-full text-xs",
                        {
                          "bg-gray-100 text-gray-800":
                            script.status === ScriptStatus.NOT_STARTED,
                          "bg-green-100 text-green-800":
                            script.status === ScriptStatus.RUNNING,
                          "bg-red-100 text-red-800":
                            script.status === ScriptStatus.FAILED,
                          "bg-yellow-100 text-yellow-800":
                            script.status === ScriptStatus.STOPPED,
                        }
                      )}>
                      {script.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDateTime(script.lastExecutionTime)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            dispatch(runScriptThunk(script.processKey));
                          }}>
                          <Play className="mr-2 h-4 w-4" />
                          <span>Start</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            dispatch(stopScriptThunk(script.processKey));
                          }}>
                          <Square className="mr-2 h-4 w-4" />
                          <span>Stop</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            dispatch(stopScriptThunk(script.processKey));
                            setTimeout(() => {
                              dispatch(runScriptThunk(script.processKey));
                            }, 1000);
                          }}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>Restart</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Remove</span>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScriptsPage;
