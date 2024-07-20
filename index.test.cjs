const Logger = require("./dist/index.cjs");
const logger = new Logger({timeZone:"UTC"});


logger.on("log",(str)=>{
    console.log(str)
})
logger.log("this is log");