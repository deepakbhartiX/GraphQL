//wrap your routes and controller with this function to handle error and if any error occur in contorller or routes then that error will pass to  global erorr handler middleware function which is prasent in the last of code as middleware which catch error and then that middleware send json response to use about .

const { error } = require("node:console")

const asynchandler = fn =>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

module.exports={asynchandler}