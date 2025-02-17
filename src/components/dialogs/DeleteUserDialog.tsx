import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone. Are you sure?</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            No
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
