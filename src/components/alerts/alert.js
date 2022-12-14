import { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
    
const AlertMessage = ({ variant, message, setMessages, showMessage, setShowMessage }) => {
  const [show, setShow] = useState(true)

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowMessage(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!showMessage) {
    return null;
  }

  // If show is true this will be returned
  return (
    <div style={{ position: "fixed", bottom: "5px", left:"10%", width: "80%"}}>
      <Alert variant={variant} onClose={() => {setShowMessage(false); setMessages()}} dismissible>{message} </Alert>
    </div>
  )
}

Alert.defaultPros = {
  variant: 'info',
}

export default AlertMessage