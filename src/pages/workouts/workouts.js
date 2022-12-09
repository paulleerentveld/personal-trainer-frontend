import React from 'react';
import DataGrid, { Column, Editing, Popup, Paging, FilterRow, Form, MasterDetail, Lookup, SearchPanel, } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import TagBox from 'devextreme-react/tag-box';
import { workoutsstore } from '../../api/workouts';
import { exercisestore } from '../../api/exercises';
import { ExercisesTagBox } from '../../components/exercises-tagbox/ExercisesTagBox'
import { Table } from 'reactstrap';
import './workouts.scss';

const workoutType = [
  'Bodybuilding',
  'Strength',
  'Cardio',
  'HIT',
];


const exerciseDetails = ({ data }) => {
  function getExercises()  {
    
  }

  const Exercise = ({ name, image, description, video }) => (
        <tr>
          <td><img src={image} width={"60"} /></td>
          <td>{name}</td>
          <td style={ {width: 500, maxWidth: 500, wordBreak: 'break-all' } }>{description}</td>
          {/* <td><video width="100" controls src={video} ></video> </td> */}
        </tr>
  );

  return (
      <div >
        <p><strong>Exercises</strong></p>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {data.exercises.map((exercise) => (
            <Exercise
              name={exercise.name}
              image={exercise.imageupload_url || '/images/icons/exercise.png'}
              // video={exercise.videoupload_url || '/images/icons/exercise.png'}
              description={exercise.description}
              key={exercise.id}
            />
          ))}
          </tbody>
        </Table>
      </div>
  );
};


export default function Workout() {

  function cellTemplate(container, options) {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  function calculateFilterExpression(filterValue, selectedFilterOperation, target) {
    if (target === 'search' && typeof (filterValue) === 'string') {
      return [this.dataField, 'contains', filterValue];
    }
    return function(data) {
      return (data.exercise_ids || []).indexOf(filterValue) !== -1;
    };
  }

return (
  <React.Fragment>
    <h2 className={'content-block'}>Workouts</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
      <div id="data-grid">
              <DataGrid
                dataSource={workoutsstore}
                showBorders={true}
                focusedRowEnabled={true}
                columnAutoWidth={true}
                columnHidingEnabled={true}
                wordWrapEnabled={true}
              >
                <Paging enabled={false} />
                <SearchPanel visible={true} width="200" />
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowAdding={true}
                  allowDeleting={true}>
                  <Popup title="Workout Details" showTitle={true} />
                  <Form>
                    <Item itemType="group" colCount={2} colSpan={2}>
                      <Item dataField="name" caption={"Name"} />
                      <Item dataField="workouttype" caption={"Type"} />
                      <Item dataField="exercise_ids" caption={"Exercises"}  />
                    </Item>
                  </Form>
                </Editing>
                <FilterRow visible={true} />
                <Column dataField="name" caption={"Name"} width="120"  />
                <Column dataField="workouttype" caption={"Workout Type"} >
                  <Lookup dataSource={workoutType} />
                </Column>
                <Column
                  dataField="exercise_ids"
                  caption="Exercises"
                  width={200}
                  allowSorting={false}
                  editCellComponent={ExercisesTagBox}
                  cellTemplate={cellTemplate}
                  calculateFilterExpression={calculateFilterExpression}>
                  <Lookup
                    dataSource={exercisestore}
                    valueExpr="id"
                    displayExpr="name"
                  />
                </Column>
                <MasterDetail 
                  enabled={true}
                  render={exerciseDetails}
                />
              </DataGrid>
            </div>
      </div>
    </div>
  </React.Fragment>
)};
