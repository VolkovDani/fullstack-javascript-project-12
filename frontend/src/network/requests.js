import axios from 'axios';
import { users as usersRoutes } from '../utils/routes';

export const loginRequest = (values) => axios({
  method: 'post',
  url: usersRoutes.login(),
  data: {
    username: values.login,
    password: values.password,
  },
}).then((res) => {
  const token = JSON.stringify(res.data);
  localStorage.setItem('user', token);
});

export const signUpRequest = (values) => axios({
  method: 'post',
  url: usersRoutes.signup(),
  data: {
    username: values.login,
    password: values.password,
  },
});
