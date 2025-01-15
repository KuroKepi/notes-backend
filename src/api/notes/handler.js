class NotesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    this.validator.validatePostNotePayload(request.payload);
    const { title, body, tags } = request.payload;
    const noteId = await this.service.addNote({ title, body, tags });
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  }

  async getNotesHandler() {
    console.log('Service:', this.service);
    console.log('Get Notes:', await this.service.getNotes());
    const notes = await this.service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request) {
    this.validator.validateGetNoteByIdPayload(request.payload);
    const { id } = request.params;
    const note = await this.service.getNotesById(id);
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  async putNoteByIdHandler(request) {
    this.validator.validatePutNoteByIdPayload(request.payload);
    const { id } = request.params;
    await this.service.editNoteById(id, request.payload);
    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  }

  async deleteNoteByIdHandler(request) {
    this.validator.validateDeleteNoteByIdPayload(request.params);
    const { id } = request.params;
    await this.service.deleteNoteById(id);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }
}
module.exports = NotesHandler;
