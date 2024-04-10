import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { users } from './routes';


const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Минимальное количество символов - 5')
    .max(30, 'Максимальное количество символов - 30')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(5, 'Минимальное количество символов - 5')
    .max(30, 'Максимальное количество символов - 30')
    .required('Обязательное поле')
})

export default function Login() {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState('');
  return (
    <>
      <h1>Hello from LOGIN</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
          axios({
            method: 'post',
            url: users.login(),
            data: {
              username: values.username,
              password: values.password,
            }
          }).then((res) => {
            console.log(res.headers);
            localStorage.setItem('user', JSON.stringify(res.data));
          }).then(() => {
            // редирект на главную страницу
            navigate('/');
          })
            .catch((err) => {
              console.error(err);
              setErrorState(err.message);
            })
        }}
      >
        {({ errors: validationErrors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="username"
                name="username"
                className="form-control"
              />
              {validationErrors.username && touched.username ? (
                <div>{validationErrors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
              />
              {validationErrors.password && touched.password ? (
                <div>{validationErrors.password}</div>
              ) : null}
            </div>
            {errorState
              ? (<div>{errorState}</div>)
              : null}
            <button type="submit">Оправить</button>
          </Form>
        )}
      </Formik>
    </>
  )
}