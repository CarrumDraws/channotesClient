Libraries:
- redux: State Management Package
- react-router-dom: Routing

- react-redux: Allows us to use redux and react together
- @reduxjs/toolkit: Redux Wrapper- simplifies Redux
- redux-persist: Stores redux store in local storage

- jose: JWT Management for Frontend

- formik: Error Handling / Form Validation
- yup: Form Validation
- react-dropzone: File Upload



Todo: 
- Create Form + Route Backend
- Material UI
- Formik, Yup

Questions: 
- Should I store userdata in local storage or make an API call each time?
- How should I deal with data thats been manipulated in local storage?

Things To Search Up:
- Figure out what other apps store in localstorage + the flow of login data
- You should probably diagram this stuff out...

Ideas: 
- Possibly split up redux into multiple slices?

Structure:
Sub-Component: Tiny reusable aspects of the UI
Components: Chunks made up of sub-components

NOTES: -------------

loginPage handleCredentialResponse() is a complex function. Based on google "sub" value and email, it checks if you have an account or not. If you do have an account, it routes to homepage. If you don't have an account, it creates a new user, complete with profile picture (Needs to download profile picture as a File from google URL first), then rotues to /editProfile.