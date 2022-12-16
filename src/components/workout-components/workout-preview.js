import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image'


function WorkoutPreview(props) {
  



  return (
      <Modal show={props.showPreview} onHide={props.handleClose} backdrop="static" style={{overlay: {zIndex: 3}}}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.name} - Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
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
            </Form>

            {props.data.exercises?.map( (exercise,index) => 
                <Stack className="justify-content-md-center" gap={2}>
                  <h6 style={{textAlign: "center"}}>{exercise.name}</h6>
                  <p style={{textAlign: "center"}}>{exercise.description}</p>
                  <img className="rounded mx-auto d-block" src={exercise.imageupload_url} alt="Exercise Image" width="40%" onClick={() => { props.handleExercisePreview(exercise);}} />
                  {/* <Button onClick={() => { props.handleExercisePreview(exercise);}} >Open</Button>  */}
                  <br></br>
                  <br></br>
                </Stack>
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