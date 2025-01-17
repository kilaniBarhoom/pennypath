export const allowedOrigins = [process.env.CLIENT_URL.split(" ")];
// export const allowedOrigins = [process.env.CLIENT_URL.split(" ")];
// export const allowedOrigins = ["http://localhost:5173"];


const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
};

export default corsOptions;
