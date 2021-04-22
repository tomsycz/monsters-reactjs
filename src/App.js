import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(response => response.json())
  //     .then(users => this.setState({ monsters: users }));
  // }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then(response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response
          .json()
          .then(users => this.setState({ monsters: users }));
      } else {
        return response.text().then(text => {
          console.log(text);
        });
      }
    });
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
