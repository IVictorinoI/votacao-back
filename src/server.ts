import App from './app';
import AuthenticationController from './infra/authentication/authentication.controller';
import TestController from './controller/test/TestController'
import AssemblyRepoMongo from './repository/assembly/AssemblyRepoMongo';
import AssemblyApplication from './application/assembly/AssemblyApplication';
import AssemblyController from './controller/assembly/AssemblyController';
import UserController from './controller/user/UserController'
import UserAplication from './application/user/UserApplication'
import UserRepoMongo from './repository/user/UserRepoMongo'
import UserService from './domain/user/services/UserService'


function getAssemblyController() {
  const assemblyRepo = new AssemblyRepoMongo()
  const assemblyApplication = new AssemblyApplication(assemblyRepo)

  return new AssemblyController(assemblyApplication)
}

function getUserController() {
  const userRepo = new UserRepoMongo()
  const userService = new UserService(userRepo)
  const userApplication = new UserAplication(userRepo, userService)


  return new UserController(userApplication)
}

const app = new App(
  [
    new AuthenticationController(),
    new TestController(),
    getUserController(),
    getAssemblyController()
  ],
);

app.listen();
