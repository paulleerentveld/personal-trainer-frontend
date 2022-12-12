import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ClientEditForm(props) {

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

  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing {props.data.firstname} {props.data.lastname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" name='firstname' value={props.data.firstname} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" name='lastname' value={props.data.lastname} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' value={props.data.email} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name='usertype' value={props.data.usertype} onChange={handleOnChange}>
                        <option>client</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={6} name='notes' value={props.data.notes} onChange={handleOnChange} />
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

export { ClientEditForm }