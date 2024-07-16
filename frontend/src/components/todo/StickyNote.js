import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PinIcon from "@mui/icons-material/PushPin";
import axios from "axios";

const colors = ["#DADADA", "#FFCC80", "#B39DDB", "#81C784", "#FFAB91", "#90CAF9", "#C5E1A5", "#F48FB1"];

function getRandomCardColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const StickyNote = ({ id, title, description, tag, favourite, handleShowEditTodo, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  function onToggleFavourite() {
    try{
      axios.put(`http://localhost:3001/api/todo/${id}`,
        {id,title,description,tag,favourite:!favourite},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error: something happened');
      }
      return;
    }
  }
  const handleToggleFavourite = () => {
    onToggleFavourite(); // Call parent function to toggle favourite status
    handleCloseMenu(); // Close the menu after toggling
  };

  const cardColor = getRandomCardColor();

  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 200, // Adjusted minimum height
        margin: 2,
        boxShadow: 3,
        borderRadius: 5, // Curved edges
        backgroundColor: cardColor,
        position: "relative", // To position the pin icon
      }}
    >
      {favourite && (
        <IconButton
          aria-label="favourite"
          onClick={onToggleFavourite}
          size="small"
          sx={{
            position: "absolute",
            bottom: "2%",
            left: "2%",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <PinIcon color="primary" />
        </IconButton>
      )}
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start", // Align items to the start for menu button to be on the top right corner
          }}
        >
          <div>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {tag}
            </Typography>
          </div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleShowMenu}
            sx={{ alignSelf: "flex-start" }} // Align the button to the top
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleToggleFavourite}>
              {favourite ? "Remove Favourite" : "Add to Favourites"}
            </MenuItem>
            <MenuItem onClick={handleShowEditTodo}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <Divider sx={{ backgroundColor: getComplementaryColor(cardColor), margin: '10px 0' }} />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

// Function to get a complementary color
function getComplementaryColor(color) {
  // Convert hex color to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate complementary color
  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  // Convert RGB back to hex
  return `#${((1 << 24) + (compR << 16) + (compG << 8) + compB).toString(16).slice(1)}`;
}

export default StickyNote;
