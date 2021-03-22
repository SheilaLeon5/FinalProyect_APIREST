var express = require('express');
var recipesRouter = require('./services/recipes');

var cors = require('cors');

var app = express();
const port =  process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.use('/', recipesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    return;
  });


app.listen(port, function(){
    console.log(`Server is running in port ${port}`);
})