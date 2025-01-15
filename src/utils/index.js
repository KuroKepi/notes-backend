const mapDBToModel = ({
  id, title, body, tags, createdAt, updatedAt,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt,
  updatedAt,
});

module.exports = { mapDBToModel };
