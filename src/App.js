import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://asfaltirovanie7-24.ru/api/categories/get")
      .then((x) => x.json())
      .then((data) => setCategories(data.categories));
  }, []);
  const handlerSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let cong = { name: data.get("name") };
    const fetchConfiguration = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cong),
    };
    fetch(
      "http://asfaltirovanie7-24.ru/api/categories/store",
      fetchConfiguration
    )
      .then((x) => x.json())
      .then((x) => setCategories([x.category, ...categories]));
    // setCategories([...categories]);
  };
  return (
    <div className="App">
      <form onSubmit={handlerSubmit}>
        <input name={"name"} />
        <button type={"submit"}>Add</button>
      </form>
      <table>
        <tr>
          <th>id</th>
          <th>Name</th>
        </tr>
        {categories.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
