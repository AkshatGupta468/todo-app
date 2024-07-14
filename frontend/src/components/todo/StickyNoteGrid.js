import React from "react"
import StickyNote from "./StickyNote"
import Masonry from "react-masonry-css"
import "./StickyNoteGrid.css"

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};


const StickyNoteGrid = ({ notes, onEdit, onDelete }) => {
  return (
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
    >
      {notes.map((note, index) => (
        <StickyNote
          key={note.id}
          tag={note.tag}
          title={note.title}
          description={note.description}
          onEdit={() => onEdit(note.id)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </Masonry>
  )
}

export default StickyNoteGrid
