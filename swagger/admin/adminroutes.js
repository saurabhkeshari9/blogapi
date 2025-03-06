module.exports = {
  "/api/adminauth/login": {
    post: {
      tags: ["Admin"],
      summary: "Admin login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Admin"
            }
          }
        }
      },
      responses: {
        200: {
          description: "Admin login successful",
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
                    example: "Login successful"
                  },
                  token: {
                    type: "string",
                    example: "jwt_token_here"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Invalid credentials"
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminauth/users": {
    get: {
      tags: ["Admin"],
      summary: "Get all users",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of all users",
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
                    example: "Users List"
                  },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminauth/block/{id}": {
    put: {
      tags: ["Admin"],
      summary: "Block or unblock a user",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string"
          },
          description: "User ID to block/unblock"
        }
      ],
      responses: {
        200: {
          description: "User blocked/unblocked successfully",
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
                    example: "User blocked successfully"
                  },
                  data: {
                    $ref: "#/components/schemas/User"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "User not found"
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminauth/posts": {
    get: {
      tags: ["Admin"],
      summary: "Get all user posts",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of all posts",
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
                    example: "Posts List"
                  },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Post"
                    }
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminposts/create": {
    post: {
      tags: ["AdminPosts"],
      summary: "Create a new post",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post"
            }
          }
        }
      },
      responses: {
        200: {
          description: "Post created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post"
              }
            }
          }
        },
        401: {
          description: "Unauthorized access"
        },
        403: {
          description: "Admin access required"
        }
      }
    }
  },
  "/api/adminposts/getall": {
    get: {
      tags: ["AdminPosts"],
      summary: "Get all posts with cursor pagination",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10
          },
          description: "Number of posts per page"
        },
        {
          in: "query",
          name: "lastId",
          schema: {
            type: "string"
          },
          description: "Last post ID for cursor pagination"
        }
      ],
      responses: {
        200: {
          description: "List of posts",
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
                    example: "Posts List"
                  },
                  nextCursor: {
                    type: "string"
                  },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Post"
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
  "/api/adminposts/getbyid/{id}": {
    get: {
      tags: ["AdminPosts"],
      summary: "Get post by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string"
          },
          description: "Post ID"
        }
      ],
      responses: {
        200: {
          description: "Post details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post"
              }
            }
          }
        },
        400: {
          description: "Post not found"
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminposts/update/{id}": {
    put: {
      tags: ["AdminPosts"],
      summary: "Update a post",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string"
          },
          description: "Post ID to update"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post"
            }
          }
        }
      },
      responses: {
        200: {
          description: "Post updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post"
              }
            }
          }
        },
        400: {
          description: "Post not found"
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminposts/delete/{id}": {
    delete: {
      tags: ["AdminPosts"],
      summary: "Delete a post",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string"
          },
          description: "Post ID to delete"
        }
      ],
      responses: {
        200: {
          description: "Post deleted successfully",
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
                    example: "Post deleted successfully"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Post not found"
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/admincomments/comments": {
    get: {
      tags: ["AdminComments"],
      summary: "Get all comments",
      security: [{ bearerAuth: [] }],
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
                    example: "Comments List"
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
        },
        400: {
          description: "Unauthorized access"
        },
        403: {
          description: "Admin access required"
        },
        500: {
          description: "Server error"
        }
      }
    }
  },
  "/api/admincomments/comments/{commentId}": {
    delete: {
      tags: ["AdminComments"],
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
          description: "Comment ID to delete",
          example: "d5fE_asz"
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
        },
        401: {
          description: "Unauthorized access"
        },
        403: {
          description: "Admin access required"
        },
        404: {
          description: "Comment not found"
        },
        500: {
          description: "Server error"
        }
      }
    }
  },
  "/api/adminfaqs/faqs": {
    get: {
      tags: ["AdminFAQs"],
      summary: "Get all FAQs",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "FAQs retrieved successfully",
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
                    example: "FAQs List"
                  },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/FAQ"
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: "Unauthorized access"
        },
        403: {
          description: "Admin access required"
        },
        500: {
          description: "Server error"
        }
      }
    },
    post: {
      tags: ["AdminFAQs"],
      summary: "Create a new FAQ",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FAQ"
            }
          }
        }
      },
      responses: {
        200: {
          description: "FAQ created successfully",
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
                    example: "FAQ created successfully"
                  },
                  data: {
                    $ref: "#/components/schemas/FAQ"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Bad request"
        },
        500: {
          description: "Some server error"
        }
      }
    }
  },
  "/api/adminfaqs/faqs/{faqId}": {
    put: {
      tags: ["AdminFAQs"],
      summary: "Update an FAQ",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "faqId",
          required: true,
          schema: {
            type: "string"
          },
          description: "FAQ ID to update"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FAQ"
            }
          }
        }
      },
      responses: {
        200: {
          description: "FAQ updated successfully",
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
                    example: "FAQ updated successfully"
                  },
                  data: {
                    $ref: "#/components/schemas/FAQ"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "FAQ not found"
        },
        500: {
          description: "Some server error"
        }
      }
    },
    delete: {
      tags: ["AdminFAQs"],
      summary: "Delete an FAQ",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "faqId",
          required: true,
          schema: {
            type: "string"
          },
          description: "FAQ ID to delete"
        }
      ],
      responses: {
        200: {
          description: "FAQ deleted successfully",
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
                    example: "FAQ deleted successfully"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "FAQ not found"
        },
        500: {
          description: "Some server error"
        }
      }
    },
      "/api/adminprivacy/createprivacy": {
        post: {
          tags: ["AdminPrivacy"],
          summary: "Create a new privacy policy",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PrivacyPolicy"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Privacy policy created successfully",
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
                        example: "Privacy policy created successfully"
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
              description: "Bad request"
            },
            500: {
              description: "Some server error"
            }
          }
        }
      },
      "/api/adminprivacy/updateprivacy/{id}": {
        put: {
          tags: ["AdminPrivacy"],
          summary: "Update a privacy policy",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string"
              },
              description: "Privacy policy ID to update"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PrivacyPolicy"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Privacy policy updated successfully",
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
                        example: "Privacy policy updated successfully"
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
              description: "Privacy policy not found"
            },
            500: {
              description: "Some server error"
            }
          }
        }
      },
      "/api/adminprivacy/getprivacy": {
        get: {
          tags: ["AdminPrivacy"],
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
      "/api/adminprivacy/deleteprivacy/{id}": {
        delete: {
          tags: ["AdminPrivacy"],
          summary: "Delete a privacy policy",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string"
              },
              description: "Privacy policy ID to delete"
            }
          ],
          responses: {
            200: {
              description: "Privacy policy deleted successfully",
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
                        example: "Privacy policy deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: "Privacy policy not found"
            },
            500: {
              description: "Some server error"
            }
          }
        }
      }
    }
  };