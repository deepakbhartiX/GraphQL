//this is the main error handler middlerware in this whole error handling environment which do one thing it catches error whch passed though next(error) which come from async handler and then this middleare which present in the last of code catch that error and send as a json response to user.

function errorHandler(err,req,res,next){

    console.log(`message:${err.message}`)
    res.status(err.statusCode || 5000).json({
        status:'error',
        message:err.message||"Internal Server Error"
    })
}

module.exports={
    errorHandler
}
