//A predefined func which returns a promise
const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(a<0 || b<0){
                return reject ('Please enter positive numbers')
            }
            resolve(a+b)
        },2000)
    })
}

//creating a func using async await to handle async tasks -- basically avoiding promise chaining.
const doWork = async () => {
     const sum = await add(1,2)
     const sum2 = await add(40, sum)
     return sum2 
}

//calling async func with a sungle then statement.
doWork().then((r) => {
    console.log(r)
}).catch((e) => {
    console.log(e)
})
 
console.log(doWork())