const express = require("express")
const router = express.Router()

//const Book = require ('../models/book')

// book pages
router.get('/books', async (req, res) => {
   res.render("sparetimes/books")
})

router.get('/bookauthor', async (req, res) => {
  
    //res.send("here it is in sparetime")

   res.render("sparetimes/bookauthor")

  })

router.get('/booknylist', async (req, res) => {
  
    //res.send("here it is in sparetime")

   res.render("sparetimes/booknylist", { layout: '../views/layouts/layout.ejs' })

  })



// interest pages

  router.get('/interests', async (req, res) => {
  
    //res.send("here it is in sparetime/interest")

    res.render("sparetimes/interests")

  })

// sports 


  router.get('/sports', async (req, res) => {

   //res.render("sparetimes/sports")
   res.render("sparetimes/sports")

  })

  router.get('/teamsports', async (req, res) => {
  
    //res.send("here it is in sparetime/sports")

   res.render("sparetimes/teamsports")

  })

module.exports = router
