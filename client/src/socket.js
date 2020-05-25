import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:5000";

export const socket = socketIOClient(endpoint);
