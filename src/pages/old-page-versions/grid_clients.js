import React, { useState, useCallback } from 'react';
import DataGrid, { Column, Editing, Popup, Paging, FilterRow, Form, Button as Button2, Lookup, SearchPanel} from 'devextreme-react/data-grid';
import ActionSheet from 'devextreme-react/action-sheet';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { clientstore } from '../../api/clients';
import './clients.scss';
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';

const notesEditorOptions = { height: 150 };
const clientType = ["client"]
const sex = [
  'Male',
  'Female',
];

export const actionSheetItems = [
  { text: 'Edit' },
  { text: 'Delete' },
];



const fileUploadUrl = process.env.REACT_APP_BACKEND_URL+"/clients/";
let fileUploaderRef = React.createRef();
let imgRef = React.createRef();
let gridRef = React.createRef();



function itemRender(data) {
  return (
    <div>
      <img src={data.editorOptions.value} width="100" alt='client' />
    </div>
  );
}


export default function Client() {
  const [retryButtonVisible, setRetryButtonVisible] = useState(false);
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const refreshGrid = useCallback(() => {
    gridRef.current.instance.refresh(true)
  })

  function onActionsheetVisibleChange(isVisible) {
    if (isVisible !== isActionSheetVisible) {
      setIsActionSheetVisible(isVisible)
    }
  }

  function cellRender(data) {
    return <img src={data.value} width="100%" alt='client' />;
  }

  function editCellRender(cellInfo) {
    return (
        <>
        {console.log(cellInfo)}
          {cellInfo.data.avatar_url? <img width={"300"} ref={imgRef} className="uploadedImage" src={cellInfo.data.avatar_url} alt="client pic"/> : null}
          <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="instantly"
                        uploadUrl={fileUploadUrl+cellInfo.data.id} onValueChanged={onValueChanged}
                        onUploaded={e => onUploaded(e, cellInfo)} onUploadError={onUploadError} uploadMethod="PUT" name='user[avatar]'/>
          <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick}/>
        </>
      );
    }

    const onUploaded = useCallback((e, cellInfo) => {
      //refreshGrid();
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
      refreshGrid()
      if (retryButtonVisible)
        setRetryButtonVisible(false);
    }, [retryButtonVisible])
  
    const onSaved = useCallback(e => {
      refreshGrid()
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
                ref={gridRef}
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
                <SearchPanel visible={true} width="200" />
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowAdding={true}
                  allowDeleting={true}
                  hidingPriority={0}
                  >
                  <Popup title="Client Info" showTitle={true} />
                  <Form>
                    <Item itemType="group" colCount={1} colSpan={1}>
                        <Item dataField="avatar_url" colSpan={1} />
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
                  hidingPriority={5}
                  caption=""
                  />
                <Column dataField="firstname" caption="Firstname" visible={false}/>
                <Column dataField="lastname" caption="Lastname" visible={false} />
                <Column dataField="fullname" caption="Name" />
                <Column dataField="email" caption="Email" hidingPriority={4} />
                <Column dataField="mobile" caption="Mobile" hidingPriority={3} />
                <Column dataField="sex" caption="Sex" hidingPriority={2} >
                  <Lookup dataSource={sex} />
                </Column>
                <Column dataField="dob" caption="DOB" dataType="date" hidingPriority={1} />
                <Column dataField="authlinked" caption="Auth" visible={false} />
                <Column dataField="weight" caption="Weight" visible={false} />
                <Column dataField="height" caption="Height" visible={false} />
                <Column dataField="usertype" caption="Client Type" visible={false}>
                  <Lookup dataSource={clientType} />
                </Column>
                <Column dataField="notes" visible={false} />
                <Column type="buttons" hidingPriority={0} width="70" >
                  <Button2 name="edit" ></Button2>
                  <Button2 name="delete" ></Button2>
                </Column>
 
              </DataGrid>

            </div>
        </div>
      </div>
    </React.Fragment>
  )};

