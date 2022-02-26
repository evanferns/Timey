import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function SessionInputPage() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <title>Enter your Name</title>
        <TextField id="outlined-basic" label="Name" />
      </div>
      <div>
        <title>Total Session Time</title>
        <TextField id="outlined-basic" />
      </div>
      <div>
        <title>Number of Sessions</title>
        <TextField id="outlined-basic" />
      </div>
    </Box>
  );
}

export default SessionInputPage;
