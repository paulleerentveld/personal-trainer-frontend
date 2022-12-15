import React, {useState, useEffect, useRef} from 'react';
import Scheduler, {Editing, Resource, View} from 'devextreme-react/scheduler';
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import {formatDate}  from 'devextreme/localization';
import { programsstore } from '../../api/programs';
//import { clientstore } from '../../api/clients';
//import { workoutsstore } from '../../api/workouts';
//import Query from 'devextreme/data/query';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './programs.scss';
import { Table } from 'reactstrap';
import { WorkoutPreview } from '../../components/workout-components/workout-preview'
import { ExercisePreview } from '../../components/exercise-components/exercise-preview'

//const currentDate = new Date(2022, 01, 01);
const views = ['day', 'workWeek', 'week', 'month', 'agenda'];

export default function Program() {
  const [workoutData, setWorkoutData] = useState({})
  const [workoutList, setWorkoutList] = useState({})
  const [clientList, setClientList] = useState({})
  const [editWorkout, setEditWorkout] = useState({})
  const [editedIndex, setEditedIndex] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [exercisePreview, setExercisePreview] = useState({});
  const [showExercise, setShowExercise] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const scheduler = useRef(null);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
};
const BackendUrl = process.env.REACT_APP_BACKEND_URL;
const ExercisesBackendUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";

const handlePreviewClose = () => {setShowPreview(false); setEditWorkout({});}
const handlePreviewShow = () => setShowPreview(true);

const handleExerciseShow = () => setShowExercise(true);
const handleExerciseClose = () => {setShowExercise(false);};
const handleExercisePreview = (exercise) => {setExercisePreview(exercise);handleExerciseShow();}

useEffect(() => {
  fetch(BackendUrl+"/clients/")
  .then(response => response.json())
  .then(data => setClientList(data))
},[])

useEffect(() => {
  fetch(BackendUrl+"/workouts/")
  .then(response => response.json())
  .then(data => setWorkoutList(data))
},[])

function onAppointmentFormOpening(e) {
  const { form } = e;
  //console.log(e.appointmentData)
  let { startdate } = e.appointmentData.startdate;
  let { enddate } = e.appointmentData.enddate;

  function OpenWorkoutPopup() {
    setWorkoutData(e.appointmentData.workout);
    setEditWorkout(e.appointmentData.workout)
    console.log(workoutData)
    scheduler.current.instance.hideAppointmentPopup()
    handlePreviewShow(true)
    //togglePopup();

  }

  const { popup } = e;
  const toolbarItems = popup.option("toolbarItems");
                const workoutButton = {
                  widget: "dxButton",
                  location: "before",
                  toolbar: "bottom",
                  options: {
                      text: "Open Workout",
                      onClick(e) {OpenWorkoutPopup()}
                  }
              };
              toolbarItems.push(workoutButton);
              popup.option("toolbarItems", toolbarItems);

  form.option('items', [{
    label: {
      text: 'Client',
    },
    editorType: 'dxSelectBox',
    dataField: 'user_id',
    
    editorOptions: {
      dataSource: clientList,
      displayExpr: 'fullname',
      valueExpr: 'id',
    },
  }, {
    label: {
      text: 'Workout',
    },
    name: 'workout',
    editorType: 'dxSelectBox',
    dataField: 'workout_id',
    editorOptions: {
      dataSource: workoutList,
      displayExpr: 'name',
      valueExpr: 'id',
    },
  }, {
    dataField: 'startdate',
    editorType: 'dxDateBox',
    editorOptions: {
      width: '100%',
      type: 'datetime',
      onValueChanged(args) {
        startdate = args.value;
      },
    },
  }, {
    name: 'enddate',
    dataField: 'enddate',
    editorType: 'dxDateBox',
    editorOptions: {
      width: '100%',
      type: 'datetime',
      onValueChanged(args) {
        enddate = args.value;
      },
    },
  },
  ]);
}

