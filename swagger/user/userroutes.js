module.exports = {
  "/api/userauth/register": {
    post: {
      summary: "Register a new user",
      tags: ["UserAuth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        200: {
          description: "The user was successfully registered",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        400: {
          description: "Bad request",
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userauth/login": {
    post: {
      summary: "Login a user",
      tags: ["UserAuth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                mobile: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "The user was successfully logged in",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  token: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid credentials",
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userpost/create": {
    post: {
      summary: "Create a new post",
      tags: ["Posts"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post",
            },
          },
        },
      },
      responses: {
        200: {
          description: "The post was successfully created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
        },
        400: {
          description: "Bad request",
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userpost/getall": {
    get: {
      summary: "Get all posts",
      tags: ["Posts"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "A list of posts",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userpost/getbyid/{id}": {
    get: {
      summary: "Get a post by ID",
      tags: ["Posts"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The post ID",
        },
      ],
      responses: {
        200: {
          description: "The post data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
        },
        400: {
          description: "Post not found",
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userpost/update/{id}": {
    put: {
      summary: "Update a post",
      tags: ["Posts"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The post ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post",
            },
          },
        },
      },
      responses: {
        200: {
          description: "The post was successfully updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
        },
        400: {
          description: "Post not found",
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userpost/delete/{id}": {
    delete: {
      summary: "Delete a post",
      tags: ["Posts"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The post ID",
        },
      ],
      responses: {
        200: {
          description: "The post was successfully deleted",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Post deleted successfully",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Post not found",
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/usercomments/add": {
      post: {
        tags: ["Comments"],
        summary: "Add a new comment",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["postId", "content"],
                properties: {
                  postId: {
                    type: "string",
                    description: "ID of the post"
                  },
                  content: {
                    type: "string",
                    description: "Comment content"
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Comment created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    statusCode: {
                      type: "number",
                      example: 201
                    },
                    message: {
                      type: "string",
                      example: "Comment added successfully"
                    },
                    data: {
                      $ref: "#/components/schemas/Comment"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/usercomments/post/{postId}": {
      get: {
        tags: ["Comments"],
        summary: "Get comments by post ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "postId",
            required: true,
            schema: {
              type: "string"
            },
            description: "Post ID to get comments for"
          }
        ],
        responses: {
          200: {
            description: "Comments retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    statusCode: {
                      type: "number",
                      example: 200
                    },
                    message: {
                      type: "string",
                      example: "Comments retrieved successfully"
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Comment"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/usercomments/update/{commentId}": {
      put: {
        tags: ["Comments"],
        summary: "Update a comment",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "commentId",
            required: true,
            schema: {
              type: "string"
            },
            description: "Comment ID to update"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: {
                  content: {
                    type: "string",
                    description: "Updated comment content"
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Comment updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Comment"
                }
              }
            }
          }
        }
      }
    },
    "/api/usercomments/delete/{commentId}": {
      delete: {
        tags: ["Comments"],
        summary: "Delete a comment",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "commentId",
            required: true,
            schema: {
              type: "string"
            },
            description: "Comment ID to delete"
          }
        ],
        responses: {
          200: {
            description: "Comment deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    statusCode: {
                      type: "number",
                      example: 200
                    },
                    message: {
                      type: "string",
                      example: "Comment deleted successfully"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  "/api/userfaqs/faqs": {
    get: {
      summary: "Get all FAQs",
      tags: ["FAQs"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "The list of FAQs",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/FAQ",
                },
              },
            },
          },
        },
        500: {
          description: "Some server error",
        },
      },
    },
  },
  "/api/userpolicy/privacy": {
    get: {
      tags: ["Privacy"],
      summary: "Get the active privacy policy",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Privacy policy retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 200
                  },
                  message: {
                    type: "string",
                    example: "Privacy policy retrieved successfully"
                  },
                  data: {
                    $ref: "#/components/schemas/PrivacyPolicy"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "No active privacy policy found"
        },
        500: {
          description: "Some server error"
        }
        
      }
        
    }
        
  },
};