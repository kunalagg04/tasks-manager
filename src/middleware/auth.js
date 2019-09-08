const auth = (req,res,next) => {
     console.log('hi i am middleware')
     next()
}

module.exports = auth