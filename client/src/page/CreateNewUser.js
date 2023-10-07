import React,{useState} from 'react';
//import {TextField, Typography, Card} from "@material-ui/core";
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import CreateUser from "../../public/image/user.png";

import './CreateNewUser.css';

function CreateNewUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
/*
  function handleSignup(e){
      e.preventDefault();
      signup({name,email, password});
  }
  */
  return (
    <Container>
        <Row >
            <Col md={6} className="signup__form--container">
                <Form style={{width: "100%"}} /*onSubmit={handleSignup}*/>
                    <h1>Create an account</h1>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" value={name} required onChange={(e) => setName(e.target.value)}/>                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>                        
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>                        
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" >Create account</Button>
                    </Form.Group>
                    <p className='pt-3 text-center'>
                        Don't have an account? <Link to="/login">Login</Link>{" "}
                    </p>

                </Form>
            </Col>
            <Col md={6} className="signup__image--container">
            </Col>
        </Row>
    </Container>
  )
}

export default CreateNewUser;