
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const RightDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <p>Some contents...</p>
      </Drawer>
    </>

  )
}

export default RightDrawer