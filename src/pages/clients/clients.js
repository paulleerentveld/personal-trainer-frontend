import React, { useState, useCallback, useEffect } from 'react';
import { clientstore } from '../../api/clients';
import { ClientCard } from '../../components/client-components/client-card'
import { ClientEditForm } from '../../components/client-components/client-editform'
import { ClientAddForm } from '../../components/client-components/client-addform'
import './clients.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'devextreme-react/button';



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
  const [showAdd, setShowAdd] = useState(false);
  const [editedIndex, setEditedIndex] = useState();
  const [newImage, setNewImage] = useState(null);


  const handleClose = () => {setShow(false); setEditClient({});}
  const handleShow = () => setShow(true);

  const handleAddClose = () => {setShowAdd(false); setEditClient({});}
  const handleAddShow = () => setShowAdd(true);

/*   function handleSubmit(e) {
    e.preventDefault()
    const newClients = [...clientData]
    newClients[editedIndex] = editClient
        fetch(BackendUrl+editClient.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editClient),
        })
          .then(response => response.json())
          .then(success => {
            console.log(success)
            setClientData(newClients)
            handleClose();
            
          })
          .catch(error => console.log(error)
        );
  } */

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstname', editClient.firstname)
    formData.append('lastname', editClient.lastname)
    formData.append('email', editClient.email)
    formData.append('mobile', editClient.mobile)
    formData.append('height', editClient.height)
    formData.append('weight', editClient.weight)
    formData.append('sex', editClient.sex)
    formData.append('dob', editClient.dob)
    formData.append('notes', editClient.notes)
    newImage && formData.append('avatar', newImage)
    const newClients = [...clientData]
    newClients[editedIndex] = editClient
        fetch(BackendUrl+editClient.id, {
          method: 'PATCH',
          body: formData,
        })
          .then(response => response.json())
          .then(success => {
            newClients[editedIndex].avatar_url = success.avatar_url
            setClientData(newClients)
            handleClose();
            console.log(success)
            
          })
          .catch(error => console.log(error)
        );
  }

  function handleNewSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstname', editClient.firstname)
    formData.append('lastname', editClient.lastname)
    formData.append('email', editClient.email)
    formData.append('mobile', editClient.mobile)
    formData.append('height', editClient.height)
    formData.append('weight', editClient.weight)
    formData.append('sex', editClient.sex)
    formData.append('dob', editClient.dob)
    formData.append('notes', editClient.notes)
    newImage && formData.append('avatar', newImage)
    const newClients = [...clientData]
    
        fetch(BackendUrl, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(success => {
            newClients.push(success)
            setClientData(newClients)
            handleAddClose();
            console.log(success)
            
          })
          .catch(error => console.log(error)
        );
  }

  useEffect(() => {
    fetch(BackendUrl)
    .then(response => response.json())
    .then(data => setClientData(data))
  },[]);

  function fetchClient(id) {
    fetch(BackendUrl+"/"+id)
    .then(response => response.json())
    .then(data => setEditClient(data))
  }
  
  function handleEditClient(id) {
    fetchClient(id);
    handleShow();
    //console.log(editClient)
  }

 

  return (
    <React.Fragment>
              <div>
            <Button variant="primary" onClick={handleAddShow} >Add</Button> 
        </div>
      <Container>
        <ClientEditForm 
          handleClose={handleClose}
          handleShow={handleShow}
          handleSubmit={handleSubmit}
          data={editClient}
          setdata={setEditClient}
          parentData={clientData}
          setParentData={setClientData}
          BackendUrl={BackendUrl}
          show={show}
          editedIndex={editedIndex}
          setNewImage={setNewImage}
          newImage={newImage}
          />
          <ClientAddForm 
          handleClose={handleAddClose}
          handleShow={handleAddShow}
          handleSubmit={handleNewSubmit}
          data={editClient}
          setdata={setEditClient}
          parentData={clientData}
          setParentData={setClientData}
          BackendUrl={BackendUrl}
          show={showAdd}
          editedIndex={editedIndex}
          setNewImage={setNewImage}
          newImage={newImage}
          />
        <Row className='d-flex justify-content-center'>
        {clientData?.map((client, index) => {
                return (
                  <ClientCard
                    key={client.id}
                    arrayindex={index}
                    setEditedIndex={setEditedIndex}
                    img={client.avatar_url}
                    firstname={client.firstname}
                    lastname={client.lastname}
                    email={client.email}
                    mobile={client.mobile}
                    height={client.height}
                    weight={client.weight}
                    sex={client.sex}
                    dob={client.dob}
                    notes={client.notes}
                    handleEditClient={handleEditClient}
                    id={client.id}
                    data={client}
                  />

                );
              })}
              </Row>
      </Container>
    </React.Fragment>
  )};

