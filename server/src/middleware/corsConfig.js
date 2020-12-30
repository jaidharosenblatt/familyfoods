/**
 * Configure CORS to only accept certain domains
 */
// const corsConfig = (req, callback) => {
//   const origin = req.header("Origin");
//   const allowedOrigins = [
//     "http://localhost:3000",
//     "https://www.eattogether.us",
//     "https://eattogether.us",
//     "http://localhost:5000",
//   ];
//   const corsOptions = { credentials: true };
//   if (allowedOrigins.indexOf(origin) !== -1) {
//     corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions.origin = false; // disable CORS for this request
//   }
//   console.log(corsOptions);
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://www.eattogether.us",
    "https://eattogether.us",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

module.exports = corsConfig;
