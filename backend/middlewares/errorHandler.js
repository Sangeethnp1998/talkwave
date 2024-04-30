const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode;
    res.status(statusCode);
    res.json({
        message : err.message
    })
}

const ResourceNotFound = (req, res, next) => {
    res.status(404).json({
            statusCode: 404,
            error: 'Not Found' 
        });
}

module.exports = { errorHandler,ResourceNotFound}