let apidocs = {
    "openapi": "3.0.0",
    "info": {
        "title": "Api for the e-com website",
        "description": "This Api will help in communication of multiple devices want to access our services",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:3200",
            "description": "this is main url for our api"
        }
    ],
    "components": {
        "securitySchemes": {
            "JWT": {
                "type": "apiKey",
                "in": "header",
                "name": "Authorization"
            }
        }
    },
    "paths": {
        "/api/user/Sign-in": {
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "This is a basic login page which takes the input and check email and password in backend",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": {
                                        "type": "string",
                                        "example": "dipeshpohanekar1997@gmail.com"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "12345"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Ok"
                    },
                    "400": {
                        "description": "Not registered SignUp First"
                    }
                }
            }
        },
        "/api/user/Sign-up": {
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "This is a basic registering page which takes the input and register user",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "type": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "user created successfully"
                    },
                    "400": {
                        "description": "Not registered Successfully"
                    }
                }
            }
        },
        "/api/user/Sign-out": {
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "This is a basic logout page which clears session and logs out",
                "responses": {
                    "200": {
                        "description": "Ok"
                    },
                    "400": {
                        "description": "Not registered SignUp First"
                    }
                }
            }
        },
        "/api/product": {
            "post": {
                "tags": [
                    "Products"
                ],
                "summary": "It create a product in the site",
                "requestBody": {
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "example": "Bluetooth Earbuds",
                                        "type": "string"
                                    },
                                    "desc": {
                                        "example": "Wireless Bluetooth earbuds with noise cancellation",
                                        "type": "string"
                                    },
                                    "imageUrl": {
                                        "example": "https://example.com/earbuds.jpg",
                                        "type": "string"
                                    },
                                    "category": {
                                        "example": "category3",
                                        "type": "string"
                                    },
                                    "price": {
                                        "example": 129.99,
                                        "type": "number"
                                    },
                                    "sizes": {
                                        "example": "S,L,XL",
                                        "type": "string"
                                    },
                                    "resume": {
                                        "type": "string",
                                        "format": "binary",
                                        "description": "Upload the resume file"
                                    }
                                }
                            }
                        }
                    }
                },
                "description": "It requires to send the authorization header with the request",
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Product is not created"
                    },
                    "401": {
                        "description": "First login"
                    }
                }
            },
            "get": {
                "tags": [
                    "Products"
                ],
                "summary": "It get all the products in the site",
                "description": "It requires to send the authorization header with the request",
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Non Product is listed"
                    },
                    "401": {
                        "description": "First login"
                    }
                }
            }
        },
        "/api/product/{id}": {
            "get": {
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "summary": "It get the product on the basis of id",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "The unique ID of the product"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Non Product is listed"
                    },
                    "401": {
                        "description": "First login"
                    }
                }
            }
        },
        "/api/product/filter": {
            "get": {
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "summary": "Filter products by price range and category",
                "description": "Fetches products based on minPrice, maxPrice, and category filters",
                "parameters": [
                    {
                        "name": "minPrice",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "example": 40,
                            "type": "number"
                        },
                        "description": "Minimum price filter"
                    },
                    {
                        "name": "maxPrice",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "example": 255,
                            "type": "number"
                        },
                        "description": "Maximum price filter"
                    },
                    {
                        "name": "categories",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "array",
                            "items": {
                                "example": [
                                    "category1",
                                    "category2"
                                ],
                                "type": "string"
                            }
                        },
                        "style": "form",
                        "explode": true,
                        "description": "Filter products by multiple categories"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Filtered products list"
                    },
                    "404": {
                        "description": "No products found"
                    }
                }
            }
        },
        "/api/product/rate": {
            "post": {
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "summary": "Rate a product",
                "description": "Allows users to rate a product by providing the product ID and rating value.",
                "parameters": [
                    {
                        "name": "product_id",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "example": "673ba50d5a51122b10432f64"
                        },
                        "description": "The unique ID of the product to be rated"
                    },
                    {
                        "name": "rating",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "number",
                            "format": "float",
                            "minimum": 0,
                            "maximum": 5,
                            "example": 1.3
                        },
                        "description": "The rating value (should be between 0 and 5)"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Rating submitted successfully",
                        "content": {
                            "application/json": {
                                "example": {
                                    "message": "Product rated successfully",
                                    "product_id": "673ba50d5a51122b10432f64",
                                    "rating": 1.3
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid rating value (should be between 0 and 5)"
                    },
                    "404": {
                        "description": "Product not found"
                    }
                }
            }
        },
        "/api/cart": {
            "post": {
                "tags": [
                    "Cart"
                ],
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "summary": "Add a product to the cart",
                "description": "Allows users to add a product to their cart by providing the product ID and quantity.",
                "parameters": [
                    {
                        "name": "productId",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "example": "673ba50d5a51122b10432f62"
                        },
                        "description": "The unique ID of the product to add to the cart"
                    },
                    {
                        "name": "quantity",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "minimum": 1,
                            "example": 2
                        },
                        "description": "The number of units of the product to add"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product added to cart successfully",
                        "content": {
                            "application/json": {
                                "example": {
                                    "message": "Product added to cart",
                                    "productId": "673ba50d5a51122b10432f62",
                                    "quantity": 2
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid request (e.g., negative quantity)"
                    },
                    "404": {
                        "description": "Product not found"
                    }
                }
            }
        },
        "/api/cart/{productId}": {
            "delete": {
                "tags": [
                    "Cart"
                ],
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "summary": "Delete a product from the cart",
                "description": "Delete a specific product in the cart using the product ID.",
                "parameters": [
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "example": "673ba50d5a51122b10432f64"
                        },
                        "description": "The unique ID of the product in the cart"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successfully Deleted"
                    },
                    "404": {
                        "description": "no such product found"
                    }
                }
            }
        },
        "/api/cart/items": {
            "get": {
                "tags": [
                    "Cart"
                ],
                "security": [
                    {
                        "JWT": {}
                    }
                ],
                "summary": "Get all items in the cart of user",
                "description": "Fetches a list of all products added to the cart by the user.",
                "responses": {
                    "200": {
                        "description": "Cart items retrieved successfully",
                        "content": {
                            "application/json": {
                                "example": [
                                    {
                                        "product_id": "673ba50d5a51122b10432f62",
                                        "quantity": 2
                                    },
                                    {
                                        "product_id": "673ba50d5a51112fc10432f71",
                                        "quantity": 3
                                    }
                                ]
                            }
                        }
                    },
                    "404": {
                        "description": "Cart is empty"
                    }
                }
            }
        }
    }
}

export default apidocs;