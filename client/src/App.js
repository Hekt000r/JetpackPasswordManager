import './App.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
function App() {
  const [title, setTitle] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className="App">
       <div className="AddingPassword center-x y-25">
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Site</Form.Label>
        <Form.Control type="site" placeholder="Enter the site for this password" onChange={(e) => {
          setPassword(e.target.value)
          
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(e) => {
          setTitle(e.target.value)
          
        }} />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
       </div>
    </div>
  );
}

export default App;
