import React from "react";
import { Card, Button, Modal } from "react-bootstrap";

function Article({ title, body, author, date_posted, onClick, onClickDelete }) {
  return (
    <Card className="card">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          <small>Author: {author} </small>
          <small>Date: {date_posted} </small>
        </Card.Subtitle>

        <div className="d-flex justify-content-between" style={{}}>
          <Button variant="primary">Read...</Button>

          <span>
            <Button
              variant="secondary"
              style={{ marginRight: "20px" }}
              onClick={onClick}
            >
              Update
            </Button>
            <Button variant="danger" onClick={onClickDelete}>
              Delete
            </Button>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Article;
