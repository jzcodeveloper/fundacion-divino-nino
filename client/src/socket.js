import socketIOClient from "socket.io-client";

/* const endpoint = "http://localhost:5000"; */

const endpoint = "https://ml-crowdsourcing-platform.herokuapp.com";

export const socket = socketIOClient(endpoint);
