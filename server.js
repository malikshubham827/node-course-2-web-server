const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} , ${req.url}.`
  console.log(log);
  fs.appendFile('server.log', log, (err) => {
    if (err) {
      console.log('Error logging to file');
    }
  });
  next();
});

//maintenance
app.use((req, res, next) => {
  res.render('maintenance.hbs');
})


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to process the request'
  });
});

app.listen(port, () => {
  console.log(`server up and running on port ${port}`);
});
