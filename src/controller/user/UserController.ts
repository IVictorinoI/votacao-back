import { Request, Response, NextFunction, Router } from 'express';

import Controller from '../../infra/interfaces/controller.interface';
import User from '../../domain/user/User'
import UserDto from '../../domain/user/UserDto'
import IUserApplication from '../../application/user/IUserApplication';
import LogInDto from '../../domain/user/LogInDto'
import { compare } from 'bcrypt'
import WrongCredentialsException from '../../infra/exceptions/WrongCredentialsException';
import TokenData from '../../infra/interfaces/tokenData.interface';
import DataStoredInToken from '../../infra/interfaces/dataStoredInToken';
import * as jwt from 'jsonwebtoken';
import authMiddleware from '../../infra/middleware/auth.middleware';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    userApplication: IUserApplication

    constructor(userApplication: IUserApplication) {
        this.initializeRoutes();
        this.userApplication = userApplication
      }
    
      private initializeRoutes() {
        this.router
        .get(this.path, this.getAll)
        .patch(`${this.path}/:id`, this.modify)
        .delete(`${this.path}/:id`, this.delete)
        .post(`${this.path}/`, this.create)
        .post(`${this.path}/login`, this.loggingIn)
        .post(`${this.path}/logout`, this.loggingOut)
        .post(`${this.path}/validateToken`, authMiddleware, this.validateToken);
      }

      private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await this.userApplication.getByEmail(logInData.email)

        if (user) {
          const isPasswordMatching = await compare(
            logInData.password || 'x',
            user.password,
          );
          if (isPasswordMatching) {
            const tokenData = this.createToken(user);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            
            response.send({
              ...user,
              token: tokenData.token
            });
          } else {
            next(new WrongCredentialsException());
          }
        } else {
          next(new WrongCredentialsException());
        }
      }

      private validateToken = async (request: Request, response: Response, next: NextFunction) => {
        response.send({
          OK: true
        });
      }

      private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }      

      private createToken(user: User): TokenData {
        const expiresIn = 60 * 60 * 24; // an day
        const secret = process.env.JWT_SECRET || 'banana';
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
        };
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }      

      private loggingOut = (request: Request, response: Response) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
      }      

      private getAll = async (req: Request, res: Response) => {
          const users = await this.userApplication.getAll()
          res.send(users)
      }

      private modify = async (req: Request, res: Response) => {
        const id = req.params.id;
        const data: User = req.body;
        const user = await this.userApplication.update(id, data)
        if (user) {
            res.send(user);
        } else {
          //error
        }
      }

      private delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = await this.userApplication.delete(id)
        if (user) {
            res.send(user);
        } else {
          //error
        }
      }

      private create = async (req: Request, res: Response) => {
        const data: UserDto = req.body;
        const user = await this.userApplication.create(data)
        res.send(user);
      }
}

export default UserController