const express = require("express")
const router = express.Router()

//const Book = require ('../models/book')

// book pages
router.get('/future', async (req, res) => {
   

    res.render("works/future")
})


router.get('/work', async (req, res) => {
   

    res.render("works/work")
})

module.exports = router
