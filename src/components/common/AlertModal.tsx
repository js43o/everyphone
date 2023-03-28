import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export default function AlertModal(props: {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}) {
  const { open, title, description, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby={`alert-dialog-${title}`}
      aria-describedby={`alert-dialog-${description}`}
    >
      <DialogTitle id={`alert-dialog-${title}`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-${description}`}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
