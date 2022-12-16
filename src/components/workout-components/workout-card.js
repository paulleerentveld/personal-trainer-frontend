import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';




function WorkoutCard(props) {

    
function handleEditClick() {
    props.handleEditWorkout(props.id)
    props.setEditedIndex(props.arrayindex)
}

function handlePreviewClick() {
  props.handlePreviewWorkout(props.id)
  props.setEditedIndex(props.arrayindex)
}



  return (
    <Card style={{ width: '18rem' }} className="g-2 mx-2">
      <Card.Body >
        <Card.Title>{props.data.name}</Card.Title>
        <Card.Text>
            Workout Type: {props.data.workouttype}<br></br>
            Exercises: <ol>
            {props.data.exercises.map( (exercise,index) => 
                            <li key={index}>{exercise.name}</li> )}
                            </ol>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
          <Button variant="primary" className='mx-1' onClick={handleEditClick} >Edit</Button>  
          <Button variant="secondary" className='mx-1 float-end' onClick={handlePreviewClick} >Preview</Button>
        </Card.Footer>
    </Card>
  );
}

export { WorkoutCard } ;

