import React, { useState, useEffect } from 'react';
import './profile.scss';
import Form, { SimpleItem, GroupItem, TabbedItem, TabPanelOptions, Tab, Item, ButtonItem, ButtonOptions } from 'devextreme-react/form';
import { useAuth0 } from "@auth0/auth0-react";


export default function Profile() {
  const { user } = useAuth0();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const serverrequest = process.env.REACT_APP_BACKEND_URL+`/users/?email=${user.email}`;

 
  useEffect(() => {
    fetch(serverrequest)
      .then(response => response.json())
      .then((profiledata) => {
        setLoading(false);
        setData(profiledata);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
        setError(e)
      });
  }, []);


  return (
    <React.Fragment>
      <h2 className={'content-block'}>Profile</h2>
      <div className={'content-block dx-card responsive-paddings'}>
        <div className={'form-avatar'}>
            <img
              alt={'trainer'}
              src={user.picture}
            />
          </div>
        <Form
          id={'form'}
          formData={data}
          disabled={true}
          labelLocation={'top'}
          colCountByScreen={colCountByScreen}
        >
          {/* <Item
            dataField="firstname"
          /> */}
          {/* <SimpleItem dataField="firstname" /> */}
        </Form>
        Auth0 Email: {user.email}<br></br>
        Auth0 Image: {user.picture}
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
