import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

function RegisterUserForm() {
  // const [inputs, setInputs] = useState({});

  // for bootstrap alert
  const [show, setShow] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  // handle the change to allow for input text to work
  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  // Validation
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitRegisterForm = (data) => {
    // console.log(data);

    if (data.password === data.confirm_password) {
      const body = {
        name: data.name,
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

      // using fetch

      fetch("http://127.0.0.1:5000/api/register", requestOptions)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setServerResponse(data.message);
          console.log(serverResponse);

          setShow(true);

          setTimeout(() => {
            setShow(false);
          }, 5000);
        })
        .catch((err) => console.log(err));

      reset();
    } else {
      alert("Passwords do not match");
    }

    // alert(
    //   inputs.name + inputs.email + inputs.password + inputs.confirm_password
    // );

    // setInputs("");
  };

  // console.log(watch("email"));

  return (
    <>
      <h1 className="bg-dark text-light title_label">Registration Page</h1>
      <Form onSubmit={handleSubmit(submitRegisterForm)} className="form_box">
        {show ? (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <p>{serverResponse}</p>
          </Alert>
        ) : (
          <></>
        )}

        <Form.Group className="mb-4" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            // name="name"
            // value={inputs.name || ""}
            // onChange={handleChange}

            // using react hook form validation
            {...register("name", { required: true, maxLength: 50 })}
          />
          {errors.name && (
            <span style={{ color: "red" }}>
              Name is required <br />{" "}
            </span>
          )}
          {errors.name?.type === "maxLength" && (
            <span style={{ color: "red" }}>
              Characters Must be less than 50
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true, maxLength: 50 })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>
              Email is required <br />
            </span>
          )}
          {errors.email?.type === "maxLength" && (
            <span style={{ color: "red" }}>
              Characters Must be less than 50
            </span>
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
            <span style={{ color: "red" }}>
              Password is required <br />{" "}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span style={{ color: "red" }}>
              Characters Must be greater than 4
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicComfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password", { required: true, minLength: 4 })}
          />
          {errors.confirm_password && (
            <span style={{ color: "red" }}>
              Confirm Password is required <br />{" "}
            </span>
          )}
          {errors.confirm_password?.type === "minLength" && (
            <span style={{ color: "red" }}>
              Characters Must be greater than 4
            </span>
          )}
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
        <Form.Group className="mt-4">
          Already have an account? <Link to="/login">Login Here </Link>
        </Form.Group>
      </Form>
    </>
  );
}

export default RegisterUserForm;
