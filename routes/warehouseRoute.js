// const knex = require('knex')(require('../knexfile'));
import knex from "knex";
import knexfile from "../knexfile.js";
import express from "express";
import * as warehousesController from '../controllers/warehouseController.js'
const warehouseRouter = express.Router();


warehouseRouter
  .route('/')
  .get(warehousesController.warehouseList)
  .post(warehousesController.add)

  warehouseRouter
  .route('/:id')
  .put(warehousesController.update)
  .delete(warehousesController.remove)
  .get(warehousesController.findOne)



export default warehouseRouter