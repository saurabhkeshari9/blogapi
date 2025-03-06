module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Admin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            description: "The email of the admin",
            example: "admin@example.com",
          },
          password: {
            type: "string",
            description: "The password of the admin",
            example: "admin12345",
          },
        },
      },
      User: {
        type: "object",
        required: ["name", "email", "password", "mobile"],
        properties: {
          name: {
            type: "string",
            description: "The name of the user",
            example: "John Doe",
          },
          email: {
            type: "string",
            description: "The email of the user",
            example: "johndoe@example.com",
          },
          mobile: {
            type: "string",
            description: "The mobile number of the user",
            example: "1234567890",
          },
          password: {
            type: "string",
            description: "The password of the user",
            example: "password123",
          },
        },
      },
      Post: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: {
            type: "string",
            description: "The title of the post",
            example: "My First Post",
          },
          content: {
            type: "string",
            description: "The content of the post",
            example: "This is the content of my first post",
          },
          image: {
            type: "file",
            format: "binary",
            description: "upload image for the post",
          },
        },
      },
      FAQ: {
        type: "object",
        required: ["question", "answer"],
        properties: {
       
          question: {
            type: "string",
            description: "The question of the FAQ",
          },
          answer: {
            type: "string",
            description: "The answer of the FAQ",
          },
        },
      },
      Comment: {
        type: "object",
        required: ["content"],
        properties: {
          postId: {
            type: "string",
            description: "The ID of the post the comment belongs to",
            example: "5f8d0d55b54764421b7156c1",
          },
          userId: {
            type: "string",
            description: "The ID of the user who made the comment",
            example: "5f8d0d55b54764421b7156c2",
          },
          content: {
            type: "string",
            description: "The content of the comment",
            example: "This is a comment",
          },
        },
      },
      PrivacyPolicy: {
        type: "object",
        required: ["title", "content"],
        properties: {
          id: {
            type: "string",
            example: "60d0fe4f5311236168a109ca"
          },
          title: {
            type: "string",
            description: "The title of the privacy policy",
            example: "Privacy Policy"
          },
          content: {
            type: "string",
            description: "The content of the privacy policy",
            example: "Your detailed privacy policy content here..."
          },
          isActive: {
            type: "boolean",
            description: "Indicates if the privacy policy is active",
            example: true
          },
          lastUpdated: {
            type: "string",
            format: "date-time",
            description: "The date and time when the privacy policy was last updated",
            example: "2021-06-21T14:48:00.000Z"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the privacy policy was created",
            example: "2021-06-21T14:48:00.000Z"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the privacy policy was last updated",
            example: "2021-06-21T14:48:00.000Z"
          }
        }
      }
    },
    responses: {
      UnauthorizedError: {
        description: "Access token is missing or invalid",
      },
      NotFound: {
        description: "Resource not found",
      },
    },
  },
};