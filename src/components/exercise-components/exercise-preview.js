import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './exercise-preview.scss';

function ExercisePreview(props) {

/*     useEffect(() => {
        console.log(props.data);
        //console.log(client);
    }) */





    // {cellInfo.data.videoupload_url? <video  ref={videoRef} className="uploadedVideo" width="100%" controls src={cellInfo.data.videoupload_url} ></video> : null}

  return (
      <Modal show={props.show} onHide={props.handleClose} fullscreen >
        <Modal.Header closeButton>
          <Modal.Title>{props.data.name} - Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Tabs
            defaultActiveKey="image"
            id="image-video-tabs"
            className="mb-3"
            fill
            >
            {props.data.imageupload_url? <Tab eventKey="image" title="Image">
                    <img
                    className="d-block mx-auto "
                    src={props.data.imageupload_url}
                    alt="Exercise Image"
                    //height="500"
                    width="60%"
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
            </Tabs>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={props.data.name} disabled={true} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name='description' value={props.data.description} disabled={true} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name='category' value={props.data.category} disabled={true}  >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body Part</Form.Label>
                    <Form.Control type="text" name='bodypart' value={props.data.bodypart} disabled={true} >
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export { ExercisePreview }