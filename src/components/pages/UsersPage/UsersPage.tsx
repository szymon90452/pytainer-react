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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteUserThunk, getUsersThunk } from "@/redux/thunk/userThunk";
import { useNavigate } from "react-router-dom";
import DeleteUserDialog from "@/components/dialogs/DeleteUserDialog";
import UpdateUserDialog from "@/components/dialogs/UpdateUserDialog";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {users, deleteUserStatus} = useAppSelector((state) => state.user);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  useEffect(() => {
    const filtered = users.filter(
      (user: any) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleUpdateClick = (user: any) => {
    setSelectedUser(user);
    setUpdateOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUserThunk(selectedUser.id))
    }
    setDeleteOpen(false);
  };

  useEffect(() => {
    if(deleteUserStatus === "success"){
      dispatch(getUsersThunk());
    }
  }, [deleteUserStatus])

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
              <TableHead>Email address</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers
            .filter((user: any) => user.username !== "frontend")
            .map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleUpdateClick(user)}>
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
        onConfirm={confirmDelete}
      />

      <UpdateUserDialog
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersPage;
