import React, { useEffect, useState, forwardRef } from "react";

import Popup from "./Popup";
import TextInput from "../../components/TextInput/TextInput";
import ButtonSmallPair from "../../components/Buttons/ButtonSmallPair";

function EditNoteTitle({ isOpen, handleClose, handleSubmit }) {
  return (
    <Popup
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={"Set Title"}
      description={"Enter a new title for this note."}
    >
      <TextInput name="data" defaultValue={"New Note"} />
      <ButtonSmallPair
        leftText="Cancel"
        rightText="Save"
        leftFunc={handleClose}
        rightFunc={() => {}}
      />
    </Popup>
  );
}

export default EditNoteTitle;
