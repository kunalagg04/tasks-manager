const doWork = async () => {    
}

//async works similar to returning a Promise explicitly -- refer async-1.js
const doWorks = async () => {
      throw new Error ('error aa gya bc') //similar to reject 
      return 'kunal' //same as resolve

}

// console.log(doWork())
// console.log(doWorks())

doWorks().then((r) => {
    console.log(r)
}).catch((e) => {
    console.log(e)
})

