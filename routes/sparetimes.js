const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")
const fs = require('fs');
const xml2js = require('xml2js');
var convert = require('xml-js');
const { contains } = require("jquery");
xmlparser = require('express-xml-bodyparser')

/*
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

*/


var parser = new xml2js.Parser();
//const Book = require ('../models/book')

// book pages
router.get('/books',checkAuthentication, async (req, res) => {
   res.render("sparetimes/books")
})

router.get('/bookauthor', checkAuthentication, async (req, res) => {
  
    //res.send("here it is in sparetime")

   res.render("sparetimes/bookauthor")

  })

router.get('/booknylist', checkAuthentication, async (req, res) => {
  
    //res.send("here it is in sparetime")

   res.render("sparetimes/booknylist", { layout: '../views/layouts/layout.ejs' })

  })



// interest pages

  router.get('/interests', checkAuthentication, async (req, res) => {
  
    //res.send("here it is in sparetime/interest")

    res.render("sparetimes/interests")

  })

// sports 


  router.get('/sports', checkAuthentication, async (req, res) => {

   //res.render("sparetimes/sports")
   res.render("sparetimes/sports")

  })

  router.get('/teamsports', checkAuthentication, async (req, res) => {
  
    //res.send("here it is in sparetime/sports")

   res.render("sparetimes/teamsports")

  })



  function goodsreadfetch(xml) {

    var x, i, xmlDoc, txt,table ="" , booktable = "", authtable="";
    var authorinfo ="" ; 
    var  gauthor = " " , ggender =" ", gworkcount=" ", ghometown=' ',gbooks , gpubyears ="Unknown", gimage =" ", gdesc ="Not at this time"; 
   
    txt = "";
    //console.log(xml);
    
   
    if(xml.getElementsByTagName ("about")[0] !=null)
    {
          authorinfo   = xml.getElementsByTagName ("about")[0].innerHTML;
          authorinfo = authorinfo.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '')
    }
   
    // console.log ("the about value is " + authorinfo);
  

    authtable += "</th><th>"+ " About Author" + "</th><th>"; 
    authtable +=  "<tr><td>" + authorinfo ;

    //document.getElementById("authtable").innerHTML = authtable;
    document.getElementById("authorinfo").innerHTML = authtable;
    
    if (xml.getElementsByTagName("name")[0].innerHTML !==null){ gauthor = xml.getElementsByTagName("name")[0].innerHTML;}
    if (xml.getElementsByTagName("gender")[0].innerHTML !==null){ ggender = xml.getElementsByTagName("gender")[0].innerHTML;}
    if (xml.getElementsByTagName("works_count")[0].innerHTML !== null){ gworkcount = xml.getElementsByTagName("works_count")[0].innerHTML; }
    if (xml.getElementsByTagName("hometown")[0].innerHTML !==null) { ghometown = xml.getElementsByTagName("hometown")[0].innerHTML; }
  
    ggender = "Male";
  
    //table += "</t><td>"+ "Author" + "</td><td>"+ "Gender   " + "</td><td>" + "Totoal works   " + "</td><td>"+ "   Hometown"; 
    table += "</t><th>"+ "Author" + "</th><th>"+ "Gender   " + "</th><th>" + "Totoal works   " + "</th><th>"+ "   Hometown"; 
    table +=  "<tr><td>" + gauthor +  "</td><td>" + ggender +  "</td><td>" + gworkcount + "</td><td>" + ghometown;
  
  
    document.getElementById("first").innerHTML = table;
  
    booktable  += "</th><th> "+ "Titles" + "</th><th>" + "Year" +  "</th><th>" + " " +  "</th><th>" + " Description ";
  
    x = xml.getElementsByTagName("book");
    //console.log( x);
  
  
    for (i = 0; i< x.length; i++) {
      
       txt += x[i].childNodes[11].childNodes[0].nodeValue + " <br>";
  
       if ( x[i].childNodes[33].childNodes.length !== 0)
       {gpubyears = x[i].childNodes[33].childNodes[0].nodeValue; }
       if ( x[i].childNodes[15].childNodes.length !== 0)
       {gimage = x[i].childNodes[15].childNodes[0].nodeValue; }
       
       if ( x[i].children[20].innerHTML !== 0)
       { gdesc = x[i].children[20].innerHTML; 
         gdesc = gdesc.trim().replace(/<[^>]*>/g, ''); }
       
       gbooks =   x[i].childNodes[11].childNodes[0].nodeValue;
       booktable += "<tr><td>" + gbooks + "</td><td>" + gpubyears + "</td><td>" + "<img src=" + gimage +">" + "</td><td>" + gdesc  + " <br>";
      // booktable += "<tr><td>" + gbooks + "</td><td>" + gpubyears + "</td><td>" +  gimage  + "</td><td>" + gdesc  + " <br>";

       gpubyears = "unknown";
       gimage =" ";
       gdesc ="Not at this time";
    
    }
     //document.getElementById("demo").innerHTML = txt;
     document.getElementById("Authorworks").innerHTML = booktable;
  
}



function xmlgoodread(){
fs.readFile(__dirname + '/../public/files/gt.xml', "utf8",function(err, data) {
  // handle err...


 // console.log(data);
  var result1 = convert.xml2json(data, {compact: true, spaces: 4});
  //goodsreadfetch(data);  
  //console.log( result1);
  fs.writeFileSync('user.json', result1);
 })
}


