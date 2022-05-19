import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Row, Col, Button, Alert, Card } from "react-bootstrap";

const DonarRegistration = () => {
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBGrp, setNewBgrp] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newNearTo, setNewNearTo] = useState("");
  const usersCollectionRef = collection(db, "Donar-Data");

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName || !newLocation || !newPhone || !newBGrp || !newNearTo) {
      toast.error("All fields are mandatory!");
      return;
    } else {
      await addDoc(usersCollectionRef, {
        name: newName,
        location: newLocation,
        phone: Number(newPhone),
        bloodgroup: newBGrp,
        nearto: newNearTo,
        monthsLeft: Number(4),
      });
    }
    alert("registered sucessfully");
    setTimeout(() => history.push("/home"), 1000);
  };
  return (
    <div id="donar">
      <ToastContainer />
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={newName}
              placeholder=" enter Name"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Current location</Form.Label>
            <Form.Control
              type="text"
              placeholder=" enter Current location"
              value={newLocation}
              onChange={(event) => {
                setNewLocation(event.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Current location.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="enter Contact number"
              value={newPhone}
              onChange={(event) => {
                setNewPhone(event.target.value);
              }}
              maxLength="10"
              minLength="10"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Select
              aria-label="location near to"
              required
              name="newNearTo"
              onChange={(event) => {
                setNewNearTo(event.target.value);
              }}
              style={{ marginBottom: "2em" }}
            >
              <option>select location near to</option>
              <option value="kakinada">kakinada</option>
              <option value="surampalem">surampalem</option>
              <option value="pitapuram">pitapuram</option>
              <option value="rajmundry">rajmundry</option>
              <option value="rajanagaram">rajanagaram</option>
              <option value="N/A">others</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Select
              aria-label="select blood group"
              required
              name="newBGrp"
              onChange={(event) => {
                setNewBgrp(event.target.value);
              }}
              style={{ marginBottom: "2em" }}
            >
              <option>select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="N/A">don't have idea</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button type="submit" variant="warning">
          Submit form
        </Button>
      </Form>
    </div>
  );
};

export default DonarRegistration;
