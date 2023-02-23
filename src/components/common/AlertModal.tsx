import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export default function AlertModal(props: {
  open: boolean;
  title: string;
  description: string;
}) {
  const { open, title, description } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby={`alert-dialog-${title}`}
      aria-describedby={`alert-dialog-${description}`}
    >
      <DialogTitle id={`alert-dialog-${title}`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-${description}`}>
          {description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
