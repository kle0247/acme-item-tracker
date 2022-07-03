import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm'


const Users = ({ users, deleteAUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
                <button onClick={() => deleteAUser(user)}>x</button>
              </li>
            );
          })
        }
      </ul>
      < UserForm />
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    deleteAUser: async(user) => {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_USER', payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
