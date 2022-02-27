import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./sessionLinkPage.css";

function SessionLinkPage() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="back-btn">
            <h2 className="back-heading">Back</h2>
       </div>
      <div className="box">
      <h1 className="heading">Session Link</h1>
        <title>Enter your Name</title>
        <TextField id="outlined-basic" label="Session Link" />
      </div>
      <div className="start-btn">
            <h2 className="start-heading">Start Session</h2>
       </div>
    </Box>
  );
}

export default SessionLinkPage;