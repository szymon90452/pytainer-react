import { useState, useEffect } from 'react'
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const initialUsers = [
    { id: 1, username: 'admin', role: 'administrator', authMethod: 'internal' },
    { id: 2, username: 'user1', role: 'user', authMethod: 'ldap' },
    { id: 3, username: 'user2', role: 'user', authMethod: 'internal' },
    { id: 4, username: 'manager1', role: 'manager', authMethod: 'oauth' },
]

const UsersPage = () => {
    const [users, setUsers] = useState(initialUsers)
    const [filteredUsers, setFilteredUsers] = useState(initialUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState('username')
    const [sortDirection, setSortDirection] = useState('asc')

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.authMethod.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [searchTerm, users])

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    useEffect(() => {
        const sorted = [...filteredUsers].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
        setFilteredUsers(sorted)
    }, [sortColumn, sortDirection])

    const handleAddUser = (newUser) => {
        setUsers([...users, { id: users.length + 1, ...newUser }])
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-[300px]"
                    />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add user</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new user</DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"><Checkbox /></TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('username')}>Username {sortColumn === 'username' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('role')}>Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('authMethod')}>Auth method {sortColumn === 'authMethod' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.authMethod}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default UsersPage