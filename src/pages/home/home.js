import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import Box, { Item, } from 'devextreme-react/box';
import { Button } from 'devextreme-react/button';


export default function Home() {

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Home</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <Box
            direction="row"
            width="100%"
            align="center"
            height={75}>
          <Item ratio={1}>
            <div className="home-button-container">
              <Link to={'/clients'}>
                <Button icon="group"
                      text="Clients"
                      className='home-button'
                      width="140" 
                      height="50" />
              </Link>
            </div>
          </Item>
          <Item ratio={1}>
            <div className="home-button-container">
              <Link to={'/exercises'}>
                <Button icon="runner"
                      text="Exercises"
                      className='home-button'
                      width="140"
                      height="50" />
              </Link>
            </div>
          </Item>
        </Box>
        <Box
            direction="row"
            width="100%"
            align="center"
            height={75}>
          <Item ratio={1}>
            <div className="home-button-container">
              <Link to={'/workouts'}>
                <Button icon="checklist"
                      text="Workouts"
                      className='home-button'
                      width="140"
                      height="50" />
              </Link>
            </div>
          </Item>
          <Item ratio={1}>
            <div className="home-button-container">
              <Link to={'/programs'}>
                <Button icon="event"
                      text="Programs"
                      className='home-button'
                      width="140"
                      height="50" />
              </Link>
            </div>
          </Item>
        </Box>
        </div>
      </div>
    </React.Fragment>
)}
