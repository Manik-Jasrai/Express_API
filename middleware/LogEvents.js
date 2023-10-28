const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname,'..',
         'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

//we can instead create a looger function
const logger = (req,res,next)=>{
    //we create a log events file
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqlogs.txt');
    console.log(`${req.method}\n${req.url}`);
    // a next is necessary in a custom middleware
    next();
}

module.exports = {logger,logEvents};