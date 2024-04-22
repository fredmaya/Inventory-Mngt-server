import knex from 'knex'
import knexfile from '../knexfile.js'
import express from 'express'

const db = knex(knexfile)
// List
const warehouseList = async (_req, res) => {
  try {
    const data = await db('warehouses')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`)
  }
}

//find item by id
const findOne = async (_req, res) => {
  try {
    const data = await db('warehouses').where('id', _req.params.id).select()

    if (data.length === 0) {
      return res.status(200).json({
        message: `Warehouse with ID ${_req.params.id} not found`
      })
    }
    const itemData = data[0]
    res.json(itemData)
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve the warehouse with ID ${_req.params.id}`
    })
  }
}

//post
const add = async (_req, res) => {
  try {
    const newWarehouseIds = await db('warehouses').insert(_req.body)

    res.status(200).json(newWarehouseIds[0])
  } catch (err) {
    res.status(400).json({ message: `Error creating warehouses` })
  }
}

const update = async (_req, res) => {
  try {
    const rowsUpdated = await db('warehouses')
      .where({ id: _req.params.id })
      .update(_req.body)
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${_req.params.id} not found`
      })
    }

    const updatedWarehouse = await db('warehouses').where({
      id: _req.params.id
    })

    res.json(updatedWarehouse[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to update item with ID ${_req.params.id}: ${err}`
    })
  }
}

const remove = async (_req, res) => {
  try {
    const rowsDeleted = await db('warehouses')
      .where({ id: _req.params.id })
      .del()

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${_req.params.id} not found`
      })
    }

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      message: `Unable to delete warehouses: ${err}`
    })
  }
}

export { warehouseList, findOne, add, update, remove }
