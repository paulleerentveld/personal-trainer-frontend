import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';




function ExerciseCard(props) {

    useEffect(() => {
        //console.log(props.data);
        //console.log(client);
        //console.log(props.data)
    })
    
function handleEditClick() {
    props.handleEditExercise(props.id)
    props.setEditedIndex(props.arrayindex)
}

function handlePreviewClick() {
  props.handlePreviewExercise(props.id)
  props.setEditedIndex(props.arrayindex)
}



  return (
    <Card style={{ width: '18rem' }} className="g-2 mx-2">
      <Card.Img variant="top" src={props.data.imageupload_url} onClick={handlePreviewClick} />
      <Card.Body >
        <Card.Title>{props.data.name}</Card.Title>
        <Card.Text>
            Description: {props.data.description}<br></br>
            Category: {props.data.category}<br></br>
            BodyPart: {props.data.bodypart}<br></br>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
          <Button variant="primary" className='mx-1' onClick={handleEditClick} >Edit</Button>  
          <Button variant="secondary" className='mx-1 float-end' onClick={handlePreviewClick} >Preview</Button>
        </Card.Footer>
    </Card>
  );
}

export { ExerciseCard } ;

