export const allowedOrigins = [process.env.CLIENT_URL.split(" "), "http://localhost:5173", "https://4brrv5l4-5173.euw.devtunnels.ms"];
// export const allowedOrigins = ["http://localhost:5173"];


const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
};

export default corsOptions;