function nytread(){
  
  

  fs.readFile(__dirname + '/../public/files/nyt.json', "utf8",function(err, data) {
    // handle err...
  
  
   // console.log(data);
   // var result1 = convert.xml2json(data, {compact: true, spaces: 4});
    //goodsreadfetch(data);  
    //console.log( result1);
     //processfile(data);

     var bookauthor  = "nobody" , bookrank = " ",bookweeks= "", bookimg = "" ; 
     var mybooks = [] , nyttable = " ";
   
      nyttable +=  "</td><td>"+ "Books"  +  "</td><td> "+ "Author" +  "</td><td>"+ "Ranking" +"</td><td>"+ " Weeks" ; 
   
   
      var json = JSON.parse(data);
   
      let arrValues = Object.values(json);
   
      //console.log(arrValues);
   
      for(var key in json) {
       if (key ==="results"){
   
       console.log("here i am ");
       mybooks = json[key].books ;
         for (i = 0 ; i < mybooks.length ; i++)
         { 
           if(mybooks[i].author !==null){ bookauthor  = mybooks[i].author; }
           if(mybooks[i].rank !==null){ bookrank  = mybooks[i].rank; }
           if(mybooks[i].book_image!==null){ bookimg  = mybooks[i].book_image; }
           if(mybooks[i].weeks_on_list !==null){ bookweeks  = mybooks[i].weeks_on_list; }
            console.log ("the book is  " +    bookimg + "  by "      +  bookauthor + " it is ranking at  " + bookrank + "  and it has been  " + bookweeks + " weeks  on the board ");
            nyttable  +=  "<tr><td>" + "<img src="+bookimg+" width=" + "100" +">" +"</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
           //nyttable  +=  "<tr><td>" + bookimg + "</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
         }
       
       }
      }

      $('#nytfic').html(nyttable);
     
  
   })
  

}

function fetchgoodreadxml(){


    fetch("http://localhost:5000/public/files/gt.xml")

      .then(res => res.text())

     // .then(res => (new window.DOMParser()).parseFromString(res, "text/xml")                      

     // )

      .then(data => {   console.log(data);

                        //display(data);

                        // console.log("the elm data is " + data.getElementsByTagName("original_title")[0].childNodes[0].nodeValue);

                         goodsreadfetch(data);   

                        //document.getElementById("demo").innerHTML =  data.getElementsByTagName("GoodreadsResponse")[0].childNodes[0].nodeValue;

                      });


}

function processfile(info) {

  var bookauthor  = "nobody" , bookrank = " ",bookweeks= "", bookimg = "" ; 
  var mybooks = [] , nyttable = " ";

   nyttable +=  "</td><td>"+ "Books"  +  "</td><td> "+ "Author" +  "</td><td>"+ "Ranking" +"</td><td>"+ " Weeks" ; 


   var json = JSON.parse(info);

   let arrValues = Object.values(json);

   //console.log(arrValues);

   for(var key in json) {
    if (key ==="results"){

    console.log("here i am ");
    mybooks = json[key].books ;
      for (i = 0 ; i < mybooks.length ; i++)
      { 
        if(mybooks[i].author !==null){ bookauthor  = mybooks[i].author; }
        if(mybooks[i].rank !==null){ bookrank  = mybooks[i].rank; }
        if(mybooks[i].book_image!==null){ bookimg  = mybooks[i].book_image; }
        if(mybooks[i].weeks_on_list !==null){ bookweeks  = mybooks[i].weeks_on_list; }
         console.log ("the book is  " +    bookimg + "  by "      +  bookauthor + " it is ranking at  " + bookrank + "  and it has been  " + bookweeks + " weeks  on the board ");
         nyttable  +=  "<tr><td>" + "<img src="+bookimg+" width=" + "100" +">" +"</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
        //nyttable  +=  "<tr><td>" + bookimg + "</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
      }
    
    }
   }

   //$('#nytfic').html(nyttable);
  
  /*
   for (var key in info )
    {
       console.log ("key is :" + key + "  = " + info[key]);
        if (key === "results")
         {
               mybooks = info[key].books ;
              

                  if(mybooks[i].author !==null){ bookauthor  = mybooks[i].author; }
                  if(mybooks[i].rank !==null){ bookrank  = mybooks[i].rank; }
                  if(mybooks[i].book_image!==null){ bookimg  = mybooks[i].book_image; }
                  if(mybooks[i].weeks_on_list !==null){ bookweeks  = mybooks[i].weeks_on_list; }
                   console.log ("the book is  " +    bookimg + "  by "      +  bookauthor + " it is ranking at  " + bookrank + "  and it has been  " + bookweeks + " weeks  on the board ");
                   nyttable  +=  "<tr><td>" + "<img src="+bookimg+" width=" + "100" +">" +"</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
                  //nyttable  +=  "<tr><td>" + bookimg + "</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;

                }

          

           }
    }
 */ 
 /*display the table */
       document.getElementById("nytnonfic").innerHTML = nyttable;
     
}


function checkAuthentication(req, res, next) {
  if(req.isAuthenticated()){
    //req.isAuthenticated() will return true if user is logged in
    next();
} else{
    res.redirect("/login");
}
}


module.exports = router
