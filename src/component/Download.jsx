import React from 'react';
import GetAllUsers from '../api/user/GetAllUsers.js';
import Loading from '../common/Loading.jsx';

const Download = React.createClass({
  componentDidMount() {
    this.state.allUsers.$.request(null, {
      onSuccess(res) {
        console.log('finish', res);
      },
      onError(err) {
        console.log('error', err);
      }
    });
  },
  getInitialState() {
    return {
      allUsers: GetAllUsers.$.bind(this)
    }
  },
  render() {
    let allUsers = this.state.allUsers;
    return (
      <div className="container">
        <Loading status={allUsers.$}>
          <ul>
            {allUsers.list.map((user, i) => {
              return (
                <li key={i}>
                  <a style={{padding: '10px 5px'}}>{user.name}</a>
                </li>
              );
            })}
          </ul>
        </Loading>
      </div>
    );
  }
});

export default Download;


 