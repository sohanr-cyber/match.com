let BASE_URL;

if (process.env.NODE_ENV !== "production") {
  BASE_URL = "http://localhost:3000";
} else {
  BASE_URL = "https://muslimmatch.vercel.app";
}

export default BASE_URL;
