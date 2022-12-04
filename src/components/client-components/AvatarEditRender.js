import React, { useState, useCallback } from 'react';
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';

const fileUploadUrl = "http://localhost:3001/clients/";
let fileUploaderRef = React.createRef();
let imgRef = React.createRef();


function AvatarEditRender({ cellInfo }) {
    return (
            
        <>
          <img width={"400"} ref={imgRef} className="uploadedImage" src={cellInfo.data.avatar_url} alt="client pic"/>
          <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="useButtons"
                        uploadUrl={fileUploadUrl+cellInfo.data.id} onValueChanged={onValueChanged}
                        onUploaded={e => onUploaded(e, cellInfo)} onUploadError={onUploadError} uploadMethod="PUT" name='user[avatar]'/>
          <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick}/>
        </>
      );

    const onUploaded = useCallback((e, cellInfo) => {
        cellInfo.setValue("uploads/image/" + e.request.responseText);
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

        }

export {AvatarEditRender}

