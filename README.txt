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

- @mui/material: Material UI
- @emotion/react: Icons

- quill: Notetaking component

- gsap: Animation

Todo: 

- Main Pages (Mobile and Desktop):
    - Login
    - home
    - myProfile
    - Search

Questions: 
- Should I store userdata in local storage or make an API call each time?
- How should I deal with data thats been manipulated in local storage?
- How do I test small components within this large project?
- For GSAP, Do I have to do anything on component unmount??

Backlog: 
- Manage note thumbnail pictures
- Manage Users with No Google Image
- Add "subtext" property to note objects to display their subtexts.

Structure:
Sub-Component: Tiny reusable aspects of the UI
Components: Chunks made up of sub-components

NOTES: -------------

loginPage handleCredentialResponse() is a complex function. Based on google "sub" value and email, it checks if you have an account or not. If you do have an account, it routes to homepage. If you don't have an account, it creates a new user, complete with profile picture (Needs to download profile picture as a File from google URL first), then rotues to /editProfile.


QUESTIONS: ----------
- Is it safe to store userdata in localStorage? The user can modify it at will...

Things My App Can Do:
- Manage image filenames with spaces in them
