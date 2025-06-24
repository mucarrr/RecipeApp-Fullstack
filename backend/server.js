import express from "express";
import recipeRoute from "./routes/recipeRoute.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(recipeRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
