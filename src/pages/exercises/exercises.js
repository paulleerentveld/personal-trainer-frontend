import React, { useState, useCallback } from 'react';
import DataGrid, { Column, Editing, Popup, Paging, FilterRow, Form, SelectBox, Lookup,} from 'devextreme-react/data-grid';
import { Item, GroupItem, Label, SimpleItem } from 'devextreme-react/form';
import { exercisestore } from '../../api/exercises';
import './exercises.scss';
import ReactPlayer from 'react-player'
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';


const notesEditorOptions = { height: 200 };
const categories = [
  'Cardio',
  'Strength',
  'Balance',
  'Flexibility',
];
const bodyparts = [
  'Chest',
  'Back',
  'Shoulders',
  'Triceps',
  'Biceps',
  'Quads',
  'Hamstrings',
  'Calves',
];

const fileUploadUrl = process.env.REACT_APP_BACKEND_URL+"/exercises/";
let fileUploaderRef = React.createRef();
let imgRef = React.createRef();
let videoRef = React.createRef();


export default function Exercise() {
  const [editorData, seteditorData] = useState(0);
  const [retryButtonVisible, setRetryButtonVisible] = useState(false);
  const [videoRetryButtonVisible, setVideoRetryButtonVisible] = useState(false);
  const refreshGrid = useCallback(() => {
    DataGrid.current.instance.refresh()
  })

  function onEditingStart(data) {
    seteditorData(data.data)
  }

  function onCancelSave() {
    seteditorData(0)
  }

  function videoRender() {
    if (editorData.videoupload_url == "" || editorData.videoupload_url == null) {
      return
    } else {
      return <>
{/*               <ReactPlayer url={editorData.videoupload_url} 
                config={{
                  file: {
                    attributes: {
                      crossOrigin: "true",
                    }
                  }
                }} /> */}
              <video width="600" controls src={editorData.videoupload_url} ></video> 
            </>
    }
  }
  function imageRender() {
    if (editorData.imageupload_url == "" || editorData.imageupload_url == null) {
      return
    } else {
      return <img src={editorData.imageupload_url} width="400" alt='exercise'/>
    }
  } 

  function editImageCellRender(cellInfo) {
    return (
        <>
          {cellInfo.data.imageupload_url? <img width={"400"} ref={imgRef} className="uploadedImage" src={cellInfo.data.imageupload_url} alt="exercise pic"/> : null}
          <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="instantly"
                        uploadUrl={fileUploadUrl+cellInfo.data.id} onValueChanged={onValueChanged}
                        onUploaded={e => onUploaded(e, cellInfo)} onUploadError={onUploadError} uploadMethod="PUT" name='exercise[imageupload]'/>
          <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick}/>
        </>
      );
    }

    const onUploaded = useCallback((e, cellInfo) => {
      refreshGrid();
      setRetryButtonVisible(false);
    }, []);
  
    const onUploadError = useCallback(e => {
      let xhttp = e.request;
      if (xhttp.status === 400) {
        e.message = e.error.responseText;
      }
      if (xhttp.readyState === 4 && xhttp.status === 0) {
        e.message = "Connection refused";
      }
      setRetryButtonVisible(true);
    }, []);

    const onClick = e => {
      // The retry UI/API is not implemented. Use a private API as shown at T611719.
      const fileUploaderInstance = fileUploaderRef.current.instance;
      for (let i = 0; i < fileUploaderInstance._files.length; i++) {
        delete fileUploaderInstance._files[i].uploadStarted;
      }
      fileUploaderInstance.upload();
    };
    
    const onValueChanged = e => {
      const reader = new FileReader();
      reader.onload = function (args) {
        imgRef.current.setAttribute('src', args.target.result);
      }
      reader.readAsDataURL(e.value[0]); // convert to base64 string
      
    };
  
    function editVideoCellRender(cellInfo) {
      return (
          <>
            {cellInfo.data.videoupload_url? <video  ref={videoRef} className="uploadedVideo" width="600" controls src={cellInfo.data.videoupload_url} ></video> : null}
            <FileUploader ref={fileUploaderRef} multiple={false} accept="video/*" uploadMode="instantly"
                          uploadUrl={fileUploadUrl+cellInfo.data.id} onValueChanged={onVideoValueChanged}
                          onUploaded={e => onVideoUploaded(e, cellInfo)} onUploadError={onVideoUploadError} uploadMethod="PUT" name='exercise[videoupload]'/>
            <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onVideoClick}/>
          </>
        );
      }
  
      const onVideoUploaded = useCallback((e, cellInfo) => {
        refreshGrid();
        setVideoRetryButtonVisible(false);
      }, []);
    
      const onVideoUploadError = useCallback(e => {
        let xhttp = e.request;
        if (xhttp.status === 400) {
          e.message = e.error.responseText;
        }
        if (xhttp.readyState === 4 && xhttp.status === 0) {
          e.message = "Connection refused";
        }
        setVideoRetryButtonVisible(true);
      }, []);
  
      const onVideoClick = e => {
        // The retry UI/API is not implemented. Use a private API as shown at T611719.
        const fileUploaderInstance = fileUploaderRef.current.instance;
        for (let i = 0; i < fileUploaderInstance._files.length; i++) {
          delete fileUploaderInstance._files[i].uploadStarted;
        }
        fileUploaderInstance.upload();
      };
      
      const onVideoValueChanged = e => {
        const reader = new FileReader();
        reader.onload = function (args) {
          videoRef.current.setAttribute('src', args.target.result);
        }
        reader.readAsDataURL(e.value[0]); // convert to base64 string
        
      };
    


  return (
  <React.Fragment>
    <h2 className={'content-block'}>Exercises</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <div id="data-grid">
                <DataGrid
                  dataSource={exercisestore}
                  keyExpr="id"
                  showBorders={true}
                  focusedRowEnabled={true}
                  columnAutoWidth={true}
                  columnHidingEnabled={true}
                  onEditingStart={onEditingStart}
                  onEditCanceled={onCancelSave}
                  onSaved={onCancelSave}
                >
                  <Paging enabled={false} />
                  <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}>
                    <Popup title={editorData.name} showTitle={true} />
                    <Form>
                      <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="name" />
                        <Item 
                          dataField="description"
                          editorType="dxTextArea"/>
                        <Item dataField="category"  />
                        <Item dataField="bodypart" />
                      </Item>
                      <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="image_url" colSpan={1}/>
                        <Item dataField="video_url" colSpan={1}/>
                      </Item>
                      {/* <Item itemType="group" colCount={2} colSpan={2}>
                      <Item render={videoRender} />
                      <Item render={imageRender} />
                      </Item> */}
                    </Form>
                  </Editing>
                  <FilterRow visible={true} />
                  <Column dataField="image" 
                    width={100}
                    allowSorting={false}
                    cellRender= {cellRender}
                    hidingPriority={4}
                    />
                  <Column dataField="name" caption={"Name"} defaultSortOrder="asc"  />
                  <Column dataField="description" caption={"Description"} hidingPriority={0} />
                  <Column dataField="category" caption={"Category"}>
                    <Lookup dataSource={categories} />
                  </Column>
                  <Column dataField="bodypart" caption={"Bodypart"}> 
                    <Lookup dataSource={bodyparts} />
                  </Column>
                  <Column dataField="video" 
                    caption={"Video"} 
                    visible={false}
                   />
                  <Column dataField="image_url" 
                    width={100}
                    allowSorting={false}
                    //cellRender= {cellRender}
                    editCellRender={editImageCellRender}
                    hidingPriority={4}
                    visible={false}
                    caption="Image"
                  />
                    <Column dataField="video_url" 
                    width={100}
                    allowSorting={false}
                    //cellRender= {cellRender}
                    editCellRender={editVideoCellRender}
                    hidingPriority={4}
                    visible={false}
                    caption="Video"
                  />
                </DataGrid>
              </div>
      </div>
    </div>
  </React.Fragment>
)};

function cellRender(data) {
  return <img src={data.value || "/images/icons/exercise.png"} width="100%" alt='exercise' />;
}





