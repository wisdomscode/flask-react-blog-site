import React from "react";
import { useAuth } from "../auth_provider";
import { useState, useEffect } from "react";
import Article from "./Article";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

const LoggedInHome = () => {
  const [articles, setArticles] = useState([]);

  const [showmodal, setShowmodal] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const [articleId, setArticleId] = useState(0);

  const [showdelmodal, setShowdelmodal] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/articles")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setArticles(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getAllArticles = () => {
    fetch("http://127.0.0.1:5000/api/articles")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setArticles(data);
      })
      .catch((err) => console.log(err));
  };
  // react hook form declarations
  const {
    register,
    reset,
    handleSubmit,
    setValue, // used to select and set the value you want to update
    formState: { errors },
  } = useForm();

  // this is to get the data into our edit form
  const showModal = (id) => {
    setShowmodal(true);
    // console.log("Article " + id);

    setArticleId(id);

    articles.map((article) => {
      if (article.id == id) {
        // console.log(article);
        setValue("author", article.author);
        setValue("title", article.title);
        setValue("body", article.body);
      }
    });
  };

  // close modal
  const closeModal = () => {
    setShowmodal(false);
  };

  // this is to update and send the data to the updateapi
  const updateArticleForm = (data) => {
    // console.log(data);
    // console.log(articleId);

    const body = {
      author: data.author,
      title: data.title,
      body: data.body,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(
      `http://127.0.0.1:5000/api/article/update/${articleId}`,
      requestOptions
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.message);
        console.log(data.article);

        // setServerResponse(data.message);
        // // console.log(serverResponse);

        // const new_article = [...articles, data.article];
        // setArticles(new_article);

        reset();
        setShowmodal(false);
        getAllArticles();

        // or to keep it simple we can just reload our page
        // const reload = window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const showDeleteModal = (id) => {
    setShowdelmodal(true);
    // console.log(id);
    setArticleId(id);
  };

  const deleteArticleForm = () => {
    // console.log("delete");
    // console.log(articleId);

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      `http://127.0.0.1:5000/api/article/delete/${articleId}`,
      requestOptions
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);

        setShowdelmodal(false);

        getAllArticles();
      })
      .catch((err) => console.log(err));
  };

  const closeDelModal = () => {
    setShowdelmodal(false);
  };

  return (
    <div>
      <Modal show={showmodal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(updateArticleForm)}>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showdelmodal} onHide={closeDelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <h4 className="text-center">
              Are you sure you want to DELETE this Article?
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDelModal}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteArticleForm}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <h1>All Posts</h1>

      {articles != "" ? (
        articles &&
        articles.map((article, index) => (
          <Article
            key={index}
            title={article.title}
            body={article.body}
            author={article.author}
            date_posted={article.date_posted}
            onClick={() => showModal(article.id)}
            onClickDelete={() => showDeleteModal(article.id)}
          />
        ))
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div>
      <h1>Welcome Login to view all posts</h1>
    </div>
  );
};

function Home() {
  const [logged] = useAuth();
  return <>{logged ? <LoggedInHome /> : <LoggedOutHome />}</>;
}

export default Home;
