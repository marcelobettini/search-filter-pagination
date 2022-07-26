import { useState } from "react";
import { useGet } from "./hooks/useGet";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Country from "./components/Country";
import LoadNext from "./components/LoadNext";
import "./App.css";

function App() {
  const [items, error, loaded] = useGet("all");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [paginate, setPaginate] = useState(12);

  function search(items) {
    return items.filter(
      (item) =>
        item.region.includes(filter) &&
        search_parameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query.toLowerCase())
        )
    );
  }

  function load_next() {
    setPaginate((prevState) => prevState + 12);
  }

  const data = Object.values(items);
  const search_parameters = Object.keys(Object.assign({}, ...data));
  const filter_items = [...new Set(data.map((item) => item.region))];
  console.log(`search params: ${search_parameters}`);

  if (!loaded) {
    return <h4>loading...</h4>;
  }
  if (error) {
    <h4>{error.message}</h4>;
  }
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
            <Country key={item.alpha3Code} item={item} />
          ))}
      </section>
      <LoadNext load_next={load_next} />
    </div>
  );
}

export default App;
