import { useEffect, useState } from "react";
import papa from "papaparse";

function App() {
  const [users, setUsers] = useState([]);

  const formatData = (data) =>
    data
      .map((line) =>
        Object.assign({}, ...data[0].map((key, i) => ({ [key]: line[i] })))
      )
      .slice(1);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKzEd2DIbVffjJ_V3FXWL4HIHOCYtqjZiUK7zNRlE2-HIbbvBt9lJmdd5A6VvLN8ea1gADI7M34uh-/pub?output=csv"
    )
      .then((res) => res.text())
      .then((data) => papa.parse(data))
      .then((parseData) => formatData(parseData.data))
      .then((parsedData) => setUsers(parsedData));
  }, []);

  return (
    <div className="App">
      <h1>Google Users</h1>
      {users.map((user) => (
        <p key={user.id}>{user.first_name}</p>
      ))}
    </div>
  );
}

export default App;
