//Include related package and variables
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')



//Set template engine
app.engine('handlebars',exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//Set route 
app.get('/', (req,res)=>{
    res.render('index', {restaurants:restaurantList.results})
})

//Set show page route
app.get('/restaurants/:restaurant', (req, res)=> {
    const restaurantFilter = restaurantList.results.find(
        (restaurant) => req.params.restaurant === restaurant.id.toString()
    )
    res.render('show', {Restaurant:restaurantFilter})
}) 

//Set search page route
app.get('/search', (req,res)=>{ 
    const keyword = req.query.keyword
    const searchList = restaurantList.results.filter(
        (restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) 
    )
    if (searchList.length===0) {
        res.render('noresult', {keyword:keyword})
    } else {
        res.render('index', {restaurants:searchList, keyword:keyword})
    }

})
//Start and listen
app.listen(port, ()=>{
    console.log(`Express is running on http://localhost:${port}`)
})