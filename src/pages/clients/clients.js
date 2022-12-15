import React, { useState, useCallback, useEffect } from 'react';
import { ClientCard } from '../../components/client-components/client-card'
import { ClientEditForm } from '../../components/client-components/client-editform'
import { ClientAddForm } from '../../components/client-components/client-addform'
import './clients.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import AlertMessage from '../../components/alerts/alert'



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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm] = useState(["firstname", "lastname", "sex", "email", "mobile"]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageVariant, setMessageVariant] = useState();
  const [messages, setMessages] = useState();

  const data = Object.values(clientData);

  const handleError = response => {
    if (!response.ok) { 
       throw setMessages(response.statusText)
    } else {
       return response.json();
    }
 };

  const handleClose = () => {setShow(false); setEditClient({});}
  const handleShow = () => setShow(true);

  const handleAddClose = () => {setShowAdd(false); setEditClient({});}
  const handleAddShow = () => setShowAdd(true);

  function search(clientData) {
    return clientData.filter((client) => {
        return searchTerm.some((newClient) => {
            return (
              client[newClient]
                    .toString()
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) > -1
            );
        });
    });
}

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
          .then(handleError)
          .then(success => {
            newClients[editedIndex].avatar_url = success.avatar_url
            setClientData(newClients)
            handleClose();
            console.log("success")
            setMessages("User Record Successfully Saved")
            setMessageVariant("success")
            setShowMessage(true)
          })
          .catch(error => {
            setMessageVariant("danger")
            setShowMessage(true)
          }
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
    editClient.notes && formData.append('notes', editClient.notes)
    newImage && formData.append('avatar', newImage)
    const newClients = [...clientData]
    
        fetch(BackendUrl, {
          method: 'POST',
          body: formData,
        })
          .then(handleError)
          .then(success => {
            newClients.push(success)
            setClientData(newClients)
            handleAddClose();
            console.log("success")
            setMessages("New User Successfully Created")
            setMessageVariant("success")
            setShowMessage(true)
          })
          .catch(error => {
            setMessageVariant("danger")
            setShowMessage(true)
          });
  }

  useEffect(() => {
    fetch(BackendUrl)
    .then(handleError)
    .then(data => {
      setClientData(data)
      console.log("success")
    })
    .catch(error => {
      setMessageVariant("danger")
      setShowMessage(true)
    })
  },[]);

  function fetchClient(id) {
    fetch(BackendUrl+"/"+id)
    .then(handleError)
    .then(data => {
      setEditClient(data)
      console.log("success")
    })
    .catch(error => {
      setMessageVariant("danger")
      setShowMessage(true)
    })
  }
  
  function handleEditClient(id) {
    fetchClient(id);
    handleShow();
    //console.log(editClient)
  }

  function handleDeleteClient() {
    const client = editClient.id
    const clientIndex = editedIndex
    const newClients = [...clientData]
    if (window.confirm('Are you sure you wish to delete this user?')) {
        fetch(BackendUrl+client, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
               },
          })
            .then(handleError)
            .then(success => {
              console.log(success)
              newClients.splice(clientIndex,1)
              setClientData(newClients)
              handleClose()
              setMessages("User Successfully Deleted")
              setMessageVariant("success")
              setShowMessage(true)
            })
            .catch(error => {
              setMessageVariant("danger")
              setShowMessage(true)
              console.log(error)
              console.log(messages)
            }
          )
    }
}

 

  return (
    <React.Fragment>
      
      <Container>
        <Row className='d-flex justify-content-center'>
          <Stack direction="horizontal" gap={1} className='d-flex justify-content-left'>
            <FontAwesomeIcon icon={faUserPlus} className="g-2 mx-5 fa-2xl" onClick={handleAddShow} />
            {/* <img src='\images\icons\add.png' className="add-button g-2 mx-5"  width={50} onClick={handleAddShow} ></img> */}
            <Form.Control className="w-auto" placeholder="Search..." type="search"  name='name' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </Stack>
      </Row>
    </Container>

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
          handleDeleteClient={handleDeleteClient}
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
        {search(data).map((client, index) => {
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
      {showMessage? <AlertMessage variant={messageVariant}  message={messages} setMessages={setMessages} showMessage={showMessage} setShowMessage={setShowMessage} /> : null }
    </React.Fragment>
  )};

