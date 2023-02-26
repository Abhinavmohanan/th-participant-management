import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function TeamMembersModal({ open, isSuggestion, handleClose, teamName, idea }) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: "1rem",
          padding: "1rem",
        },
      }}
      BackdropProps={{
        style: {
          opacity: 0.5,
        },
      }}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: "center",
        }}
      >
        <b>{teamName}</b> {isSuggestion ? "Suggestions" : "Idea"}
      </DialogTitle>
      <DialogContent sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
        <div
          style={{
            display: "flex",
            height: "100%",
            flexGrow: 1,
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <h3
              style={{
                textAlign: "center",
              }}
            >
              {idea}
            </h3>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TeamMembersModal;
