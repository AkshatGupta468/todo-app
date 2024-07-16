import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";

function NoteForm({ formTitle, formButtonLabel, onSubmit, onClose, initTodo }) {
  const [title, setTitle] = useState(initTodo.title || "");
  const [description, setDescription] = useState(initTodo.description || "");
  const [tag, setTag] = useState(initTodo.tag || "Pending");
  const [isFavourite, setIsFavourite] = useState(initTodo.favourite || false);
  const [btnEnabled, setBtnEnabled] = useState(true);

  const navigate = useNavigate();

  const handleButtonEvent = async (e) => {
    e.preventDefault();
    setBtnEnabled(false);
    onSubmit(title, description, tag, isFavourite);
    setTitle("");
    setDescription("");
    setTag("Pending");
    setIsFavourite(false);
    setBtnEnabled(true);
    navigate(-1);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formTitle}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleButtonEvent}>
              <div className="mb-3">
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  fullWidth
                />
              </div>
              <div className="mb-3">
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A short description here"
                  multiline
                  rows={4}
                  fullWidth
                />
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="tag-label">Tag</InputLabel>
                  <Select
                    labelId="tag-label"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    label="Tag"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In-Progress">In-Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFavourite}
                      onChange={(e) => setIsFavourite(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="favourite"
                />
              </div>
              <Button disabled={!btnEnabled} type="submit" variant="contained" color="primary">
                {formButtonLabel}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;
