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


const StickyNoteGrid = ({ notes, handleShowEditTodo, onDelete }) => {
  return (
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
    >
      {notes.map((note, index) => ( 
        <StickyNote
          key={note.id}
          id={note.id}
          title={note.title}
          description={note.description}
          tag={note.tag}
          favourite={note.favourite}
          
          handleShowEditTodo={() => handleShowEditTodo(note)}
          onDelete={() => onDelete(note)}
        />
      ))}
    </Masonry>
  )
}

export default StickyNoteGrid
