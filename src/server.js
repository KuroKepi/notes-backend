const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');
require('dotenv').config();

const init = async () => {
  const service = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service,
      validator: NotesValidator,
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      if (typeof response.statusCode === 'number' && Number.isInteger(response.statusCode)) {
        newResponse.code(response.statusCode);
      } else {
        newResponse.code(500); // Set a default status code
      }
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
