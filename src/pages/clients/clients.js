import React, { useState, useCallback, useEffect } from 'react';
import { clientstore } from '../../api/clients';
import { ClientCard } from '../../components/client-components/client-card'
import { ClientEditForm } from '../../components/client-components/client-editform'
import './clients.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const clientType = ["client"]
const sex = [
  'Male',
  'Female',
];

const BackendUrl = process.env.REACT_APP_BACKEND_URL+"/clients/";





export default function Client() {
  const [clientData, setClientData] = useState([])
  const [editClient, setEditClient] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);}
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(BackendUrl)
    //.then(response => console.log(response))
    .then(response => response.json())
    .then(data => setClientData(data))
  },[]);

  function fetchClient(id) {
    fetch(BackendUrl+"/"+id)
    //.then(response => console.log(response))
    .then(response => response.json())
    .then(data => setEditClient(data))
  }
  
  function handleEditClient(id) {
    fetchClient(id);
    handleShow();
    console.log(editClient)
  }

 

  return (
    <React.Fragment>
      <Container>
        <ClientEditForm 
          handleClose={handleClose}
          handleShow={handleShow}
          data={editClient}
          show={show}
          />
        <Row className='d-flex justify-content-center'>
        {clientData?.map((client) => {
                return (
                  <ClientCard
                    key={client.id}
                    img={client.avatar_url}
                    title={client.fullname}
                    email={client.email}
                    mobile={client.mobile}
                    height={client.height}
                    weight={client.weight}
                    sex={client.sex}
                    dob={client.dob}
                    notes={client.notes}
                    handleEditClient={handleEditClient}
                    id={client.id}
                  />

                );
              })}
              </Row>
      </Container>
    </React.Fragment>
  )};

