const InvariantError = require('../../exception/InvariantError');
const {
  NotePayloadSchema, NoteIdPayloadSchema, NoteUpdatePayloadSchema, NoteDeletedPayloadSchema,
} = require('./schema');

const NotesValidator = {
  validatePostNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateGetNoteByIdPayload: (payload) => {
    const validationResult = NoteIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutNoteByIdPayload: (payload) => {
    const validationResult = NoteUpdatePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteNoteByIdPayload: (payload) => {
    const validationResult = NoteDeletedPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
