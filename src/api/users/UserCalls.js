import axios from "axios";

async function GetUser({ chan_token, chan_id, url }) {
  try {
    // Axios throws an "AxiosError" when it recieves a 4XX or 5XX error code
    let { data, status } = await axios.get(`${url}/users?chan_id=${chan_id}`, {
      headers: {
        Authorization: `Bearer ${chan_token}`,
      },
    });
    if (200 <= status && status < 300) return data;
    else throw new Error("GetUser Failed"); // Throw generic "Error"
  } catch (error) {
    // throwing triggers catch block that GetUser is called in
    if (error?.response?.data?.message)
      throw new Error(error.response.data.message); // AxiosError
    else throw error.message; // Error
  }
}

export { GetUser };
