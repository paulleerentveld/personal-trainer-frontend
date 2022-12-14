import React, { useState, useCallback, useEffect } from 'react';
import './exercises.scss';
import ReactPlayer from 'react-player'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ExerciseCard } from '../../components/exercise-components/exercise-card'
import { ExerciseEditForm } from '../../components/exercise-components/exercise-editform'
import { ExercisePreview } from '../../components/exercise-components/exercise-preview'
import { ExerciseAddForm } from '../../components/exercise-components/exercise-addform'
import AlertMessage from '../../components/alerts/alert'


const BackendUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";

const notesEditorOptions = { height: 200 };
const categories = [
  'Cardio',
  'Strength',
  'Balance',
  'Flexibility',
];
const bodyparts = [
  'Chest',
  'Back',
  'Shoulders',
  'Triceps',
  'Biceps',
  'Quads',
  'Hamstrings',
  'Calves',
];

const fileUploadUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";
let fileUploaderRef = React.createRef();
let imgRef = React.createRef();
let gridRef = React.createRef();
let videoRef = React.createRef();


export default function Exercise() {
    const [exerciseData, setExerciseData] = useState([])
    const [editExercise, setEditExercise] = useState({})
    const [show, setShow] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editedIndex, setEditedIndex] = useState();
    const [newImage, setNewImage] = useState(null);
    const [newVideo, setNewVideo] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm] = useState(["name", "description", "category", "bodypart"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [showMessage, setShowMessage] = useState(false);
    const [messageVariant, setMessageVariant] = useState();
    const [messages, setMessages] = useState();

    const data = Object.values(exerciseData);  

    const handleError = response => {
        if (!response.ok) { 
           throw setMessages(response.statusText)
        } else {
           return response.json();
        }
     };    
  
    const handleClose = () => {setShow(false); setEditExercise({});}
    const handleShow = () => setShow(true);

    const handlePreviewClose = () => {setShowPreview(false); setEditExercise({});}
    const handlePreviewShow = () => setShowPreview(true);

    const handleAddClose = () => {setShowAdd(false); setEditExercise({});}
    const handleAddShow = () => setShowAdd(true);

    function search(exerciseData) {
        return exerciseData.filter((exercise) => {
            if (exercise.category == filterParam) {
                return searchTerm.some((newExercise) => {
                    return (
                        exercise[newExercise]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchTerm.some((newExercise) => {
                    return (
                        exercise[newExercise]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }
        });
    }
  

  
    function handleSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', editExercise.name)
      formData.append('description', editExercise.description)
      formData.append('category', editExercise.category)
      formData.append('bodypart', editExercise.bodypart)
      newImage && formData.append('imageupload', newImage)
      newVideo && formData.append('videoupload', newVideo)
      const newExercises = [...exerciseData]
      newExercises[editedIndex] = editExercise
          fetch(BackendUrl+editExercise.id, {
            method: 'PATCH',
            body: formData,
          })
            .then(handleError)
            .then(success => {
                newExercises[editedIndex].imageupload_url = success.imageupload_url
              setExerciseData(newExercises)
              handleClose();
              console.log(success)
              setMessages("Exercise Record Successfully Saved")
              setMessageVariant("success")
              setShowMessage(true)           
            })
            .catch(error => {
                console.log(error)
                setMessageVariant("danger")
                setShowMessage(true)
            }
          );
    }

    function handleNewSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', editExercise.name)
        formData.append('description', editExercise.description)
        formData.append('category', editExercise.category)
        formData.append('bodypart', editExercise.bodypart)
        newImage && formData.append('imageupload', newImage)
        newVideo && formData.append('videoupload', newVideo)
        const newExercises = [...exerciseData]
            fetch(BackendUrl, {
              method: 'POST',
              body: formData,
            })
              .then(handleError)
              .then(success => {
                newExercises.push(success)
                setExerciseData(newExercises)
                handleAddClose();
                console.log(success) 
                setMessages("New Exercise Successfully Added")
                setMessageVariant("success")
                setShowMessage(true)              
              })
              .catch(error => {
                console.log(error)
                setMessageVariant("danger")
                setShowMessage(true)
            }
            );
      }
  
    useEffect(() => {
      fetch(BackendUrl)
      .then(handleError)
      .then(data => setExerciseData(data))
      .catch(error => {
        console.log(error)
        setMessageVariant("danger")
        setShowMessage(true)
    })
    },[]);
  
    function fetchClient(id) {
      fetch(BackendUrl+"/"+id)
      .then(handleError)
      .then(data => setEditExercise(data))
      .catch(error => {
        console.log(error)
        setMessageVariant("danger")
        setShowMessage(true)
    })
    }
    
    function handleEditExercise(id) {
      fetchClient(id);
      handleShow();
      //console.log(editClient)
    }

    function handlePreviewExercise(id) {
        fetchClient(id);
        handlePreviewShow();
        //console.log(editClient)
      }

    function handleDeleteExercise() {
    const exercise = editExercise.id
    const exerciseIndex = editedIndex
    const newExercises = [...exerciseData]
    if (window.confirm('Are you sure you wish to delete this exercise?')) {
    return  (fetch(BackendUrl+exercise, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
            },
        })
        .then(handleError)
        .then(success => {
            console.log(success)
            newExercises.splice(exerciseIndex,1)
            setExerciseData(newExercises)
            handleClose();
            setMessages("Exercise Successfully Deleted")
            setMessageVariant("success")
            setShowMessage(true)  
            
        })
        .catch(error => {
            console.log(error)
            setMessageVariant("danger")
            setShowMessage(true)
        }
        ));
    }
}
  
   
  
    return (
      <React.Fragment>        
        <Container>
            <Row className='d-flex justify-content-center'>
                <Stack direction="horizontal" gap={1} className='d-flex justify-content-left '>
                    <FontAwesomeIcon icon={faPlus} className="g-2 mx-3 fa-2xl" onClick={handleAddShow} />
                    <Stack gap={1} className='d-flex justify-content-center'>
                    <Form.Control className="" placeholder="Search..." type="text"  name='name' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Form.Select className="" onChange={(e) => {setFilterParam(e.target.value);}}>
                        <option value="All">Filter By Category</option>
                        {categories.map((category) => {
                            return (
                                <option value={category}>{category}</option>
                            );
                            })}
                    </Form.Select> 
                    </Stack>
                </Stack>
            </Row>
        </Container>
        <Container>
          <ExerciseEditForm 
            handleClose={handleClose}
            handleShow={handleShow}
            handleSubmit={handleSubmit}
            data={editExercise}
            setdata={setEditExercise}
            parentData={exerciseData}
            setParentData={setExerciseData}
            BackendUrl={BackendUrl}
            show={show}
            editedIndex={editedIndex}
            setNewImage={setNewImage}
            newImage={newImage}
            newVideo={newVideo}
            setNewVideo={setNewVideo}
            categories={categories}
            bodyparts={bodyparts}
            handleDeleteExercise={handleDeleteExercise}
            />
            <ExercisePreview 
            handleClose={handlePreviewClose}
            handleShow={handlePreviewShow}
            data={editExercise}
            BackendUrl={BackendUrl}
            show={showPreview}
            editedIndex={editedIndex}
            categories={categories}
            bodyparts={bodyparts}
            />
            <ExerciseAddForm 
            handleClose={handleAddClose}
            handleShow={handleAddShow}
            handleSubmit={handleNewSubmit}
            data={editExercise}
            setdata={setEditExercise}
            parentData={exerciseData}
            setParentData={setExerciseData}
            BackendUrl={BackendUrl}
            show={showAdd}
            editedIndex={editedIndex}
            setNewImage={setNewImage}
            newImage={newImage}
            newVideo={newVideo}
            setNewVideo={setNewVideo}
            categories={categories}
            bodyparts={bodyparts}
            />
          <Row className='d-flex justify-content-center'>
          {search(data).map((exercise, index) => {
                  return (
                    <ExerciseCard
                      key={exercise.id}
                      arrayindex={index}
                      setEditedIndex={setEditedIndex}
                      handleEditExercise={handleEditExercise}
                      handlePreviewExercise={handlePreviewExercise}
                      id={exercise.id}
                      data={exercise}
                    />
  
                  );
                })}
                </Row>
        </Container>
        {showMessage? <AlertMessage variant={messageVariant}  message={messages} setMessages={setMessages} showMessage={showMessage} setShowMessage={setShowMessage} /> : null }
      </React.Fragment>
    )
};






