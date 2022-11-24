import CustomStore from 'devextreme/data/custom_store';

const programBackendUrl = process.env.REACT_APP_BACKEND_URL+"/clientworkouts/";

export const programsstore = new CustomStore({
    key: 'id',
    //loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
    load: () => {
        return fetch(programBackendUrl)
            .then(handleErrors)
            .then(response => response.json())
            .catch(() => { throw 'Network error' });
    },
    byKey: (key) => {
      return fetch(programBackendUrl+key)
    },
    insert: (values) => {
      return fetch(programBackendUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    update: (key, values) => {
      return fetch(programBackendUrl+encodeURIComponent(key), {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    remove: (key) => {
      return fetch(programBackendUrl+encodeURIComponent(key), {
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