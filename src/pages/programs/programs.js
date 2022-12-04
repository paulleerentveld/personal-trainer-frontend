import React, {useState, useEffect} from 'react';
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

//const currentDate = new Date(2022, 01, 01);
const views = ['day', 'workWeek', 'week', 'month', 'agenda'];

export default function Program() {
  const [workoutData, setWorkoutData] = useState({})
  const [workoutList, setWorkoutList] = useState({})
  const [clientList, setClientList] = useState({})
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
};
const BackendUrl = process.env.REACT_APP_BACKEND_URL;

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
    //let workoutData = e.appointmentData.workout
    setWorkoutData(e.appointmentData.workout);
    togglePopup();
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

  if (workoutData) {
  return (
    <>
    <ScrollView width='100%' height='100%'>
      <div>
        <h6>Workout: {workoutData.name}</h6>
        <p>Type: {workoutData.workouttype}</p>
        <p>Desc: {workoutData.description}</p>
        <p>Notes: {workoutData.notes}</p>
        <h6>Exercises</h6>
        <table className='workout-table'>
          <tbody>
            {workoutData.exercises.map((exercise) =>
              <tr>
                <td>Name: {exercise.name}</td>
                <td>Desc: {exercise.description}</td>
                <td><img width="400" src={exercise.imageupload_url}></img></td>
                <td>{exercise.videoupload_url? <video width="400" controls src={exercise.videoupload_url}></video> : null }</td>
              </tr>
              )}
          </tbody>
        </table>
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



return (
  <React.Fragment>
    <h2 className={'content-block'}>Programs</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <Scheduler
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




