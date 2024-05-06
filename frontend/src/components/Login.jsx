/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

import MainHeader from './MainHeader';
import loginAvatarImage from '../assets/avatar.jpg';
import { loginSchema } from '../validation/schema';
import { loginRequest } from '../network/requests';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex flex-column h-100"
    >
      <MainHeader />
      <Container
        fluid
        className="h-100"
      >
        <Row
          className="justify-content-center align-content-center h-100"
        >
          <Col
            className="col-12"
            md="8"
            xl="6"
            xxl="6"
          >
            <Card className="shadow-sm">
              <Card.Body
                className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-2 p-md-5"
              >
                <div>
                  <img
                    className="rounded-circle"
                    src={loginAvatarImage}
                    alt="Аватар"
                  />
                </div>
                <Formik
                  initialValues={{ login: '', password: '' }}
                  validateOnBlur
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    loginRequest(values)
                      .then(() => {
                        navigate('/');
                      });
                  }}
                >
                  {
                    (props) => (
                      <Form
                        noValidate
                        onSubmit={props.handleSubmit}
                        className="w-50"
                      >
                        <Card.Title
                          as="h1"
                          className="text-center"
                        >
                          Войти
                        </Card.Title>
                        <Form.Group
                          className="mb-3 position-relative"
                        >
                          <Form.Control
                            value={props.values.login}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            isInvalid={props.touched.login && props.errors.login}
                            name="login"
                            type="text"
                            placeholder="Ваш ник"
                            aria-label="Логин"
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {props.errors.login}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 position-relative"
                        >
                          <Form.Control
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            isInvalid={props.touched.password && props.errors.password}
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            aria-label="Пароль"
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {props.errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                          variant={
                            props.isValid
                              ? 'primary'
                              : 'secondary'
                          }
                          disabled={!props.isValid}
                          type="submit"
                          className="w-100"
                          onSubmit={props.handleSubmit}
                        >
                          Войти
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Card.Body>
              <Card.Footer
                className="text-center "
              >
                <span
                  className="m-1"
                >
                  Нет аккаунта?
                </span>
                <Card.Link
                  href="/signup"
                  aria-label="Перейти к регистрации"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                >
                  Регистрация
                </Card.Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// const LoginForm = () => {
//   const [errorState, setError] = useState(null);
//   const navigator = useNavigate();
//   return (
//     <Formik
//       initialValues={{ username: '', password: '' }}
//       validationSchema={loginSchema}
//       onSubmit={(values) => {
//         loginRequest(values)
//           .then(() => {
//             navigator('/');
//           })
//           .catch(setError);
//       }}
//     >
//       {() => (
//         <div className="col-12 col-md-8 col-xxl-6">
//           <div className="card shadow-sm">
//             <div className="card-body row p-5 ">
//               <Form>
//                 <h1>Войти</h1>
//                 <UsernameInput />
//                 <PasswordInput />
//                 {errorState
//                   ? <div className="error">{errorState.message}</div>
//                   : null}
//                 <button type="submit">Оправить</button>
//               </Form>
//             </div>
//           </div>
//         </div>
//       )}
//     </Formik>
//   );
// };
export default Login;
