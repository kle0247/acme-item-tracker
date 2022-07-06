import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';


const Things = ({ things, deleteAThing, addRank, unRank, users, changeUser })=> {
  const handleSelect = (event, thing) => {
    const user = event.target.value;
    const parameters = {
      thing: thing,
      user: user
    }
    changeUser(parameters);
  }
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            const foundUser = users.find(user => user.id === thing.userId);
            return (
              <li key={ thing.id }>
                { thing.name } ({ thing.rank }) owned by { foundUser ? foundUser.name : 'no user'}
                <button onClick = { () => deleteAThing(thing)}>x</button>
                <button onClick = { () => addRank(thing)}>+</button>
                <button onClick = { () => unRank(thing)}>-</button>
                <select id='select user' onChange={() => handleSelect(event, thing)}> 
                  <option value=''>Select user</option>
                  {
                    users.map( user => {
                      return(
                      <option key={user.id} value={user.id}>
                        { user.name }
                      </option>
                      )
                    })
                  }
                  <option value=''>no user</option>
                </select>
              </li>
            );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAThing: async(thing) => {
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({ type: 'DELETE_THING', payload: thing });
    },
    addRank: async(thing) => {
      const newThing = await axios.put(`/api/things/${thing.id}`, {rank: thing.rank+1});
      dispatch({ type: 'ADD_RANK', payload: newThing});
    },
    unRank: async(thing) => {
      const newThing = await axios.put(`/api/things/${thing.id}`, {rank: thing.rank-1});
      dispatch({ type: 'ADD_RANK', payload: newThing});
    },
    changeUser: async(parameters) => { 
      const newUser = await axios.put(`/api/things/${parameters.thing.id}`, { userId: parameters.user });
      dispatch({ type: 'CHANGE_USER', payload: {newUser}});
    }
  }
}

export default connect(
  (state)=> {
    return {
      things: state.things,
      users: state.users
    }
  }, mapDispatchToProps
)(Things);
