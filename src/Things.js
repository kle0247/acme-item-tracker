import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteAThing })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } 
                <button onClick = { () => deleteAThing(thing)}>x</button>
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
