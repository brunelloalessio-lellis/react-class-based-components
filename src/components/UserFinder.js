import { Component } from "react";
import UsersContext from "../context/users-context";
import classes from "./UserFinder.module.css";
import Users from "./Users";

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      //possible http request
      this.setState({
        filteredUsers: this.context.users,
      });
    }, 200);
  }

  render() {
    return (
      <>
        <UsersContext.Consumer>
          <div className={classes.finder}>
            <input
              type="search"
              onChange={this.searchChangeHandler.bind(this)}
            />
          </div>
          <Users users={this.state.filteredUsers} />
        </UsersContext.Consumer>
      </>
    );
  }
}

export default UserFinder;
