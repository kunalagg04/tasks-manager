
//Callback
const doWork = (callback) => {
    setTimeout(
        () => {
            callback("Done", undefined)
        } , 2000 )
}

doWork((result , error) => {
    if(error)  {
         console.log(error)
    }
    else{
        console.log(result)
    }
})

//Promises
const doPromise = new Promise( (resolve,reject) => {
    setTimeout(() => {
        //you can call either resolve or reject or call one of them multiple times
        // resolve("done")
        reject("Unhandled")
    } , 2000)
} )

doPromise.then((result) => {
    console.log(result)
}).catch( (error) => {
    console.log(error)
})