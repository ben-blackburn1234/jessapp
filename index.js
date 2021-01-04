const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const axios = require('axios');
const contentful = require("contentful");


const app = express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const order = [];

app.get('/photos/new', (req, res) => {

    // var access_token = "zm2iSN_bkjomOiGwTUhc-gcnJK38cEOHEFI-3X51OBU";
    // var space = "gja6lvp3i1ts";
    // var content_type = "blogPost";
    // var contentfulUrl = "https://cdn.contentful.com/spaces/" + space + "/environments/master/entries?access_token=" + access_token + "&content_type=" + content_type;

    // axios.get(contentfulUrl).then(response => {
    //     const getBlogs = response.data.items.map(item => item.fields);
    //     res.render('index', { commentList: getBlogs });
    //     console.log(getBlogs.jessPhoto.sys.id);

    // }).catch(error => {
    //     console.error(error);
    //     next(error);
    // })

    // client.getEntries().then(response => {
    //         const getBlogs = response.items.map(item => item.fields);
    //         res.render('index', { commentList: getBlogs });

    //         console.log(getBlogs);

    //     }).catch(error => {
    //         console.error(error);
    //         next(error);
    //     })

    const client = contentful.createClient({
        space: "gja6lvp3i1ts",
        accessToken: "zm2iSN_bkjomOiGwTUhc-gcnJK38cEOHEFI-3X51OBU"
    });

    client.getEntry('dQhbstJlW3HsrpF9hIaA0')
    .then((entry) => {
        const someAssets = entry.fields.photos.map(pic => pic.fields)
        res.render('index', { commentList: someAssets });
        // console.log(entry.fields.photos.map(pic => pic.fields))
    })
    .catch(console.error)

});

// app.post('/comments', (req, res) => {
//     console.log(req.body)
//     res.send('POST /orders response')
// })

app.post('/photos', (req, res) => {
    const orders = req.body;
    const ordersray = Object.entries(orders)
    order.push(ordersray)
    console.log(order[0])
    res.redirect('/submittedorder')
    // res.json(req.body)
});

app.get('/submittedorder', (req, res) => {

    res.render('submittedorder', { order: order[0] })
})

console.log(order);

app.listen(3000, () => {
    console.log("listening on port 3000");
});

//youtube how to regitser a helper
