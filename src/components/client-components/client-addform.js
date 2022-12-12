import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ClientAddForm(props) {

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
        props.setNewImage(value)
    }

  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" name='firstname' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" name='lastname' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name='usertype' onChange={handleOnChange}>
                        <option>client</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={6} name='notes' onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Client Image</Form.Label>
                    <Form.Control type="file"  name="avatar" onChange={handleImageChange} />
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

export { ClientAddForm }