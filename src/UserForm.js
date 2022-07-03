import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const UserForm = ({ createAUser }) => {
    return (
        <div>
            <button onClick={ () => createAUser() }>Create a user</button>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        createAUser: async() => {
            const response = await axios.post('/api/users', {name: faker.name.firstName()});
            const user = response.data;
            dispatch({ type: 'CREATE_USER', user })
        }
    }
}

export default connect(null, mapDispatchToProps)(UserForm);