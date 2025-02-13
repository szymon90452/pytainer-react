/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useRedux";

const UsersPage = () => {
  const initialUsers = useAppSelector((state) => state.user.users);

  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    fullName: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const filtered = users.filter(
      (user: any) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.success("User has been deleted!");
    }
    setDeleteOpen(false);
  };

  const handleEditClick = (user: any) => {
    setFormData({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      password: "",
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    setFormData({
      id: null,
      fullName: "",
      username: "",
      password: "",
    });
    setOpen(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.id) {
      setUsers(
        users.map((user) =>
          user.id === formData.id ? { ...user, ...formData } : user
        )
      );
      toast.success("User has been updated!");
    } else {
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
      };
      setUsers([...users, newUser]);
      toast.success("User has been added!");
    }
    setOpen(false);
  };

  useEffect(() => {
    const sorted = [...filteredUsers].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sorted);
  }, [sortColumn, sortDirection]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
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
        <Button variant="outline" onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add user
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("fullName")}>
                Full name{" "}
                {sortColumn === "fullName" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("username")}>
                Username{" "}
                {sortColumn === "username" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditClick(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(user)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {formData.id ? "Edit user" : "Add new user"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Full Name</Label>
            <Input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />

            <Label>Username</Label>
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              placeholder={formData.id ? "********" : ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={formData.id ? false : true}
            />

            <Button type="submit" className="w-full">
              {formData.id ? "Update User" : "Add User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this user?
            </DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. Are you sure?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              No
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
