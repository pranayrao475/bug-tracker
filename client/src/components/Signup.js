import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createUser } from '../utils/api';
import Auth from '../utils/auth';
import styled from "styled-components"



const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const user = await response.json();
      const finalUser = await user;
      Auth.recordLogin(finalUser.token);
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
              Something went wrong with your signup!
            </Alert>

            <Form.Group className='p-4'>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your username"
                name="username"
                onChange={handleInputChange}
                value={userFormData.username}
                required
              />
              <Form.Control.Feedback type="invalid">
                Username is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='p-4'>
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
            <div className="p-4 d-flex justify-content-center">
              <Button
                disabled={
                  !(
                    userFormData.username &&
                    userFormData.password 
                  )
                }
                type="submit"
                variant="secondary"
              >
                Signup
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center">
          <Button
            href="/"
            type="submit"
            style={{ backgroundColor: "blue", color: "white", fontWeight: "bold", border: "none" }}
          >
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SignupForm;

// const SignupButton= styled.div`
// background-color: red;
//   color: white;
//   padding: 5px 20px;
//   margin: 8px 0;
//   border: none;
//   cursor: pointer;
//   max-width:50%;
//   opacity: 0.9;
// `
const Container= styled.div`
background-color:#fae2cf;

`