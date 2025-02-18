import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUserThunk } from "@/redux/thunk/userThunk";
import { resetAddUserStatus } from "@/redux/slice/userSlice";

const AddUserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    firstname: "",
    surname: "",
    email: "",
    enabled: true,
    emailVerified: false,
  });

  const addUserStatus = useAppSelector((state) => state.user.addUserStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData.username || !userData.email) {
      toast.error("Username and Email are required.");
      return;
    }

    dispatch(addUserThunk(userData));
  };

  useEffect(() => {
    if(addUserStatus === "success"){
      dispatch(resetAddUserStatus())
      navigate("/users")
    }
  }, [addUserStatus])

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Add User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={userData.fullname}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={userData.firstname}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="surname"
          placeholder="Surname"
          value={userData.surname}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enabled"
              checked={userData.enabled}
              onChange={handleChange}
            />
            <span>Enabled</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="emailVerified"
              checked={userData.emailVerified}
              onChange={handleChange}
            />
            <span>Email Verified</span>
          </label>
        </div>
        <Button className="w-full" type="submit" disabled={addUserStatus === "loading"}>
          {addUserStatus === "loading" ? "Adding..." : "Add User"}
        </Button>
      </form>
    </div>
  );
};

export default AddUserPage;
