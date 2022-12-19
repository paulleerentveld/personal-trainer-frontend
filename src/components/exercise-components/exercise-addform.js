import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './exercise-addform.scss';

function ExerciseAddForm(props) {



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
        props.setNewImage(value)
    }

    function handleVideoChange(e) {
        const value = e.target.files[0]

        props.setNewVideo(value)
    }

  return (
      <Modal show={props.show} onHide={props.handleClose} dialogClassName="modal-100w" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Adding New Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name='name' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as="textarea" rows={4} name='description' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select required name='category' defaultValue="" onChange={handleOnChange} >
                    <option disabled={true} hidden={true} value="">Select Category</option>
                            {props.categories.map( (x,y) => 
                                <option key={y}>{x}</option> )}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body Part</Form.Label>
                    <Form.Select required name='bodypart' defaultValue="" onChange={handleOnChange} >
                    <option disabled={true} hidden={true} value="">Select Body Part</option>
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
                <br></br>
                <Form.Group>
                    <Button className='mx-1' variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className='mx-1' variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
  );
}

export { ExerciseAddForm }