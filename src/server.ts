import App from './app';
import AuthenticationController from './infra/authentication/authentication.controller';
import UserController from './infra/user/user.controller';
import TestController from './controller/test/TestController'
import AssemblyRepoMongo from './repository/assembly/AssemblyRepoMongo';
import AssemblyApplication from './application/assembly/AssemblyApplication';
import AssemblyController from './controller/assembly/AssemblyController';


function getAssemblyController() {
  const assemblyRepo = new AssemblyRepoMongo()
  const assemblyApplication = new AssemblyApplication(assemblyRepo)

  return new AssemblyController(assemblyApplication)
}

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new TestController(),
    getAssemblyController()
  ],
);

app.listen();
