# API Socket ChatGateway

## Overview

This API provides endpoints to manage chat functionality within the application.

## WebSocketGateway

-   **Path:** `/chat`
-   **Origin:** `*`

## Endpoints

### createMessage

Create a new message in the chat.

-   **Endpoint:** `createMessage`
-   **Method:** WebSocket
-   **Message Body:**
    ```json
    {
    	"content": "string",
    	"userId": "string"
    }
    ```
-   **Response:** Returns the newly created message.

### findAllMessages

Get all messages in the chat.

-   **Endpoint:** `findAllMessages`
-   **Method:** WebSocket
-   **Response:** List of messages in the chat.

### typing

Notify when a user is typing a message.

-   **Endpoint:** `typing`
-   **Method:** WebSocket
-   **Message Body:**
    ```json
    {
    	"userId": "string",
    	"name": "string"
    }
    ```
-   **Response:** None.

## Dependencies

-   `@nestjs/websockets`: For using WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket.
-   `@modules/chat/chat.service`: Service for managing chat functionality.
-   `@modules/chat/dto`: Data Transfer Objects for creating messages and typing messages.
-   `socket.io`: Library for building socket applications.
