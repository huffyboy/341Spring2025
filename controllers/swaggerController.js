const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
require("dotenv").config();

const serverUrl = process.env.SERVER_URL;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: serverUrl,
        description: "Server",
      },
    ],
    components: {
      schemas: {
        ContactBase: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              example: "John",
              description: "The first name of the contact",
            },
            lastName: {
              type: "string",
              example: "Doe",
              description: "The last name of the contact",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
              description: "The contact's email address",
            },
            favoriteColor: {
              type: "string",
              example: "Blue",
              description: "The contact's favorite color",
            },
            birthday: {
              type: "string",
              format: "date",
              example: "1990-01-01",
              description: "The contact's birth date",
            },
          },
        },
        Contact: {
          allOf: [
            { $ref: "#/components/schemas/ContactBase" },
            {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  description: "Unique ID of the contact (read-only)",
                  example: "66273ddfeef093343d2a51c4",
                  readOnly: true,
                },
              },
              required: [
                "_id",
                "firstName",
                "lastName",
                "email",
                "favoriteColor",
                "birthday",
              ],
            },
          ],
        },
        NewContact: {
          allOf: [
            { $ref: "#/components/schemas/ContactBase" },
            {
              required: [
                "firstName",
                "lastName",
                "email",
                "favoriteColor",
                "birthday",
              ],
            },
          ],
        },
        PartialContact: {
          $ref: "#/components/schemas/ContactBase",
        },
      },
      links: {
        GetContactById: {
          operationId: "getContactById",
          parameters: {
            id: "$response.body#/_id",
          },
          description: "Get the newly created contact using the ID",
        },
        GetContactFromRequestPath: {
          operationId: "getContactById",
          parameters: {
            id: "$request.path.id",
          },
          description: "Follow-up with GET request to view this contact",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/contactsRoute.js")],
};

const swaggerSpec = swaggerJsdoc(options);

exports.getSwaggerSpec = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};

exports.spec = swaggerSpec;
