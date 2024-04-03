import React, { useEffect, useState, forwardRef } from "react";

import Popup from "./Popup";
import TextInput from "../TextInput/TextInput";
import ButtonSmallPair from "../Buttons/ButtonSmallPair";

function FolderPopup({ type = "new", isOpen, handleClose, handleSubmit }) {
  return (
    <Popup
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={type === "rename" ? "Rename Folder" : "New Folder"}
      description={
        type === "rename"
          ? "Enter a new name for this folder."
          : "Enter a name for this folder."
      }
    >
      <TextInput name="data" defaultValue={"New Folder"} />
      <ButtonSmallPair
        leftText="Cancel"
        rightText="Create"
        leftFunc={handleClose}
        rightFunc={() => {}}
      />
    </Popup>
  );
}

export default FolderPopup;
