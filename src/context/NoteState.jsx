import { createContext, useContext, useState } from "react";
import conf from "../conf/conf";

// Create NoteContext
const NoteContext = createContext();

// useNote Hook: To easily access the NoteContext
export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchAllNote = async ()=>{
    try {
      const response = await fetch(`${conf.serverUrl}/notes/`, {
          method: "GET",
          credentials: 'include',  // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if(data?.success){
        setNotes(data.data);
      }
      return data;

    } 
    catch(error){
      // console.log("Error...", error)
    }
  };


  const addNote = async (title, description, theme = "black") => {
    // console.log({title, description, theme})
    try {
      const response = await fetch(`${conf.serverUrl}/notes/`, {
          method: "POST",
          credentials: 'include',  // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  title, description, theme }),
        }
      );

      const data = await response.json();

      if(data.success){
        setNotes(notes.concat(data.data));
      }
      return data;

    } 
    catch(error){
      // console.log("Error...", error)
    }
  };


  const updateNote = async (noteId, title, description, theme = "black") => {
    // console.log({title, description, theme})
    try {
      const response = await fetch(`${conf.serverUrl}/notes/${noteId}`, {
          method: "PUT",
          credentials: 'include',  // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, theme }),
        }
      );

      const data = await response.json();

      if(data.success){
      const updatedNotes = notes.map(note => 
        note._id === noteId ? { ...note, title, description, theme }  : note
      );
      
      setNotes(updatedNotes);
      }
      return data;
      
    } 
    catch(error){
      // console.log("Error...", error)
    }
  };


  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${conf.serverUrl}/notes/${noteId}`, {
          method: "DELETE",
          credentials: 'include',  // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if(data.success){
        const newNote = notes.filter((note) => {
          return note._id !== noteId;
        });

        setNotes(newNote);
      }
      return data;

    } 
    catch(error){
      // console.log("Error...", error)
    }
  };


  return (
    <NoteContext.Provider
      value={{ 
        fetchAllNote, 
        addNote, 
        updateNote, 
        deleteNote, 
        notes
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

