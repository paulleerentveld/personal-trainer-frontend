import CustomStore from 'devextreme/data/custom_store';

const userBackendUrl = process.env.REACT_APP_BACKEND_URL+"/users/";

export const usersstore = new CustomStore({
    key: 'id',
    //loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
    load: () => {
        return fetch(userBackendUrl)
            .then(handleErrors)
            .then(response => response.json());
            //.catch(() => { throw 'Network error' });
    },
    byKey: (key) => {
      return fetch(userBackendUrl+key)
    },
    insert: (values) => {
      return fetch(userBackendUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    update: (key, values) => {
      return fetch(userBackendUrl+encodeURIComponent(key), {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(handleErrors);
    },
  
    remove: (key) => {
      return fetch(userBackendUrl+encodeURIComponent(key), {
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