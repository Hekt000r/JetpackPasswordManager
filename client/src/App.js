import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
function App() {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords")
      .then((response) => {
        setPasswordList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleAddPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    });
  };
  const decryptpass = (encryption) => {
    Axios.post("http://localhost:3001/decryptpass", { password: encryption.password, iv: encryption.iv }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id == encryption.id
            ? {
                id: val.id,
                password: val.password,
                title: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };
  
  return (
    <div className="App">
      <div className="AddingPassword center-x y-25">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-white">Site</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the site for this password"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddPassword} type="submit">
            Create
          </Button>
        </Form>
      </div>
      <div className="passwords">
        {passwordList.map((item) => {
          return (
            <>
              <Container>
                <Row className="Passwords">
                  <Col>
                    <h3 className="text-default">{item.title} :</h3>{" "}
                    <Button onClick={() => {decryptpass({password: item.password, iv: item.iv, id: item.id,})}}>Show password</Button>

                  </Col>
                </Row>
              </Container>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
