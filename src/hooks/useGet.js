import { useEffect, useState } from "react";
const base_url = "https://countryapi.io/api/";
import { api_key } from "../../api_key";
const request_headers = new Headers();
request_headers.append("Authorization", `Bearer ${api_key}`);
request_headers.append("Content-Type", "application/json");

const request_options = {
  method: "GET",
  headers: request_headers,
};

export const useGet = (endpoint) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getData = async (endpoint) => {
    try {
      const res = await fetch(base_url + endpoint, request_options);
      const data = await res.json();
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
