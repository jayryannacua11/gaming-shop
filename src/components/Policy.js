import * as React from 'react';
import '../App.css'
import { useState } from 'react';
import {Box, Button, Typography, Modal, Checkbox} from '@mui/material'

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px 50px',
    p: 4,
  };

export default function Policy() {
  //const [open, setOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Checkbox required/>
      <div className="policy" style={{display: 'inline'}}>I have read and accept the</div>
        <a
          className="ps-1" 
          style={{fontWeight: '900', color: 'red', textDecoration: 'underline'}}  
          onClick={handleOpen}>
              Nacs Gaming Policy
        </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="lobster" variant="h4" component="h2">
            Rules & Policy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            1. There is no such thing. I just want to experiment a Modal.
          </Typography>
          <Typography id="modal-modal-description">
            2. Thank you for your interest though
          </Typography>
          <Typography id="modal-modal-description">
            3. Have a great day!
          </Typography>
          <Button 
            className="mt-4"
            style={{fontWeight: 'bold', float: 'right', border: 'solid'}} 
            variant="outlined" color="error" 
            onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}