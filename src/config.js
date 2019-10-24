// const URL = (process.env.URL) ? process.env.URL : "localhost";
const PORT = (process.env.PORT) ? process.env.PORT : "3333";

// SOCKET: `ws://${URL}:${PORT}/socket.io`,
// HTTP: `http://${URL}:${PORT}`
export default {
  SOCKET: `ws://142.93.78.6:${PORT}/socket.io`,
  HTTP: `http://142.93.78.6:${PORT}`
}