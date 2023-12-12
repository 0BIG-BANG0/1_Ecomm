import jwt from 'jsonwebtoken'

const jwtAuth = (req,res,next)=>{
    //1. Read the token
    // console.log(req.headers)
    const token = req.headers['authorization'];
    console.log(token)
    //2. If no token, return the error
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    //3. Check if token is valid.
    try{
        const payload = jwt.verify(
            token,
            'qazEWYzU8USwNL2hKWz0yVmHGmYocI3T'
        );
        // console.log(payload);
    }catch(err){
    //4. return error.
    console.log(err);
    return res.status(401).send('Unauthorized');
    }
    //5. Call next middleware
    next();
}

export default jwtAuth;