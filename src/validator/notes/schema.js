const Joi = require('joi');

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  body: Joi.string().required(),
});

const NoteIdPayloadSchema = Joi.object({
  id: Joi.string().required(),
});

const NoteUpdatePayloadSchema = Joi.object({
  title: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  body: Joi.string(),
});

const NoteDeletedPayloadSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  NotePayloadSchema, NoteIdPayloadSchema, NoteUpdatePayloadSchema, NoteDeletedPayloadSchema,
};
