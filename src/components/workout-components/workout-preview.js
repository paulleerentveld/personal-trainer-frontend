import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './workout-preview.scss';


function WorkoutPreview(props) {
  



  return (
      <Modal show={props.showPreview} onHide={props.handleClose} backdrop="static" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.name} - Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {console.log(props.data)}
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={props.data.name} disabled={true} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name='category' value={props.data.workouttype} disabled={true}  >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <br></br>
            </Form>
            <h6 style={{textAlign: "center", textDecoration: "underline"}} >Exercises</h6>
            {props.data.exercises?.map( (exercise,index) => 
                <Container>
                  <Row onClick={() => { props.handleExercisePreview(exercise);}}>
                    <Col>
                      <h6 >{index+1}. - {exercise.name}</h6>
                      <p >Desc: {exercise.description}</p>
                    </Col>
                    <Col>
                      <img src={exercise.imageupload_url} alt="Exercise Image" height="200"  />
                    </Col>
                  </Row>
                </Container>
/*                 <Stack className="m-5" gap={2} direction="horizontal">
                <div>
                  <h6 style={{textAlign: "left"}}>{index+1}. - {exercise.name}</h6>
                  <p style={{textAlign: "left"}}>Desc: {exercise.description}</p>
                </div>
                <img className="rounded d-block" src={exercise.imageupload_url} alt="Exercise Image" height="200" onClick={() => { props.handleExercisePreview(exercise);}} />
              </Stack> */
              )}
              
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export { WorkoutPreview }