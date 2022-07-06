import { createStore } from 'redux';

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const store = createStore((state = initialState, action)=> { 
  if(action.type === 'SET_THINGS'){
    const sortArr = action.things.sort((a,b) => {return b.rank - a.rank});
    return {...state, things: sortArr };
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
  if(action.type === 'ADD_RANK'){    
    const thingArr = state.things.map( _thing => {
      if(_thing.id === action.payload.data.id){
        _thing.rank = action.payload.data.rank
      }
      return _thing;
    });
    const sortArr = thingArr.sort((a,b) => {return b.rank - a.rank});
    return {...state, things: sortArr};
  }
  if(action.type === 'CHANGE_USER'){
    const thingArr = state.things.map( _thing => {
      if(_thing.id === action.payload.newUser.data.id){
        _thing.userId = action.payload.newUser.data.userId
      }
      return _thing;
    });
    const sortArr = thingArr.sort((a,b) => {return b.rank - a.rank});

    return {...state, things: sortArr };
  }
  return state;
});

export default store;

