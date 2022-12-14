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
      <Modal show={props.show} onHide={props.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Editing {props.data.firstname} {props.data.lastname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control required type="text" name='firstname' value={props.data.firstname} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control required type="text" name='lastname' value={props.data.lastname} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" name='email' value={props.data.email} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control required type="tel" name='mobile' value={props.data.mobile} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name='usertype' value={props.data.usertype} defaultValue="client" onChange={handleOnChange}>
                        <option>client</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="number" name='height' value={props.data.height} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="number" name='weight' value={props.data.weight} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sex</Form.Label>
                    <Form.Select required name='sex' value={props.data.sex} defaultValue="" onChange={handleOnChange}>
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control required type="date" name='dob' value={props.data.dob} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={6} name='notes' value={props.data.notes} onChange={handleOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Client Image</Form.Label>
                    <Form.Control type="file"  name="avatar" onChange={handleImageChange} />
                </Form.Group>
                <br></br>
                <Button className='mx-1' variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button className='mx-1' type='submit' variant="primary" >
                    Save Changes
                </Button>
                <Button className='mx-1' variant="danger" onClick={props.handleDeleteClient}>
                    Delete Client
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
  );
}

export { ClientEditForm }