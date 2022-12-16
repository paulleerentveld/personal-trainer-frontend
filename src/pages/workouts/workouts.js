import React, { useState, useCallback, useEffect } from 'react';
import './workouts.scss';
import ReactPlayer from 'react-player'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { WorkoutCard } from '../../components/workout-components/workout-card'
import { WorkoutEditForm } from '../../components/workout-components/workout-editform'
import { WorkoutPreview } from '../../components/workout-components/workout-preview'
import { WorkoutAddForm } from '../../components/workout-components/workout-addform'
import AlertMessage from '../../components/alerts/alert'
import { ExercisePreview } from '../../components/exercise-components/exercise-preview'


const BackendUrl = process.env.REACT_APP_BACKEND_URL+"/workouts/";
const ExercisesBackendUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";

const workoutType = [
  'Bodybuilding',
  'Strength',
  'Cardio',
  'HIT',
];



export default function Workout() {
    const [workoutData, setWorkoutData] = useState([])
    const [editWorkout, setEditWorkout] = useState({})
    const [exerciseList, setExerciseList] = useState([])
    const [show, setShow] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [exercisePreview, setExercisePreview] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const [showExercise, setShowExercise] = useState(false);
    const [editedIndex, setEditedIndex] = useState();
    const [newImage, setNewImage] = useState(null);
    const [newVideo, setNewVideo] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm] = useState(["name"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [showMessage, setShowMessage] = useState(false);
    const [messageVariant, setMessageVariant] = useState();
    const [messages, setMessages] = useState();

    const data = Object.values(workoutData);  

    const handleError = response => {
        if (!response.ok) { 
           throw setMessages(response.statusText)
        } else {
           return response.json();
        }
     };    
  
    const handleClose = () => {setShow(false); setEditWorkout({});}
    const handleShow = () => setShow(true);

    const handlePreviewClose = () => {setShowPreview(false); setEditWorkout({});}
    const handlePreviewShow = () => setShowPreview(true);

    const handleExerciseShow = () => setShowExercise(true);
    const handleExerciseClose = () => {setShowExercise(false);};
    const handleExercisePreview = (exercise) => {setExercisePreview(exercise);handleExerciseShow();}

    const handleAddClose = () => {setShowAdd(false); setEditWorkout({});}
    const handleAddShow = () => setShowAdd(true);

    function search(workoutData) {
        return workoutData.filter((workout) => {
            if (workout.workouttype == filterParam) {
                return searchTerm.some((newWorkout) => {
                    return (
                        workout[newWorkout]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchTerm.some((newWorkout) => {
                    return (
                        workout[newWorkout]
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
      formData.append('name', editWorkout.name)
      formData.append('workouttype', editWorkout.workouttype)
      editWorkout.exercises?.map((exercise) => {
        formData.append('exercise_ids[]', exercise.id)
      })
      const newWorkouts = [...workoutData]
      newWorkouts[editedIndex] = editWorkout
          fetch(BackendUrl+editWorkout.id, {
            method: 'PATCH',
            body: formData,
          })
            .then(handleError)
            .then(success => {
              setWorkoutData(newWorkouts)
              handleClose();
              console.log(success)
              setMessages("Workout Record Successfully Saved")
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
        formData.append('name', editWorkout.name)
        formData.append('workouttype', editWorkout.workouttype)
        editWorkout.exercises?.map((exercise) => {
          formData.append('exercise_ids[]', exercise.id)
        })
        const newWorkouts = [...workoutData]
            fetch(BackendUrl, {
              method: 'POST',
              body: formData,
            })
              .then(handleError)
              .then(success => {
                newWorkouts.push(success)
                setWorkoutData(newWorkouts)
                handleAddClose();
                console.log(success) 
                setMessages("New Workout Successfully Added")
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
      .then(data => setWorkoutData(data))
      .catch(error => {
        console.log(error)
        setMessageVariant("danger")
        setShowMessage(true)
    })
    },[]);

    useEffect(() => {
      fetch(ExercisesBackendUrl)
      .then(handleError)
      .then(data => setExerciseList(data))
      .catch(error => {
        console.log(error)
        setMessageVariant("danger")
        setShowMessage(true)
    })
    },[]);
  
    function fetchClient(id) {
      fetch(BackendUrl+"/"+id)
      .then(handleError)
      .then(data => setEditWorkout(data))
      //.then(data => console.log('oneditfetch',data))
      .catch(error => {
        console.log(error)
        setMessageVariant("danger")
        setShowMessage(true)
    })
    }
    
    function handleEditWorkout(id) {
      fetchClient(id);
      handleShow();
      //console.log(editClient)
    }

    function handlePreviewWorkout(id) {
        fetchClient(id);
        handlePreviewShow();
        //console.log(editClient)
      }

    function handleDeleteWorkout() {
    const workout = editWorkout.id
    const workoutIndex = editedIndex
    const newWorkouts = [...workoutData]
    if (window.confirm('Are you sure you wish to delete this workout?')) {
    return  (fetch(BackendUrl+workout, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
            },
        })
        .then(handleError)
        .then(success => {
            console.log(success)
            newWorkouts.splice(workoutIndex,1)
            setWorkoutData(newWorkouts)
            handleClose();
            setMessages("Workout Successfully Deleted")
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
                        <option value="All">Filter By Type</option>
                        {workoutType.map((type) => {
                            return (
                                <option value={type}>{type}</option>
                            );
                            })}
                    </Form.Select> 
                    </Stack>
                </Stack>
            </Row>
        </Container>
        <Container>
          <WorkoutEditForm 
            handleClose={handleClose}
            handleShow={handleShow}
            handleSubmit={handleSubmit}
            data={editWorkout}
            setdata={setEditWorkout}
            parentData={workoutData}
            setParentData={setWorkoutData}
            BackendUrl={BackendUrl}
            show={show}
            editedIndex={editedIndex}
            setNewImage={setNewImage}
            newImage={newImage}
            newVideo={newVideo}
            setNewVideo={setNewVideo}
            workoutType={workoutType}
            handleDeleteWorkout={handleDeleteWorkout}
            exerciseList={exerciseList}
            />
            <WorkoutPreview 
            handleClose={handlePreviewClose}
            handleShow={handlePreviewShow}
            data={editWorkout}
            BackendUrl={BackendUrl}
            showPreview={showPreview}
            editedIndex={editedIndex}
            workoutType={workoutType}
            setExercisePreview={setExercisePreview}
            handleExercisePreview={handleExercisePreview}
            />
            <ExercisePreview 
            handleClose={handleExerciseClose}
            handleShow={handleExerciseShow}
            data={exercisePreview}
            BackendUrl={ExercisesBackendUrl}
            show={showExercise}
            editedIndex={editedIndex}
            />
            <WorkoutAddForm 
            handleClose={handleAddClose}
            handleShow={handleAddShow}
            handleSubmit={handleNewSubmit}
            data={editWorkout}
            setdata={setEditWorkout}
            parentData={workoutData}
            setParentData={setWorkoutData}
            BackendUrl={BackendUrl}
            show={showAdd}
            editedIndex={editedIndex}
            setNewImage={setNewImage}
            newImage={newImage}
            newVideo={newVideo}
            setNewVideo={setNewVideo}
            workoutType={workoutType}
            exerciseList={exerciseList}
            />
          <Row className='d-flex justify-content-center'>
          {search(data).map((workout, index) => {
                  return (
                    <WorkoutCard
                      key={index}
                      arrayindex={index}
                      setEditedIndex={setEditedIndex}
                      handleEditWorkout={handleEditWorkout}
                      handlePreviewWorkout={handlePreviewWorkout}
                      id={workout.id}
                      data={workout}
                    />
  
                  );
                })}
                </Row>
        </Container>
        {showMessage? <AlertMessage variant={messageVariant}  message={messages} setMessages={setMessages} showMessage={showMessage} setShowMessage={setShowMessage} /> : null }
      </React.Fragment>
    )
};






