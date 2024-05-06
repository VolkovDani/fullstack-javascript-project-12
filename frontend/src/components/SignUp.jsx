import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import MainHeader from './MainHeader';
import signUpAvatarImage from '../assets/avatar_1.jpg';
import { signUpSchema } from '../validation/schema';
import { signUpRequest } from '../network/requests';

const SignUp = () => {
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
                    src={signUpAvatarImage}
                    alt="Аватар"
                  />
                </div>
                <Formik
                  initialValues={{
                    login: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validateOnBlur
                  validationSchema={signUpSchema}
                  onSubmit={(values, actions) => {
                    signUpRequest(values)
                      .then((res) => {
                        console.log(res);
                        const token = JSON.stringify(res.data);
                        localStorage.setItem('user', token);
                      })
                      .then(() => {
                        navigate('/');
                      })
                      .catch((err) => {
                        if (err.response.status === 409) actions.setFieldError('login', 'Это имя уже занято');
                        else throw new Error(err);
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
                          Регистрация
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
                        <Form.Group
                          className="mb-3 position-relative"
                        >
                          <Form.Control
                            isInvalid={
                              props.touched.confirmPassword && props.errors.confirmPassword
                            }
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            name="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            aria-label="Повторите пароль"
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {props.errors.confirmPassword}
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
                          Регистрация
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
