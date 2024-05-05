/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { users as usersRoutes } from '../utils/routes';
import { loginSchema } from '../validation/schema';

const UsernameInput = () => (
  <div className="form-floating mb-3">
    <Field
      name="username"
      type="text"
      className="form-control"
      placeholder="username"
    >
      {
        ({
          field,
          meta,
        }) => (
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              {...field}
            />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )
      }
    </Field>
  </div>
);

const PasswordInput = () => (
  <div className="form-floating mb-3">
    <Field
      type="text"
      name="password"
      className="form-control"
      placeholder="password"
    >
      {
        ({
          field,
          meta,
        }) => (
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Password"
              {...field}
            />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )
      }
    </Field>
  </div>
);

const LoginForm = () => {
  const [errorState, setError] = useState(null);
  const navigator = useNavigate();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        axios({
          method: 'post',
          url: usersRoutes.login(),
          data: {
            username: values.username,
            password: values.password,
          },
        }).then((res) => {
          const token = JSON.stringify(res.data);
          localStorage.setItem('user', token);
        }).then(() => {
          navigator('/');
        })
          .catch(setError);
      }}
    >
      {() => (
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5 ">
              <Form>
                <h1>Войти</h1>
                <UsernameInput />
                <PasswordInput />
                {errorState
                  ? <div className="error">{errorState.message}</div>
                  : null}
                <button type="submit">Оправить</button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

const Login = () => (
  <LoginForm />
);

export default Login;
