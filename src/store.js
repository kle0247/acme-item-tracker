import { createStore } from 'redux';

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const store = createStore((state = initialState, action)=> { 
  if(action.type === 'SET_THINGS'){
    return {...state, things: action.things };
  }
  if(action.type === 'SET_USERS'){
    return {...state, users: action.users }; 
  }
  if(action.type === 'SET_VIEW'){
    return {...state, view: action.view }; 
  }
  if(action.type === 'CREATE_THING'){
    return {...state, things: [...state.things, action.thing ]}; 
  }
  if(action.type === 'DELETE_THING'){
    return {...state, things: state.things.filter(_thing => _thing !== action.payload )};
  }
  if(action.type === 'CREATE_USER'){
    return {...state, users: [...state.users, action.user ]};
  }
  if(action.type === 'DELETE_USER'){
    return {...state, users: state.users.filter( _user => _user !== action.payload)};
  }
  return state;
});

export default store;

