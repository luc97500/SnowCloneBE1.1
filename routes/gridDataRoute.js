const express = require('express')
const routerForGrid = express.Router();

const jwt = require('jsonwebtoken')// need to use login bad
const authJwt = require('../helper/authjwt'); 

const AutoGeneratedGridData = require('../models/AutoGeneratedRows')// auto generating the rows

const DataGrid = require("../models/gridData")

// For Grid Data only

routerForGrid.post("/create", async(req,res)=>{
    try {
    const count = req.body.count || 20;  // default to 100 rows if not specified
    const rows = AutoGeneratedGridData(count);  // Generate rows
    const insertedRows = await DataGrid.insertMany(rows);  // Insert into MongoDB
    res.status(201).json({ message: 'Rows inserted successfully', data: insertedRows });
    } catch (error) {
        console.error('Error inserting rows:', error);
        res.status(500).json({ error: 'Error inserting rows', details: error.message });
    }
})

// Delete all the data in grid table
routerForGrid.delete("/data", async(req,res)=>{
    try {
        const result = await DataGrid.deleteMany({});

    // Return the count of deleted rows
    res.status(200).json({
      message: `${result.deletedCount} document(s) deleted successfully`,
      deletedCount: result.deletedCount
    });

    } catch (error) {
        res.status(500).json({
      error: 'Error deleting rows',
      details: error.message
    });
    }
})

module.exports = routerForGrid;