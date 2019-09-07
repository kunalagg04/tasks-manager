const jwt = require('jsonwebtoken')

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1Njc4NjQ4ODl9.SaZbzrIcFacN55Pt-9-1yToimiCTvPcXGdLQVESuy8Q
// this is a how a token looks like - 3 parts 
// first --> base64 --> contains info bout token , algo used tc.
// second --> payload / body --> base64encoded --> contains info we entered
// third --> signature for verification

const func = () => {
    const token = jwt.sign({ _id: 'abc123'} , 'hibc' , { expiresIn : '8 seconds'})
    console.log(token)

    const data = jwt.verify( token , 'hibc')
    //returns the payload if signature is verified
    console.log(data)
    
}

func()