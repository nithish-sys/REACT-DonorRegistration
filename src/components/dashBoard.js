import React, { useEffect, useState } from "react";
import "./index.css";
import { Card, Button, Alert, Navbar, Container, Table } from "react-bootstrap";
import { useAuth } from "./authContext";
import {
  Link,
  useHistory,
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const DashBoard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [donars, setDonars] = useState([]);
  const history = useHistory();
  const colRef = collection(db, "Donar-Data");

  //query section---------------------------------------------
  useEffect(() => {
    const getDonars = async () => {
      const q = query(
        colRef,
        where("nearto", "==", "pitapuram"),
        where("bloodgroup", "==", "B+")
      );
      const data = await getDocs(colRef);
      setDonars(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDonars();
  }, []);
  //logout function-------------------------------------
  async function handleLogout() {
    setError(" ");

    try {
      await logout();
      history.push("/AdminLogin");
    } catch {
      setError("failed to logout");
    }
  }
  //delete donar------------------------------
  const deleteDonar = async (id) => {
    const donardoc = doc(db, "Donar-Data", id);
    if (window.confirm("are you sure to delete this donar")) {
      await deleteDoc(donardoc);
      window.location.reload();
    } else {
      return;
    }
  };
  //update donar-------------------------------------------
  return (
    <>
      <Navbar bg="light" expand="lg" id="navi">
        <Container fluid>
          <Navbar.Brand>
            <strong>Logined as:</strong> {currentUser && currentUser.email}
          </Navbar.Brand>
          <Button
            id="logout"
            className="btn btn-secondary"
            style={{ color: "white", textDecoration: "none" }}
            variant="link"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Container>
      </Navbar>
      <Card id="table">
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>location</th>
              <th>phone</th>
              <th>near to</th>
              <th>blood group</th>
            </tr>
          </thead>
        </Table>
        {donars.map((donar) => {
          return (
            <div>
              {" "}
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td>{donar.name}</td>
                    <td>{donar.location}</td>
                    <td>{donar.phone}</td>
                    <td>{donar.nearto}</td>
                    <td>{donar.bloodgroup}</td>
                    <td>
                      <Button
                        onClick={() => {
                          deleteDonar(donar.id);
                        }}
                        variant="danger"
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        })}
      </Card>
    </>
  );
};

export default DashBoard;
