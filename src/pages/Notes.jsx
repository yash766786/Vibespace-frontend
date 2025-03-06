import React, { useEffect, useState } from "react";
import { NoteItem } from "../index.js";
import { useNote } from "../context/NoteState.jsx";
import { useAlert } from "../context/AlertState.jsx";
import { Link } from "react-router-dom";

function Notes() {
  const { showAlert } = useAlert();
  const { notes, fetchAllNote, updateNote } = useNote();

  const [isNoteLoaded, setIsNoteLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    _id: "",
    title: "",
    description: "",
    theme: "black", // Default theme
  });

  useEffect(() => {
    async function onLoading() {
      await fetchAllNote();
      setIsNoteLoaded(true);
      const a = notes.length;
      // console.log(a);
    }

    onLoading();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await updateNote(
      currentNote._id,
      currentNote.title,
      currentNote.description,
      currentNote.theme
    );

    if (response.success) {
      showAlert(response.message, "success");
    } else {
      showAlert(response.message, "danger");
    }

    setIsLoading(false);
    setIsModalOpen(false);
    setCurrentNote({
      title: "",
      description: "",
      theme: "",
    });
  };

  return (
    <>
      <div className="min-h-[400px]">
        <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4 text-center">
          Your Notes
        </h1>

        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl text-gray-500 mb-4">No notes to show</p>
            <button className="btn btn-primary">
              <Link to="/create-note">Add a New Note</Link>
            </button>
          </div>
        )}

        {isModalOpen && (
          <div className="z-10 fixed inset-0 flex items-center justify-center bg-opacity-100 w-full">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-[90vw] lg:w-[75vw]">
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4 text-center">
                Edit Note
              </h2>

              <form>
                <div className="mb-0">
                  <textarea
                    type="text"
                    className="textarea textarea-bordered h-auto lg:h-16 w-full text-xl lg:text-[20px]"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={currentNote.title}
                    onChange={(e) =>
                      setCurrentNote({ ...currentNote, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-0">
                  <textarea
                    type="text"
                    className="textarea textarea-bordered h-[50vh] lg:h-[57vh] w-full text-[15px] lg:text-[20px]"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={currentNote.description}
                    onChange={(e) =>
                      setCurrentNote({
                        ...currentNote,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Theme Selection */}
                <div className="mb-4">
                  <label className="block font-medium text-lg mb-2">
                    Select Theme:
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "#1B1A55",
                      "#181C14",
                      "#092635",
                      "#183D3D",
                      "#3C2A21",
                      "#2D033B",
                      "#00005C",
                      "#000000",
                    ].map((color) => (
                      <label
                        key={color}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="theme"
                          value={color}
                          checked={currentNote.theme === color}
                          onChange={(e) =>
                            setCurrentNote({
                              ...currentNote,
                              theme: e.target.value,
                            })
                          }
                          className="hidden" // Hide the default radio button
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 ${
                            currentNote.theme === color
                              ? "border-white"
                              : "border-gray-900"
                          }`}
                          style={{ backgroundColor: color }} // Set the circle's background color
                        ></div>
                        {/* <span className="capitalize text-sm text-gray-300">{color}</span> */}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  {isLoading ? (
                    <button
                      type="button"
                      className="btn btn-primary px-4 py-2 rounded text-base"
                      onClick={handleUpdateNote}
                      disabled
                    >
                      <span className="loading loading-dots loading-md"></span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary px-4 py-2 rounded text-base"
                      onClick={handleUpdateNote}
                    >
                      Update
                    </button>
                  )}

                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {!isNoteLoaded && (
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        )}

        <div className="flex flex-wrap justify-center">
          {Array.isArray(notes) &&
            notes.map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  note={note}
                  editNote={() => handleEditClick(note)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Notes;
