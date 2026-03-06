//this custom error which is use in code instead of using try and catch everywhere in code to send error message or statuscode then that error will pass to async handler which wrap all routes and contorllers that function will catch that error created by using custom error class like - throw new AppError('user not found',404) then it use next(error) then that error will catch by global error handerl middlerware and send respone as json to user.


class AppError extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode
        this.isOperational = true
    }
}

module.exports={
    AppError
}