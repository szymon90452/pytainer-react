import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  interface RequestChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  const RequestChangePasswordDialog: React.FC<RequestChangePasswordDialogProps> = ({
    open,
    onClose,
    onConfirm,
  }) => {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Password Change</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to request a password change for this user?</p>
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
  
  export default RequestChangePasswordDialog;