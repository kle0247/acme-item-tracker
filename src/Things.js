import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteAThing, addRank, unRank })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } ({ thing.rank })
                <button onClick = { () => deleteAThing(thing)}>x</button>
                <button onClick = { () => addRank(thing)}>+</button>
                <button onClick = { () => unRank(thing)}>-</button>
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
    }
  }
}

export default connect(
  (state)=> {
    return {
      things: state.things
    }
  }, mapDispatchToProps
)(Things);
