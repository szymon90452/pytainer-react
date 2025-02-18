import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateUserThunk } from "@/redux/thunk/userThunk";

interface IUpdateUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    username: string;
    firstname: string;
    surname: string;
    email: string;
  };
}

const UpdateUserDialog: React.FC<IUpdateUserDialogProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await dispatch(updateUserThunk(formData));
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
