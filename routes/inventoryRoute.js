
import knex from 'knex'
import knexfile from '../knexfile.js'
import express from 'express'
import * as inventoriesController from '../controllers/inventoryController.js'

const inventoriesRouter = express.Router()

inventoriesRouter
  .route('/')
  .get(inventoriesController.inventoryList)
  .post(inventoriesController.add)

inventoriesRouter.route('/category')
  .get(inventoriesController.categoryList)

inventoriesRouter
  .route('/:id')
  .put(inventoriesController.update)
  .delete(inventoriesController.remove)
  .get(inventoriesController.itemWarehouseList)

inventoriesRouter.route('/item/:id').get(inventoriesController.findOne)

export default inventoriesRouter
