import "../index";
import { NoteModel } from "../Models";
import { isValidObjectId } from "mongoose";

export async function getAllNotes() {
  const notes = await NoteModel.find({});

  return notes;
}

async function getNoteByTitle(title) {
  title = title.trim().toLowerCase();

  if (!title) throw "Title is required";

  const note = await NoteModel.findOne({ title });

  return note;
}

export async function addNewNote(noteObj) {
  const existingNote = await getNoteByTitle(noteObj.title);

  if (existingNote)
    throw `Note with title : ${existingNote.title} already exists with ID : ${existingNote._id}`;

  const newNote = await NoteModel.create(noteObj);

  return newNote;
}

export async function deleteExistingNote(noteID) {
  if (!isValidObjectId(noteID)) throw "Invalid note ID";

  const deletedNote = await NoteModel.findByIdAndDelete(noteID);

  if (!deletedNote) throw `Note by id ${noteID} not deleted`;

  return deletedNote;
}

export async function editExistingNote(noteID, newNoteData) {
  console.log({ noteID, newNoteData });
  if (!isValidObjectId(noteID)) throw "Invalid Note ID";

  const editedNote = await NoteModel.findByIdAndUpdate(noteID, newNoteData, {
    new: true,
    upsert: false,
  });
  if (!editedNote) throw "Server error";

  return editedNote;
}
