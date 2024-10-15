import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MoreHorizontal, Play, Square, RefreshCw, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Mock data for containers
const containers = [
    { id: '1', name: 'nginx', image: 'nginx:latest', state: 'running', status: 'Up 2 days', cpu: '0.00%', memory: '2.1 MiB / 2 GiB' },
    { id: '2', name: 'mongodb', image: 'mongo:4.4', state: 'stopped', status: 'Exited (0) 1 hour ago', cpu: '0.00%', memory: '0 B / 1 GiB' },
    { id: '3', name: 'redis', image: 'redis:alpine', state: 'running', status: 'Up 5 hours', cpu: '0.12%', memory: '1.8 MiB / 512 MiB' },
]

const ScriptsPage = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('')

    const filteredContainers = containers.filter(container =>
        container.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Scripts</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        type="text"
                        placeholder="Search by name"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/scripts/add')} variant="outline">Add script</Button>
                    <Button variant="outline">Start</Button>
                    <Button variant="outline">Stop</Button>
                    <Button variant="outline">Kill</Button>
                    <Button variant="outline">Restart</Button>
                    <Button variant="outline">Remove</Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"><Checkbox /></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>CPU Usage</TableHead>
                            <TableHead>Memory Usage</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredContainers.map((container) => (
                            <TableRow key={container.id}>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell>
                                    <div>{container.name}</div>
                                    <div className="text-sm text-gray-500">{container.image}</div>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${container.state === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {container.state}
                                    </span>
                                </TableCell>
                                <TableCell>{container.status}</TableCell>
                                <TableCell>{container.cpu}</TableCell>
                                <TableCell>{container.memory}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Play className="mr-2 h-4 w-4" />
                                                <span>Start</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Square className="mr-2 h-4 w-4" />
                                                <span>Stop</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                <span>Restart</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Remove</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ScriptsPage