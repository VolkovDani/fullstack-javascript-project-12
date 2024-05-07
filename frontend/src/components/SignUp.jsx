import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import MainHeader from './MainHeader';
import signUpAvatarImage from '../assets/avatar_1.jpg';
import { signUpSchema } from '../validation/schema';
import { signUpRequest } from '../network/requests';

const SignUp = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'SignUp' });
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
                    alt={t('alt.avatar')}
                  />
                </div>
                <Formik
                  initialValues={{
                    username: '',
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
                        if (err.response.status === 409) actions.setFieldError('username', t('errors.userExists'));
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
                          {
                            t('Form.title')
                          }
                        </Card.Title>
                        <Form.Group
                          className="mb-3 position-relative"
                        >
                          <Form.Control
                            value={props.values.username}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            isInvalid={props.touched.username && props.errors.username}
                            name="username"
                            type="text"
                            placeholder={t('Form.username')}
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {props.errors.username}
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
                            placeholder={t('Form.password')}
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
                            placeholder={t('Form.confirmPassword')}
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
                          type="submit"
                          className="w-100"
                          onSubmit={props.handleSubmit}
                        >
                          {
                            t('Form.confirmRegister')
                          }
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Card.Body>
              <Card.Footer
                className="text-center p-3"
              >
                <span
                  className="m-1"
                >
                  {
                    t('Form.alreadyHaveAccount')
                  }
                </span>
                <Card.Link
                  href="/login"
                  aria-label={t('Form.aria.backToLogin')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  {
                    t('Form.backToLogin')
                  }
                </Card.Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
