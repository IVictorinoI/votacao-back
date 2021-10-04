import { Request, Response, NextFunction, Router } from 'express';

import Controller from '../../infra/interfaces/controller.interface';
import Assembly from '../../domain/assembly/Assembly'
import AssemblyDto from '../../domain/assembly/AssemblyDto'
import IAssemblyApplication from '../../application/assembly/IAssemblyApplication';
import authMiddleware from '../../infra/middleware/auth.middleware';

class AssemblyController implements Controller {
    public path = '/assemblys';
    public router = Router();
    assemblyApplication: IAssemblyApplication

    constructor(assemblyApplication: IAssemblyApplication) {
        this.initializeRoutes();
        this.assemblyApplication = assemblyApplication
      }
    
      private initializeRoutes() {
        this.router
        .get(this.path, this.getAll)
        .patch(`${this.path}/:id`, this.modify)
        .post(`${this.path}/`, this.create);
      }

      private getAll = async (req: Request, res: Response) => {
          const assemblys = await this.assemblyApplication.getAll()
          res.send(assemblys)
      }

      private modify = async (req: Request, res: Response) => {
        const id = req.params.id;
        const data: Assembly = req.body;
        const assembly = await this.assemblyApplication.update(id, data)
        if (assembly) {
            res.send(assembly);
        } else {
          //error
        }
      }

      private create = async (req: Request, res: Response) => {
        const data: AssemblyDto = req.body;
        const assembly = await this.assemblyApplication.create(data)
        res.send(assembly);
      }
}

export default AssemblyController