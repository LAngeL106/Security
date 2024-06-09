const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Phonebook API',
        version: '1.0.0',
        description: 'REST API for managing phonebook entries',
      },
      servers: [
        {
          url: `http://localhost:${3000}`, 
          description: 'Development server',
        },
      ],
      components: {
        schemas: {
          PhonebookEntry: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              username: { type: 'string' },
              phone: { type: 'string' },
            },
            required: ['id', 'username', 'phone'],
          },
        },
      },
    },
    apis: ['./main.js'],
  };
  
  module.exports = swaggerOptions;
  