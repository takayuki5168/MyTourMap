const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const compression = require('compression');
const serveStatic = require('serve-static');
const basicAuth   = require('basic-auth-connect');

const user = process.env.USER;
const pass = process.env.PASS;

app.set('port', process.env.PORT || 3000);

if (user && pass) {
    app.use(basicAuth(user, pass));
}

app.use(morgan('dev'));
app.use(compression());
app.use(serveStatic(`${__dirname}/public`));

app.listen(app.get('port'), () => {
    console.log('Server listening on port %s', app.get('port'));
});
