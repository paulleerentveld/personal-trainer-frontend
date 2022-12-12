import React, { useState, useCallback, useEffect } from 'react';
import DataGrid, { Column, Editing, Popup, Paging, FilterRow, Form, SelectBox, Lookup, SearchPanel,} from 'devextreme-react/data-grid';
import { Item, GroupItem, Label, SimpleItem } from 'devextreme-react/form';
import { exercisestore } from '../../api/exercises';
import './exercises.scss';
import ReactPlayer from 'react-player'
import Button from 'devextreme-react/button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ExerciseCard } from '../../components/exercise-components/exercise-card'
import { ExerciseEditForm } from '../../components/exercise-components/exercise-editform'
import { ExercisePreview } from '../../components/exercise-components/exercise-preview'
import { ExerciseAddForm } from '../../components/exercise-components/exercise-addform'


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
  
  
    const handleClose = () => {setShow(false); setEditExercise({});}
    const handleShow = () => setShow(true);

    const handlePreviewClose = () => {setShowPreview(false); setEditExercise({});}
    const handlePreviewShow = () => setShowPreview(true);

    const handleAddClose = () => {setShowAdd(false); setEditExercise({});}
    const handleAddShow = () => setShowAdd(true);
  

  
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
            .then(response => response.json())
            .then(success => {
                newExercises[editedIndex].imageupload_url = success.imageupload_url
              setExerciseData(newExercises)
              handleClose();
              console.log(success)              
            })
            .catch(error => console.log(error)
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
              .then(response => response.json())
              .then(success => {
                newExercises.push(success)
                setExerciseData(newExercises)
                handleAddClose();
                console.log(success)              
              })
              .catch(error => console.log(error)
            );
      }
  
    useEffect(() => {
      fetch(BackendUrl)
      .then(response => response.json())
      .then(data => setExerciseData(data))
    },[]);
  
    function fetchClient(id) {
      fetch(BackendUrl+"/"+id)
      .then(response => response.json())
      .then(data => setEditExercise(data))
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
  
   
  
    return (
      <React.Fragment>

        <Container>
        <div>
            <Button variant="primary" onClick={handleAddShow} >Add</Button> 
        </div>
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
          {exerciseData?.map((exercise, index) => {
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
      </React.Fragment>
    )
};






