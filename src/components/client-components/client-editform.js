import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ClientEditForm(props) {
    const [client, setClient] = useState()
    const [tempClient, setTempClient] = useState()

    useEffect(() => {
        console.log(props.data);
        console.log(client);
        setClient(props.data)
    })


    function handleOnChange(e) {
        //setTempClient

    }

  return (
      <Modal show={props.show} onHide={props.handleClose}>
        {console.log(client)}
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" name='firstname' value={client.firstname} onChange={handleOnChange} />
                    </Form.Group>
                <Form.Group>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" value={client.lastname} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your age:</Form.Label>
                    <Form.Control type="number" placeholder="Enter your age" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Click here to submit form
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export { ClientEditForm }