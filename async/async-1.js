const doWork = () => {

    return new Promise( (resolve,reject) => {
        setTimeout( () => {
            resolve("done")
        },2000)
       
    })

} 

const doWorks = () => {

    return new Promise( (resolve,reject) => {
      
            resolve("done")
    }   
    )
} 


doWork().then((r) => {
    console.log(r)
})

console.log(doWorks()) 