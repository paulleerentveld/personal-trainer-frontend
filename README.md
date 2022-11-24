## Personal Trainer App - Frontend React
This is my phase 5 project App. The app allows a Personal Trainer to setup their clients, create exercises and upload photos/videos, generate workout templates and schedule workouts and link to clients and workout templates. 

## Limitations
- Add clients and exercises you cannot upload images/vidoes at the same. There needs to be a record to attach to. This needs more work to allow file upload on form submission. 
- On the Program schedules the select boxes lookup the client and workout templates. These work but initially do not load what they are linked to already. If you click the select box and click away it loads. This is due to the selectbox data load, I need to store the lists with useState first and then reference this I think but needs more work to fix. 

## Dependancies
Main libraries I used are Devextreme for the Grids, menus and other components. These should load on install bundle.
Auth0 is used for the authentication. There is no register option.

## Install Steps
- Download and run npm install
- Populate .ENV file with Auth0 domain and client id. 
- Make local server run on port 3000.
- Make sure backed is running on port 3001 or change in .ENV file on react to point to your server. 
- npm start 

## Example .ENV file. 
REACT_APP_AUTH0_DOMAIN="domain-key"
REACT_APP_AUTH0_CLIENT_ID="client-id"
REACT_APP_BACKEND_URL="http://localhost:3001"






## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
