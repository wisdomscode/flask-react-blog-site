import React from "react";
import { Card } from "react-bootstrap";

function UserDetail(props) {
  return (
    <>
      <div className="col-lg-4 col-md-6 m-3" key={props.users.id}>
        <Card style={{ width: "22rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Name: {props.users.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Email: {props.users.email}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Profession: Software engineer
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">View Profile</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default UserDetail;
