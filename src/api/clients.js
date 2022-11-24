import CustomStore from 'devextreme/data/custom_store';

const clientBackendUrl = process.env.REACT_APP_BACKEND_URL+"/clients/";

export const clientstore = new CustomStore({
    key: 'id',
    //loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
    load: () => {
        return fetch(clientBackendUrl)
            .then(handleErrors)
            .then(response => response.json())
            .catch(() => { throw 'Network error' });
    },
    byKey: (key) => {
      return fetch(clientBackendUrl+key)
    },
    insert: (values) => {
      return fetch(clientBackendUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    update: (key, values) => {
      return fetch(clientBackendUrl+encodeURIComponent(key), {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    remove: (key) => {
      return fetch(clientBackendUrl+encodeURIComponent(key), {
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