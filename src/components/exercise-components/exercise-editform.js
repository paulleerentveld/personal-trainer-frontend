import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './exercise-editform.scss';

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

    function handleDeleteExercise() {
        const exercise = props.data.id
        const exerciseIndex = props.editedIndex
        const newExercises = [...props.parentData]
        if (window.confirm('Are you sure you wish to delete this exercise?')) {
        return  (fetch(BackendUrl+exercise, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
               },
          })
            .then(response => response.json())
            .then(success => {
              console.log(success)
              newExercises.splice(exerciseIndex,1)
              props.setParentData(newExercises)
              props.handleClose();
              
            })
            .catch(error => console.log(error)
          ));
        }
    }

    const BackendUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";

    function deleteExercise() {
        const exercise = props.data.id
        const exerciseIndex = props.editedIndex
        const newExercises = [...props.parentData]
        fetch(BackendUrl+exercise, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
               },
          })
            .then(response => response.json())
            .then(success => {
              console.log(success)
              newExercises.splice(exerciseIndex,1)
              props.setParentData(newExercises)
              props.handleClose();
              
            })
            .catch(error => console.log(error)
          );
    }

  return (
      <Modal show={props.show} onHide={props.handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Editing {props.data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name='name' value={props.data.name} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as="textarea" rows={4} name='description' value={props.data.description} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select required name='category' value={props.data.category} onChange={handleOnChange} >
                                <option></option>
                            {props.categories.map( (x,y) => 
                                <option key={y}>{x}</option> )}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body Part</Form.Label>
                    <Form.Select required name='bodypart' value={props.data.bodypart} onChange={handleOnChange}>
                            <option></option>
                        {props.bodyparts.map( (x,y) => 
                            <option key={y}>{x}</option> )}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Exercise Image</Form.Label>
                    <Form.Control type="file" accept='.png,.jpg,.jpeg,.webp'  name="imageupload" onChange={handleImageChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Exercise Video</Form.Label>
                    <Form.Control type="file" accept='.mp4,.mov,.wmv,.avi'  name="videoupload" onChange={handleVideoChange} />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Button className='mx-1' variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className='mx-1' variant="primary" type="submit" >
                        Save Changes
                    </Button>
                    <Button className='mx-1' variant="danger" onClick={props.handleDeleteExercise}>
                        Delete Exercise
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
  );
}

export { ExerciseEditForm }