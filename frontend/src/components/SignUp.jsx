import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import MainHeader from './MainHeader';
import signUpAvatarImage from '../assets/avatar_1.jpg';

const SignUp = () => (
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
          xxl="6"
        >
          <Card className="shadow-sm">
            <Card.Body
              className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5"
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
                }}
                onSubmit={(values, actions) => {
                  console.log(values, actions);
                }}
              >
                {
                  (props) => (
                    <Form
                      onSubmit={props.handleSubmit}
                      className="w-50"
                    >
                      <Card.Title
                        as="h1"
                      >
                        Регистрация
                      </Card.Title>
                      <Form.Group>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Ваш ник"
                        />
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Пароль"
                        />
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Подтвердите пароль"
                        />
                        <Button>
                          Зарегистрироваться
                        </Button>
                      </Form.Group>
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

export default SignUp;
