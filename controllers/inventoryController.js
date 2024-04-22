

import knex from 'knex'
import knexfile from '../knexfile.js'
import express from 'express'

const db = knex(knexfile);
// List
const inventoryList = async (_req, res) => {
  try {
    const data = await db
      .select('inventories.*', 'warehouses.warehouse_name')
      .from('inventories')
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving inventories: ${err}`)
  }
}

//category list
const categoryList = async (_req, res) => {
  try {
    const data = await db
      .select('category')
      .from('inventories')
      .groupBy('category')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving categories: ${err}`)
  }
}

//find item by id
const findOne = async (_req, res) => {
  try {
    console.log(_req.params.id)
    const data = await db
      .select('inventories.*', 'warehouses.warehouse_name')
      .from('inventories')
      .innerJoin('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .where('inventories.id', _req.params.id)

    if (data.length === 0) {
      return res.status(200).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }
    const itemData = data[0];
    res.json(itemData);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for item with ID ${_req.params.id}`
    })
  }
}



//Item List by warehouse

const itemWarehouseList = async (_req, res) => {
  try {
    const data = await db
      .select('inventories.*', 'warehouses.warehouse_name')
      .from('inventories')
      .leftJoin('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .where('warehouses.id', _req.params.id)
    if (data.length === 0) {
      return res.status(200).json({
        message: `The selected warehouse ID:${_req.params.id}  does not have items yet `
      })
    }
    const warehouseItemData = data;
    res.json(warehouseItemData);
  } catch (err) {
    res.status(400).send(`Error retrieving inventory: ${err}`)
  }
}

const add = async (_req, res) => {
  try {
    const newInventoryId = await db('inventories').insert(_req.body)
    res.status(200).json(newInventoryId[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve posts for inventory: ${err}`
    })
  }
}

const update = async (_req, res) => {
  try {
    
    const rowsUpdated = await db('inventories')
      .where({ id: _req.params.id })
      .update(_req.body)

        console.log(rowsUpdated)
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }
    
    const updatedItem = await db('inventories').where({
      id: _req.params.id
    })
    console.log(updatedItem)
    res.json(updatedItem[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to update item with ID ${_req.params.id}: ${err}`
    })
  }
}

const remove = async (_req, res) => {
  try {
    const rowsDeleted = await db('inventories')
      .where({ id: _req.params.id })
      .del()
    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      message: `Unable to delete item: ${err}`
    })
  }
}




export {
    inventoryList,
    categoryList,
    findOne,
    itemWarehouseList,
    add,
    update,
    remove
  }
  
