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
          fontSize: "1.5rem",
        }}
      >
        <b>{teamName}</b> {isSuggestion ? "Suggestions" : "Idea"}
      </DialogTitle>
      <DialogContent sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            wordBreak: "break-word",
            height: "100%",
            flexGrow: 1,
            textAlign: "justify",
            whiteSpace: "pre-wrap",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          {idea}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TeamMembersModal;
