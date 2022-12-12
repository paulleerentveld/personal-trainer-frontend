import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ExerciseEditForm(props) {

/*     useEffect(() => {
        console.log(props.data);
        //console.log(client);
    }) */



    function handleOnChange(e) {
        const value = e.target.value
        const name = e.target.name
        props.setdata({
            ...props.data,
            [name]: value,
        })
    }

    function handleImageChange(e) {
        const value = e.target.files[0]
/*         props.setdata({
            ...props.data,
            ["avatar"]: value,
        }) */
        props.setNewImage(value)
    }

    function handleVideoChange(e) {
        const value = e.target.files[0]

        props.setNewVideo(value)
    }

  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing {props.data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={props.data.name} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name='description' value={props.data.description} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select name='category' value={props.data.category} onChange={handleOnChange} >
                            {props.categories.map( (x,y) => 
                                <option key={y}>{x}</option> )}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body Part</Form.Label>
                    <Form.Select name='bodypart' value={props.data.bodypart} onChange={handleOnChange}>
                        {props.bodyparts.map( (x,y) => 
                            <option key={y}>{x}</option> )}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Exercise Image</Form.Label>
                    <Form.Control type="file"  name="imageupload" onChange={handleImageChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Exercise Video</Form.Label>
                    <Form.Control type="file"  name="videoupload" onChange={handleVideoChange} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export { ExerciseEditForm }