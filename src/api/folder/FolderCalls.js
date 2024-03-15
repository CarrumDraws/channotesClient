import axios from "axios";

async function GetFolder({ chan_token, folder_id, url }) {
  try {
    console.log(folder_id);
    // Axios throws an "AxiosError" when it recieves a 4XX or 5XX error code
    let route = folder_id
      ? `${url}/folders?folder_id=${folder_id}`
      : `${url}/folders`;
    let { data, status } = await axios.get(route, {
      headers: {
        Authorization: `Bearer ${chan_token}`,
      },
    });
    console.log(data);
    if (200 <= status && status < 300) return data;
    else throw new Error("GetFolder Failed"); // Throw generic "Error"
  } catch (error) {
    // throwing triggers catch block that GetFolder is called in
    if (error?.response?.data?.message)
      throw new Error(error.response.data.message); // AxiosError
    else throw error.message; // Error
  }
}

export { GetFolder };
