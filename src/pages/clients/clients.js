import React, { useState, useCallback } from 'react';
import DataGrid, { Column, Editing, Popup, Paging, FilterRow, Form, Button as Button2, Lookup} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { clientstore } from '../../api/clients';
import './clients.scss';
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';

const notesEditorOptions = { height: 200 };
const clientType = ["client"]
const sex = [
  'Male',
  'Female',
];



const fileUploadUrl = process.env.REACT_APP_BACKEND_URL+"/clients/";
let fileUploaderRef = React.createRef();
let imgRef = React.createRef();



function itemRender(data) {
  return (
    <div>
      <img src={data.editorOptions.value} width="100" alt='client' />
    </div>
  );
}


export default function Client() {
  const [retryButtonVisible, setRetryButtonVisible] = useState(false);
  const refreshGrid = useCallback(() => {
    DataGrid.current.instance.refresh()
  })

  function cellRender(data) {
    return <img src={data.value} width="100" alt='client' />;
  }

  function editCellRender(cellInfo) {
    return (
        <>
        {console.log(cellInfo)}
          {cellInfo.data.avatar_url? <img width={"400"} ref={imgRef} className="uploadedImage" src={cellInfo.data.avatar_url} alt="client pic"/> : null}
          <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="instantly"
                        uploadUrl={fileUploadUrl+cellInfo.data.id} onValueChanged={onValueChanged}
                        onUploaded={e => onUploaded(e, cellInfo)} onUploadError={onUploadError} uploadMethod="PUT" name='user[avatar]'/>
          <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick}/>
        </>
      );
    }

    const onUploaded = useCallback((e, cellInfo) => {
      refreshGrid();
      //cellInfo.setValue("uploads/image/" + e.request.responseText);
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

    const onEditCanceled = useCallback(e => {
      if (retryButtonVisible)
        setRetryButtonVisible(false);
    }, [retryButtonVisible])
  
    const onSaved = useCallback(e => {
      console.log(e)
      if (retryButtonVisible)
        setRetryButtonVisible(false);
    }, [retryButtonVisible])

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Clients</h2>
      <div className={'content-block'}>
          <div className={'dx-card responsive-paddings'}>
            <div id="data-grid">
              <DataGrid
                dataSource={clientstore}
                key="id"
                showBorders={true}
                focusedRowEnabled={true}
                columnAutoWidth={true}
                columnHidingEnabled={true}
                onEditCanceled={onEditCanceled}
                onSaved={onSaved}
              >
                <Paging enabled={false} />
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowAdding={true}
                  allowDeleting={true}>
                  <Popup title="Client Info" showTitle={true} />
                  <Form>
                    <Item itemType="group" colCount={1} colSpan={1}>
                      <Item dataField="avatar_url" colSpan={1}/>
                    </Item>
                    <Item itemType="group" colCount={2} colSpan={2}>
                      <Item dataField="firstname" />
                      <Item dataField="lastname" />
                      <Item dataField="email" />
                      <Item dataField="mobile" />
                      <Item dataField="sex" />
                      <Item dataField="dob" />
                      <Item dataField="usertype" />
                      <Item dataField="height" />
                      <Item dataField="weight" />
                      <Item dataField="authlinked" visible={false} />
                      <Item
                        dataField="notes"
                        editorType="dxTextArea"
                        colSpan={2}
                        editorOptions={notesEditorOptions} />
                    </Item>
                  </Form>
                </Editing>
                <FilterRow visible={true} />
                <Column dataField="avatar_url" 
                  width={100}
                  allowSorting={false}
                  cellRender= {cellRender}
                  editCellRender={editCellRender}
                  hidingPriority={4}
                  caption="Avatar"
                  />
                <Column dataField="firstname" caption="Firstname"/>
                <Column dataField="lastname" caption="Lastname" />
                <Column dataField="email" caption="Email" hidingPriority={3} />
                <Column dataField="mobile" caption="Mobile" hidingPriority={2} />
                <Column dataField="sex" caption="Sex" hidingPriority={1} >
                  <Lookup dataSource={sex} />
                </Column>
                <Column dataField="dob" caption="DOB" dataType="date" hidingPriority={0} />
                <Column dataField="authlinked" caption="Auth" hidingPriority={0} visible={false} />
                <Column dataField="weight" caption="Weight" visible={false} />
                <Column dataField="height" caption="Height" visible={false} />
                <Column dataField="usertype" caption="Client Type" visible={false}>
                  <Lookup dataSource={clientType} />
                </Column>
                <Column dataField="notes" visible={false} />
              </DataGrid>
            </div>
        </div>
      </div>
    </React.Fragment>
  )};

