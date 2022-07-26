import { openModal } from "../utils/launchModal";

const Country = ({ item }) => {
  const handleDetails = () => {
    console.log(item);
    openModal(item);
  };
  return (
    <article className="card" onClick={handleDetails}>
      <div className="card-image">
        <img src={item.flag.large} alt={item.name} />
      </div>
      <div className="card-content">
        <h2 className="card-name">{item.name}</h2>
        <p>
          Official Name: <span>{item.official_name}</span>
        </p>
        <p>
          Region: <span>{item.region}</span>
        </p>
        <p>
          Subregion: <span>{item.subregion}</span>
        </p>
        <p>
          Capital: <span>{item.capital}</span>
        </p>

        {Object.values(item.languages).length > 1 ? (
          <p>
            Languages: <span>{Object.values(item.languages).join(", ")}</span>
          </p>
        ) : (
          <p>
            Language: <span>{Object.values(item.languages)}</span>
          </p>
        )}
      </div>
    </article>
  );
};
export default Country;
