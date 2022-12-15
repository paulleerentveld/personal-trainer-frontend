import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Exercise from '../../pages/exercises/exercises';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image'

function WorkoutPreview(props) {


/*     useEffect(() => {
        console.log(props.data);
        //console.log(client);
    }) */

/* function handleExercisePreview() {
  //props.setExercisePreview(exercise)
  console.log("test")
} */



    // {cellInfo.data.videoupload_url? <video  ref={videoRef} className="uploadedVideo" width="100%" controls src={cellInfo.data.videoupload_url} ></video> : null}

  return (
      <Modal show={props.showPreview} onHide={props.handleClose} backdrop="static" style={{overlay: {zIndex: 3}}}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.name} - Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
{/*             <Tabs
            defaultActiveKey="image"
            id="image-video-tabs"
            className="mb-3"
            fill
            >
            {props.data.imageupload_url? <Tab eventKey="image" title="Image">
                    <img
                    className="d-block w-100"
                    src={props.data.imageupload_url}
                    alt="Exercise Image"
                    height="500"
                    />
            </Tab> : null }
            {props.data.videoupload_url? <Tab eventKey="video" title="Video">
                    <video  
                    className="d-block w-100"
                    height="500"
                    controls 
                    src={props.data.videoupload_url} >
                    </video>
            </Tab> : null }
            </Tabs> */}
            
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