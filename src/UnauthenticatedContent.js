import { useAuth0 } from "@auth0/auth0-react";


export default function UnauthenticatedContent() {
  const { loginWithRedirect } = useAuth0();
  return loginWithRedirect()
 
}





    
