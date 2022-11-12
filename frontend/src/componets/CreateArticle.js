import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // for redirecting

function CreateArticle() {
  const [serverResponse, setServerResponse] = useState("");
  let navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitArticleForm = (data) => {
    // console.log(data);

    // to get the token of the logged in user
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    // console.log(token);

    // const body = {
    //   author: data.author,
    //   title: data.title,
    //   body: data.body,
    // };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    };

    fetch("http://127.0.0.1:5000/api/article/create", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setServerResponse(data.message);
        console.log(serverResponse);

        reset();

        navigate("/", {
          replace: true,
          state: { serverResponse: setServerResponse(data.serverResponse) },
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form onSubmit={handleSubmit(submitArticleForm)}>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control {...register("author", { required: true })} />
        {errors.author && (
          <span style={{ color: "red" }}>
            Author is required <br />{" "}
          </span>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select Article Category</Form.Label>
        <Form.Select>
          <option>Politics</option>
          <option>Sports</option>
          <option>Fashion</option>
          <option>Cars</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Article Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Article Title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span style={{ color: "red" }}>
            Title is required <br />{" "}
          </span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="body"
          {...register("body", { required: true })}
        />
        {errors.body && (
          <span style={{ color: "red" }}>
            Body is required <br />{" "}
          </span>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateArticle;
