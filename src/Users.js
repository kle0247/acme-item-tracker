import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm'


const Users = ({ users, deleteAUser, things })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            const thingsOwned = things.filter(thing => thing.userId === user.id);
            return (
              <li key={ user.id }>
                { user.name } owns: {thingsOwned.length ? thingsOwned.map(thing => {
                  return(
                    <div>
                      <ul>
                        <li key={ thing.id }>
                        { thing.name }
                        </li>
                      </ul>
                    </div>
                  )
                }) : 'nothing'}
                <button onClick={() => deleteAUser(user)}>Delete user</button>
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
    users: state.users,
    things: state.things
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
