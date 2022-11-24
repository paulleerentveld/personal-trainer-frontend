import CustomStore from 'devextreme/data/custom_store';
import { useAuth0 } from "@auth0/auth0-react";

const userBackendUrl = process.env.REACT_APP_BACKEND_URL+"/users?email=test@veldnet.com.au";
//let apipath = 'http://localhost:3001/users?email=test@veldnet.com.au'

export const userprofile = new CustomStore({
    //loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
    load: () => {
        return fetch(userBackendUrl)
            .then(handleErrors)
            .then(response => response.json())
            .catch(() => { throw 'Network error' });
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
      return fetch(userBackendUrl, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              'Content-Type': 'application/json'
          }
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