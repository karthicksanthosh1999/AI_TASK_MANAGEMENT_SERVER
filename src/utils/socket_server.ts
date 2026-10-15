import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import id from "zod/v4/locales/id.cjs";

let io: Server;

export const initialSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            credentials: true
        },
    })

    io.on("connection", (socket) => {
        console.log("USER CONNECTED:", socket.id);

        socket.on("disconnect", () => {
            console.log("USER DISCONNECTED:", socket.id)
        })
    })
};

export const getID = () : Server => {
    if(!io) throw new Error("Socket.IO has not been initialized");

    return io;
}