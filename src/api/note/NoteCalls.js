import axios from "axios";

async function GetNotes({ chan_token, folder_id, url }) {
  try {
    // Axios throws an "AxiosError" when it recieves a 4XX or 5XX error code
    let route = folder_id
      ? `${url}/notes?folder_id=${folder_id}`
      : `${url}/notes`;
    let { data, status } = await axios.get(route, {
      headers: {
        Authorization: `Bearer ${chan_token}`,
      },
    });
    if (200 <= status && status < 300) return data;
    else throw new Error("GetNotes Failed"); // Throw generic "Error"
  } catch (error) {
    // throwing triggers catch block that GetNotes is called in
    if (error?.response?.data?.message)
      throw new Error(error.response.data.message); // AxiosError
    else throw error.message; // Error
  }
}

async function CreateNote({ url, chan_token, folder_id }) {
  try {
    let route = `${url}/note`;
    let { data, status } = await axios.post(
      route,
      {
        folder_id: folder_id,
      },
      {
        headers: {
          Authorization: `Bearer ${chan_token}`,
        },
      }
    );
    if (200 <= status && status < 300) return data;
    else throw new Error("CreateNote Failed");
  } catch (error) {
    if (error?.response?.data?.message)
      throw new Error(error.response.data.message);
    else throw error.message;
  }
}

async function EditNote({
  url,
  chan_token,
  note_id,
  folder_id,
  pinned,
  locked,
  password,
}) {
  try {
    let route = `${url}/note?note_id=${note_id}`;
    let { data, status } = await axios.put(
      route,
      {
        folder_id: folder_id,
        pinned: pinned,
        locked: locked,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${chan_token}`,
        },
      }
    );
    if (200 <= status && status < 300) return data;
    else throw new Error("EditNote Failed");
  } catch (error) {
    if (error?.response?.data?.message)
      throw new Error(error.response.data.message);
    else throw error.message;
  }
}

export { GetNotes, CreateNote, EditNote };
