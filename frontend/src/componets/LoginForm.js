import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../auth_provider";

import { useNavigate } from "react-router-dom"; // for redirecting

function LoginForm() {
  const [user, setUser] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // useNavigate is used to redirect to another page programmatically
  let navigate = useNavigate();

  const submitLoginForm = (data) => {
    // console.log(data);
    const body = {
      email: data.email,
      password: data.password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("http://127.0.0.1:5000/api/login", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data); // all data object
        // console.log(data.access_token);  // only access_token

        // this is used to log in with the access token
        login(data.access_token);

        // this is used to redirect to another page and passing data to the new page
        navigate("/", {
          replace: true,
          state: { user: setUser(data.user) },
        });
      })
      .catch((err) => console.log(err));

    reset();
  };

  return (
    <>
      <h1 className="bg-dark text-light title_label">Login Page</h1>

      <Form onSubmit={handleSubmit(submitLoginForm)} className="form_box">
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true, maxLenght: 50 })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>Email is required</span>
          )}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 4 })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>Password is required</span>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>

        <Form.Group className="mt-4">
          Do not have an account? <Link to="/register">Register Here</Link>
        </Form.Group>
      </Form>
    </>
  );
}

export default LoginForm;
