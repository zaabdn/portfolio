import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmationDeleteProps {
  isVisible: boolean;
  onClick: () => void;
  onClose: () => void;
}

const ConfirmationDelete = ({
  isVisible,
  onClick,
  onClose,
}: ConfirmationDeleteProps) => {
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Are you sure would like to delete this record from the database?
            This action can't be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700"
            onClick={onClick}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDelete;
