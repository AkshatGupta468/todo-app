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

const colors = ["#4285F4", "#34A853", "#FBBC05", "#EA4335", "#FF5722", "#9C27B0", "#00BCD4", "#8BC34A"];

function getRandomCardColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const StickyNote = ({ title, description, tag, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cardColor = getRandomCardColor();

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 2,
        boxShadow: 3,
        borderRadius: 2, // Curved edges
        backgroundColor: cardColor,
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start", // Align items to the start for menu button to be on the top right corner
          }}
        >
          <div>
            <Typography variant="h5" component="div">
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
            onClick={handleClick}
            sx={{ alignSelf: 'flex-start' }} // Align the button to the top
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={onEdit}>Edit</MenuItem>
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
