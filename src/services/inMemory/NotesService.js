const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class NotesService {
  constructor() {
    this.notes = [];
  }

  addNote({ title, tags, body }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };
    this.notes.push(newNote);
    const isSuccess = this.notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }
    return id;
  }

  getNotes() {
    return this.notes;
  }

  getNotesById(id) {
    const note = this.getNotes().find((n) => n.id === id);
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, tags, body }) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal diperbarui. Id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();
    this.notes[index] = {
      ...this.notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this.notes.splice(index, 1);
  }
}

module.exports = NotesService;
