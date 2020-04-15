import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import useStateWithCallback from "use-state-with-callback";
import { render } from "@testing-library/react";
import searchBox, {
  SearchBox,
} from "./components/searchBox/searchBox.component";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  // const [monsters, setMonsters] = useState([]);
  // const [searchfield, setSearchField] = useState("");
  // const [searchedMonsters, setSearchedMonsters] = useState([]);
  // async function getData() {
  //   const results = await fetch("https://jsonplaceholder~.typicode.com/users");
  //   results.json().then((results) => setMonsters(results));
  // }

  handleChange = e => {
    this.setState({searchField:e.target.value});
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => this.setState({ monsters: res.data }));
  }

  render() {
    const { monsters, searchField } = this.state;
    const searchedMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList
          monsters={searchField ? searchedMonsters : monsters}
        ></CardList>
      </div>
    );
  }
}

export default App;
