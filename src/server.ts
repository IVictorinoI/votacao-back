import App from './app';
import AuthenticationController from './infra/authentication/authentication.controller';
import UserController from './infra/user/user.controller';
import TestController from './controller/test/TestController'


const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new TestController()
  ],
);

app.listen();
