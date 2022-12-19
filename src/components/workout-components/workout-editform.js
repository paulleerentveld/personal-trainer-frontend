import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import './workout-editform.scss';

function WorkoutEditForm(props) {
    const [newExercise, setNewExercise] = useState();



function handleAddExercise() {
    const newWorkoutData = {...props.data}
    let exerciseFull = props.exerciseList.find(exercise => exercise.id == newExercise)
    let exerciseData = {"id": exerciseFull.id, "name": exerciseFull.name, "description": exerciseFull.description}    
    newWorkoutData.exercises.push(exerciseData)
    props.setdata(newWorkoutData)
    setNewExercise()

}

function handleSelectExercise(e) {
    const exerciseID = e.target.value
    setNewExercise(exerciseID)
    console.log(e)

}

    function handleOnChange(e) {
        const value = e.target.value
        const name = e.target.name
        props.setdata({
            ...props.data,
            [name]: value,
        })
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
                    <Form.Label>Workout Type</Form.Label>
                    <Form.Select required name='workouttype' value={props.data.workouttype} onChange={handleOnChange} >
                            {props.workoutType.map( (workouttype,index) => 
                                <option key={index}>{workouttype}</option> )}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>New Exercise</Form.Label>
                    <Form.Select required name='exercise-select' defaultValue="" onChange={handleSelectExercise} >
                    <option disabled={true} hidden={true} value="">Select Exercise</option>
                            {props.exerciseList?.map( (exercise,index) => 
                                <option key={index} value={exercise.id} label={exercise.name}>{exercise.name}</option> 
                                )}
                    </Form.Select>
                    <Button variant="primary" onClick={handleAddExercise} >
                        Add Exercise
                    </Button>
                </Form.Group>

                {props.data.exercises?.map( (exercise,index) => 
                    <Form.Group  >
                    <Form.Label>{exercise.name}</Form.Label>
                    <Form.Control type="text" name='name' value={exercise.name} />
                    </Form.Group>)
                    }


                <br></br>
                <Form.Group>
                    <Button className='mx-1' variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className='mx-1' variant="primary" type="submit" >
                        Save Changes
                    </Button>
                    <Button className='mx-1' variant="danger" onClick={props.handleDeleteWorkout}>
                        Delete Exercise
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
  );
}

export { WorkoutEditForm }