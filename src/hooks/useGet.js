import { useEffect, useState } from "react";
import { API } from "../API";

// const request_headers = new Headers();
// request_headers.append("Authorization", `Bearer ${api_key}`);
// request_headers.append("Content-Type", "application/json");
// const request_options = {
//   headers: request_headers,
// };

export const useGet = (endpoint) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getData = async (endpoint) => {
    try {
      const { data } = await API.get(endpoint);
      setItems(data);
      setLoaded(true);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getData(endpoint);
  }, [endpoint]);

  return [items, error, loaded];
};
