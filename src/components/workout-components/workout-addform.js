import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WorkoutAddForm(props) {
    const [newExercise, setNewExercise] = useState();

/*     useEffect(() => {
        console.log(props.data);
        //console.log(client);
    }) */

    function handleAddExercise() {
        const newWorkoutData = {...props.data}
        {if (newWorkoutData["exercises"] === undefined) {
            newWorkoutData.exercises = []
        }}
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
          <Modal.Title>Adding New Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name='name' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Workout Type</Form.Label>
                    <Form.Select required name='workouttype' defaultValue="" onChange={handleOnChange} >
                    <option disabled={true} hidden={true} key="-1"  value="">Select Type</option>
                            {props.workoutType.map( (workouttype,index) => 
                                <option key={index}>{workouttype}</option> )}
                    </Form.Select>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>New Exercise</Form.Label>
                    <Form.Select required name='exercise-select' defaultValue="" onChange={handleSelectExercise} >
                    <option disabled={true} hidden={true} key="-1"  value="">Select Exercise</option>
                            {props.exerciseList?.map( (exercise,index) => 
                                <option key={index} value={exercise.id}>{exercise.name}</option> 
                                )}
                    </Form.Select>
                    <Button className='m-1' variant="primary" onClick={handleAddExercise} >
                        Add Exercise
                    </Button>
                </Form.Group>
                <br></br>
                <h5>Exercises</h5>

                {props.data.exercises?.map( (exercise,index) => 
                    <Form.Group  >
                    <Form.Label>{exercise.name}</Form.Label>
                    <Form.Control type="text" name='name' value={exercise.name} />
                    </Form.Group>)
                    }


                <br></br>
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

export { WorkoutAddForm }