import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




function ClientCard(props) {

/*     useEffect(() => {
        //console.log(props.data);
        //console.log(client);
        //setClient(props.data)
    }) */
    
function handleClick() {
    props.handleEditClient(props.id)
    props.setEditedIndex(props.arrayindex)
}



  return (
    <Card style={{ width: '18rem' }} className="g-2 mx-2">
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.firstname} {props.lastname}</Card.Title>
        <Card.Text>
            Email: {props.email}<br></br>
            Mobile: {props.mobile}<br></br>
            Height: {props.height}<br></br>
            Weight: {props.weight}<br></br>
            Sex: {props.sex}<br></br>
            DOB: {props.dob}<br></br>
            Notes: {props.notes}<br></br>
            ID: {props.id}
        </Card.Text>
        <Button variant="primary" onClick={handleClick} >OpenClient</Button>
      </Card.Body>
    </Card>
  );
}

export { ClientCard} ;

