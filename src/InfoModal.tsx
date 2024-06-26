import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import info from './assets/info.png';
import example from './assets/example.png';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const InfoModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <img src={info} alt="info" onClick={handleOpen} />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Příprava dat v EXCELu</strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              <li>
                Excel <strong>nesmí obsahovat</strong> více jak <strong>500 řádků</strong>.
              </li>
              <li>
                Excel <strong>musí obsahovat</strong> pouze jeden sešit se dvěma sloupci ( <strong>"IČ"</strong> a <strong>"Subjekt"</strong>):
              </li>
            </ul>
          </Typography>
          <br />
          <img src={example} alt="example" />
        </Box>
      </Modal>
    </div>
  );
};
