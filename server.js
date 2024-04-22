import warehouseRouter from "./routes/warehouseRoute.js";
import inventoriesRouter from "./routes/inventoryRoute.js";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());

// basic home route
app.get("/", (_req, res) => {
  res.send("Welcome to my API");
});

app.use("/warehouses", warehouseRouter);

app.use("/inventories", inventoriesRouter);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
