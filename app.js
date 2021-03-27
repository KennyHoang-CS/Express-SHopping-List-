// Setups
const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const ExpressError = require('./expressError');

// Start up our express. 
const app = express();
app.use(express.json());
app.use("/items", itemRoutes);

/** 404 Error Handler */
app.use(function(req, res, next){
    return new ExpressError('Not Found', 404);
});

/** General Error Handler */
app.use(function(error, req, res, next){
    res.status(error.status || 500);

    return res.json({ error: error.message });

});

/* Commented in order to use testing for Jest. De-comment to run the server.
app.listen(3000, function(){
    console.log("Server running at port: 3000");
});
*/

module.exports = app;