import { Request, Response, NextFunction, Router } from 'express';
import Controller from "../../infra/interfaces/controller.interface";

export default class TestController implements Controller {
    public path = '/api/tests';
    public router = Router();    
    constructor() {
        this.initializeRoutes();
    }  

    private initializeRoutes() {
        this.router.get(this.path, this.getAll)
        .patch(`${this.path}/:id`, this.getAll)
        .delete(`${this.path}/:id`, this.getAll)
        .post(`${this.path}/`, this.getAll);
    }
    
    private getAll = async (req: Request, res: Response) => {
        const tests = [{ok: true}]
        res.send(tests)
    }
}