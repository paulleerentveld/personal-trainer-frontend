import CustomStore from 'devextreme/data/custom_store';

const workoutBackendUrl = process.env.REACT_APP_BACKEND_URL+"/workouts/";

export const workoutsstore = new CustomStore({
    key: 'id',
    //loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
    load: () => {
        return fetch(workoutBackendUrl)
            .then(handleErrors)
            .then(response => response.json())
            .catch(() => { throw 'Network error' });
    },
    byKey: (key) => {
      return fetch(workoutBackendUrl+key)
    },
    insert: (values) => {
      return fetch(workoutBackendUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    update: (key, values) => {
      return fetch(workoutBackendUrl+encodeURIComponent(key), {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    remove: (key) => {
      return fetch(workoutBackendUrl+encodeURIComponent(key), {
          method: "DELETE"
      })
      .then(handleErrors);
    }
  });

  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }