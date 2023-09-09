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
- styled-components: DRY's Repetitive CSS

Todo: 
- Manage Users with No Google Image
- Create yourNotes page w/top Beare
- Create myProfile page
- Create myFriends/addFriends page
- Flesh out design
- Make a Dev and Prod DB
- RefreshData isn't working smoothly...

Questions: 
- Should I store userdata in local storage or make an API call each time?
- How should I deal with data thats been manipulated in local storage?

Backlog: 
- How does this work if user has no google profile pic image?

Structure:
Sub-Component: Tiny reusable aspects of the UI
Components: Chunks made up of sub-components

NOTES: -------------

loginPage handleCredentialResponse() is a complex function. Based on google "sub" value and email, it checks if you have an account or not. If you do have an account, it routes to homepage. If you don't have an account, it creates a new user, complete with profile picture (Needs to download profile picture as a File from google URL first), then rotues to /editProfile.


QUESTIONS: ----------

- Is it safe to store userdata in localStorage? The iuser can modify it at will...


Things My App Can Do:
- Manage image filenames with spaces in them
