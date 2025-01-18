import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

const CustomMenu = ({ handleClose, msg }) => {
  useEffect(() => {
    console.log("hello " + msg); // This will log the message passed as prop
  }, [msg]);

  return (
    <>
      <MenuItem
        onClick={handleClose} // Don't invoke handleClose immediately
        style={{
          fontSize: '16px',
          color: '#ffffff',
          padding: '10px 20px',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#6a1b9a')} // Dark purple on hover
        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
      >
        {msg}
      </MenuItem>
      <Divider style={{ backgroundColor: '#4a4a6a' }} />
    </>
  );
};

export default CustomMenu;
