module.exports=
{
        swaggerDefinition: {
          openapi: '3.0.1',
          info: {
            version: '1.0.0',
            title: 'Project about Signup , Login and Change password',
            description: 'We first will be user by signing up and then login ',
            servers: ['http://localhost:3000'],
          },
          components: {
            securitySchemes: {
              jwt: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
        },
        apis: ['routes/*.js'],
      };
      