const renderPopup = () => {


  const Exercise = ({ name, image, description, video }) => (
    <tr>
      <td><img src={image} width={"60"} /></td>
      <td>{name}</td>
      <td style={ {width: 500, maxWidth: 500, wordBreak: 'break-all' } }>{description}</td>
      <td>{video? <video width="400" controls src={video}></video> : null }</td>
      {/* <td><video width="100" controls src={video} ></video> </td> */}
    </tr>
);

  if (workoutData) {
  return (
    <>
    <ScrollView width='100%' height='100%'>
      <div>
        <h6>Workout: {workoutData.name}</h6>
        <p>Type: {workoutData.workouttype}</p>
        <h6>Exercises</h6>
        <Table bordered responsive >
          <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Video</th>
              </tr>
            </thead>
          <tbody>
            {workoutData.exercises.map((exercise) =>
              <Exercise 
                name={exercise.name}
                description={exercise.description}
                video={exercise.videoupload_url}
                image={exercise.imageupload_url}
              />
/*               <tr>
                <td>Name: {exercise.name}</td>
                <td>Desc: {exercise.description}</td>
                <td><img width="400" src={exercise.imageupload_url}></img></td>
                <td>{exercise.videoupload_url? <video width="400" controls src={exercise.videoupload_url}></video> : null }</td>
              </tr> */
              )}
          </tbody>
        </Table>
      </div>
      </ScrollView>
    </>
  )}
  return (
    <h6>No Workout Assigned yet</h6>
  )
}

const renderAppointment = (data) => {

const {targetedAppointmentData} = data.data;
const starttime = formatDate(targetedAppointmentData.displayStartDate, 'shortTime')
const endtime = formatDate(targetedAppointmentData.displayEndDate, 'shortTime')
const fullname = targetedAppointmentData.user.firstname + ' ' + targetedAppointmentData.user.lastname
 return (
   <div className="appointment-preview">
      <div> <strong>{fullname}</strong></div>
      <div>
        <strong>{ targetedAppointmentData.workout.name}</strong>
      </div>
      <div>{starttime + ' - ' + endtime}
      </div>
    </div>
  );
}

const AppointmentTooltip = (data) => {

  const {targetedAppointmentData} = data.data;
  const starttime = formatDate(targetedAppointmentData.displayStartDate, 'shortTime')
  const endtime = formatDate(targetedAppointmentData.displayEndDate, 'shortTime')
  const fullname = targetedAppointmentData.user.firstname + ' ' + targetedAppointmentData.user.lastname
   return (
     <div className="appointment-preview">
        <div> <strong>{fullname}</strong></div>
        <div>
          <strong>{ targetedAppointmentData.workout.name}</strong>
        </div>
        <div>{starttime + ' - ' + endtime}
        </div>
      </div>
    );
  }



return (
  <React.Fragment>
            <WorkoutPreview 
            handleClose={handlePreviewClose}
            handleShow={handlePreviewShow}
            data={editWorkout}
            BackendUrl={BackendUrl}
            showPreview={showPreview}
            editedIndex={editedIndex}
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
    <h2 className={'content-block'}>Programs</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <Scheduler
          ref={scheduler}
          timeZone="Australia/Brisbane"
          dataSource={programsstore}
          startDateExpr="startdate"         
          endDateExpr="enddate"
          showAllDayPanel={false}
          views={views}
          startDayHour={5}
          endDayHour={19}
          defaultCurrentView="workWeek"
          height={600}
          adaptivityEnabled={true}
          onAppointmentFormOpening={onAppointmentFormOpening}
          appointmentComponent={renderAppointment}
          //appointmentTooltipComponent={AppointmentTooltip}
          >
          <Editing 
            allowAdding={true} />
          <Resource 
            fieldExpr="user_id"
            label="Client"
            dataSource={clientList} 
            useColorAsDefault={true} />
        </Scheduler>
        <Popup
            visible={isPopupVisible}
            title="Workout"
            showTitle={true}
            hideOnOutsideClick={true}
            onHiding={togglePopup} 
            contentRender={renderPopup} > 
        </Popup>
      </div>
    </div>
  </React.Fragment>
)
};




