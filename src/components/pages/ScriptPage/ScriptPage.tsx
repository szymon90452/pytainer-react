import { useState } from 'react'
import { Play, Square, RefreshCw, Trash2, Terminal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const containerData = {
    id: '1a2b3c4d5e6f',
    name: 'awesome_einstein',
    state: 'running',
    status: 'Up 2 days',
    image: 'nginx:latest',
    created: '2023-05-15 10:30:45',
    ports: '80/tcp -> 0.0.0.0:8080',
    network: 'bridge',
    ipAddress: '172.17.0.2',
    cpu: '0.05%',
    memory: '2.1 MiB / 2 GiB',
    networkIO: '648B / 648B'
}


const ScriptPage = () => {
    const [logs, setLogs] = useState("2023-05-17 15:30:22 [notice] 1#1: using the \"epoll\" event method\n2023-05-17 15:30:22 [notice] 1#1: nginx/1.21.0\n2023-05-17 15:30:22 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6) \n2023-05-17 15:30:22 [notice] 1#1: OS: Linux 5.10.104-linuxkit\n2023-05-17 15:30:22 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576\n2023-05-17 15:30:22 [notice] 1#1: start worker processes")
    const [command, setCommand] = useState('')

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold">{containerData.name}</h1>
                    <p className="text-sm text-gray-500">ID: {containerData.id}</p>
                </div>
                <Badge variant={containerData.state === 'running' ? 'success' : 'destructive'}>
                    {containerData.state}
                </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <Button><Play className="mr-2 h-4 w-4" /> Start</Button>
                <Button><Square className="mr-2 h-4 w-4" /> Stop</Button>
                <Button><RefreshCw className="mr-2 h-4 w-4" /> Restart</Button>
                <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Container Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-1 gap-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="font-medium">Image:</dt>
                                <dd>{containerData.image}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="font-medium">Created:</dt>
                                <dd>{containerData.created}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="font-medium">Ports:</dt>
                                <dd>{containerData.ports}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="font-medium">Network:</dt>
                                <dd>{containerData.network}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="font-medium">IP Address:</dt>
                                <dd>{containerData.ipAddress}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Resource Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-1 gap-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="font-medium">CPU Usage:</dt>
                                <dd>{containerData.cpu}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="font-medium">Memory Usage:</dt>
                                <dd>{containerData.memory}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="font-medium">Network I/O:</dt>
                                <dd>{containerData.networkIO}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="logs" className="w-full">
                <TabsList>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                    <TabsTrigger value="console">Console</TabsTrigger>
                </TabsList>
                <TabsContent value="logs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Container Logs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                                {logs}
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
                                <p className="text-sm text-gray-600">Command output will appear here...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ScriptPage