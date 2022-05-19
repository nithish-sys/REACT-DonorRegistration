import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const Requirement = () => {
  const [newName, setValue] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newProblem, setNewproblem] = useState("");
  const history = useHistory();
  const token = "5105359536:AAFeyyIF_-gmcmE71Nx2JYXhxP43bpuur-I";
  const chat_id = "-1001640061480";
  const text = `Requirement : %0A name :${newName} %0A phone: ${newPhone} %0A problem: ${newProblem}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`;
  const handle = (e) => {
    e.preventDefault();
    if (!newName || !newPhone || !newProblem) {
      toast.error("All fields are mandatory!");
      return;
    } else {
      let api = new XMLHttpRequest();
      api.open("GET", url, true);
      api.send();
    }
    alert("requested sucessfully");
    setTimeout(() => history.push("/home"), 1000);
  };
  return (
    <div>
      <ToastContainer />
      <Form noValidate id="req" onSubmit={handle}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=" enter Name"
              value={newName}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="enter Contact number"
              value={newPhone}
              onChange={(event) => {
                setNewPhone(event.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group
          as={Col}
          className="mb-3"
          md="6"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>problem</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newProblem}
            placeholder="cause like accident or operation ect..."
            onChange={(event) => {
              setNewproblem(event.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit" variant="warning">
          request
        </Button>
      </Form>
    </div>
  );
};

export default Requirement;
