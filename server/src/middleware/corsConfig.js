/**
 * Configure CORS to only accept certain domains
 */
const corsConfig = (req, callback) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://www.eattogether.us",
    "https://eattogether.us",
    "http://localhost:5000",
  ];
  const corsOptions = { credentials: true };
  if (allowedOrigins.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = corsConfig;
