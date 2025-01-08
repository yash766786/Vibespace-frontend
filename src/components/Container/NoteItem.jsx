import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNote } from "../../context/NoteState.jsx";
import { useAlert } from "../../context/AlertState.jsx";

function NoteItem({ note, editNote }) {
  const { showAlert } = useAlert();
  const { deleteNote } = useNote();

  const handleDelete = async (note) => {
    const res = await deleteNote(note._id);
    if (res.success) {
      showAlert(res.message, "success");
    } else {
      showAlert(res.message, "danger");
    }
  };

  return (
    <div
      className="card shadow-lg w-full md:w-2/5 m-4 rounded-lg text-white"
      style={{
        backgroundColor: note.theme, // Apply theme as the background color
        // color: note.theme === "#000000" || note.theme === "#1B1A55" ? "#ffffff" : "#000000", // Adjust text color based on background
      }}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-xl font-semibold">{note.title}</h3>
          <div className="flex space-x-3 text-2xl cursor-pointer">
            {/* Edit Icon */}
            <div className="tooltip" data-tip="Edit">
              <BiSolidEdit
                onClick={() => {
                  editNote(note);
                }}
                className="hover:scale-110 transition-transform"
                style={{ color: "#4CAF50" }} // Green for edit
              />
            </div>

            {/* Delete Icon */}
            <div className="tooltip" data-tip="Delete">
              <MdDeleteForever
                onClick={() => {
                  handleDelete(note);
                }}
                className="hover:scale-110 transition-transform"
                style={{ color: "#F44336" }} // Red for delete
              />
            </div>
          </div>
        </div>
        <p className="card-text text-base mt-2">{note.description}</p>
      </div>
    </div>
  );
}

export default NoteItem;


// import React from "react";
// import { BiSolidEdit } from "react-icons/bi";
// import { MdDeleteForever } from "react-icons/md";
// import { useNote } from "../../context/NoteState.jsx";
// import { useAlert } from "../../context/AlertState.jsx";

// function NoteItem({ note, editNote }) {
//   const { showAlert } = useAlert();
//   const { deleteNote } = useNote();

//   const handleDelete = async (note) => {
//     const res = await deleteNote(note._id);
//     if (res.success) {
//       showAlert(res.message, "success");
//     } else {
//       showAlert(res.message, "danger");
//     }
//   };

//   return (
//     <>
//       <div className="card shadow-lg bg-base-100 w-full md:w-2/5 m-4">
//         <div className="card-body">
//           <div className="flex justify-between items-center">
//             <h3 className="card-title text-xl font-semibold">{note.title}</h3>
//             <div className="flex space-x-3 text-2xl cursor-pointer">
//               <div className="tooltip" data-tip="edit">
//                 <BiSolidEdit
//                   onClick={() => {
//                     editNote(note);
//                   }}
//                   className="hover:text-primary"
//                 />
//               </div>

//               <div className="tooltip" data-tip="delete">
//                 <MdDeleteForever
//                   onClick={() => {
//                     handleDelete(note);
//                   }}
//                   className="hover:text-error"
//                 />
//               </div>
//             </div>
//           </div>
//           <p className="card-text text-base mt-2">{note.description}</p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NoteItem;
