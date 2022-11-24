import CustomStore from 'devextreme/data/custom_store';

const exerciseBackendUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";

export const exercisestore = new CustomStore({
    key: 'id',
    //loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
    load: () => {
        return fetch(exerciseBackendUrl)
            .then(handleErrors)
            .then(response => response.json())
            .catch(() => { throw 'Network error' });
    },
    byKey: (key) => {
      return fetch(exerciseBackendUrl+key)
    },
    insert: (values) => {
      return fetch(exerciseBackendUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    update: (key, values) => {
      return fetch(exerciseBackendUrl+encodeURIComponent(key), {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    remove: (key) => {
      return fetch(exerciseBackendUrl+encodeURIComponent(key), {
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