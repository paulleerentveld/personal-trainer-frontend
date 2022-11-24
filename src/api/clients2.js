import CustomStore from 'devextreme/data/custom_store';

const clientBackendUrl = process.env.REACT_APP_BACKEND_URL+"/clients/";

async function loadClients(url = clientBackendUrl) {
  const response = await fetch(url);
  return response.json(); // parses JSON response into native JavaScript objects
}

export { loadClients }