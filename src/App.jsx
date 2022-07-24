import { useState, useEffect } from "react";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Flag from "./components/Flag";
import LoadNext from "./components/LoadNext";
import "./App.css";
import { api_key } from "../api_key";

function App() {
  function search(items) {
    return items.filter(
      (item) =>
        item.region.includes(filter) &&
        search_parameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query.toLowerCase())
        )

      // item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  function load_next() {
    setPaginate((prevState) => prevState + 12);
  }

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [paginate, setPaginate] = useState(12);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // fetch data
    const request_headers = new Headers();
    request_headers.append("Authorization", `Bearer ${api_key}`);
    request_headers.append("Content-Type", "application/json");

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch("https://countryapi.io/api/all", request_options)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
          console.log(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);
  const data = Object.values(items);
  const search_parameters = Object.keys(Object.assign({}, ...data));
  const filter_items = [...new Set(data.map((item) => item.region))];
  console.log(`search params: ${search_parameters}`);

  if (error) {
    return <>{error.message}</>;
  } else if (!loaded) {
    return <>loading...</>;
  } else {
    return (
      <div className="wrapper">
        <Search setQuery={setQuery} />
        <Filter filter_items={filter_items} setFilter={setFilter} />
        {query}
        <section className="card-grid">
          {search(data)
            .sort()
            .slice(0, paginate)
            .map((item) => (
              <Flag key={item.alpha3Code} item={item} />
            ))}
        </section>
        <LoadNext load_next={load_next} />
      </div>
    );
  }
}

export default App;
