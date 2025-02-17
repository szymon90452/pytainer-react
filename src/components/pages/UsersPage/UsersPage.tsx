/* eslint-disable react-hooks/rules-of-hooks */
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
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getUsersThunk } from "@/redux/thunk/userThunk";
import { useNavigate } from "react-router-dom";
import DeleteUserDialog from "@/components/dialogs/DeleteUserDialog";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector((state) => state.user.users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
      // setUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.success("User has been deleted!");
    }
    setDeleteOpen(false);
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

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

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
        <Button variant="outline" onClick={() => navigate("/users/add")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add user
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => {}}>
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

      <DeleteUserDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false);
        }}
      />
    </div>
  );
};

export default UsersPage;
