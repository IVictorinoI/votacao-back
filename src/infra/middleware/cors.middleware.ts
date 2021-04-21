import { Request, Response } from 'express';


export default (req: Request, res: Response, next: () => void) => {
    res.header('Access-Control-Allow-Origin', '*')
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    //res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}