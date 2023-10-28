const {logEvents} = require('./LogEvents');

const errorHandler = (err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errLogs.txt');
    console.error(`${err.stack}`);
    res.status(500).send(`${err.message}`);
}

module.exports = errorHandler;