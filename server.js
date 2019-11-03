const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err)
        }
    })

    next()
})

// app.use((req, res, next) => {
//     res.render('mainteinance.hbs')
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req , res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to my web site'
   })
});

app.get('/about', (req , res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    })
})


app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}...`)
});