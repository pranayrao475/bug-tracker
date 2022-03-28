import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { userLogin } from '../utils/api';
import Auth from '../utils/auth';
import styled from "styled-components"

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await userLogin(userFormData);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token } = await response.json();
      Auth.recordLogin(token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <Container>
      <div className="row">
        <div className="d-flex justify-content-center p-4">
          <Form style={{ width: "30rem", boxShadow: "5px 5px 10px gray" }} noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your login credentials!
            </Alert>
            <Form.Group className="p-4">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                onChange={handleInputChange}
                value={userFormData.username}
                required
              />
              <Form.Control.Feedback type="invalid">
                Username is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="p-4">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
            <div className=" p-4 d-flex justify-content-center">
              <LoginButton
               
                disabled={!(userFormData.username && userFormData.password)}
                type="submit"
                variant="secondary"
              >
                Login
              </LoginButton>
            </div>
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center">
          <Button
            href="/signup"
            type="submit"
            style={{ backgroundColor: "blue", color: "white", fontWeight: "bold", border: "none" }}
          >
            Sign-Up
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;

const LoginButton= styled.div`
background-color: red;
  color: white;
  padding: 5px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  max-width:50%;
  opacity: 0.9;
`
const Container= styled.div`
background-color:#fae2cf;

`