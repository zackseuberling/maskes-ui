import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import axios from 'axios';
import Profile from '../../components/Profile/Profile';
const UserProfile = (props) => {
    const { token, myId } = props

    const [profile, setProfile] = useState(null);

    const [error, setError] = useState(null)

    let userId = props.match.params.userId;

    if (userId === 'me') {
        userId = myId
    }

    useEffect(() => {
        const url = `http://localhost:8000/profile/${userId}/`
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(url, config)
            .then(response => {
                const payload = response.data
                console.log(payload)
                setProfile(payload)
            })
            .catch(error => {
                console.log(error.response.data.detail)
                setError(error.response.data.detail)
            })
    }, [token, userId])

    const nameChangeSubmitHandler = (event, first_name, last_name, display_name) => {
        event.preventDefault();
        const url = `http://localhost:8000/users/me/`
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const body = {
            first_name: first_name,
            last_name: last_name,
            display_name: display_name
        }

        axios.put(url, body, config)
            .then(response => {
                const payload = response.data
                console.log(payload)
                props.history.push('/profile')
            })
            .catch(error => {
                console.log(error.response.data.detail)
                setError(error.response.data.detail)
            })
    }

    return (
        <div>
            {error ? props.history.goBack() : null}
            {profile ? <Profile
                profile={profile}
                myId={myId}
                nameChangeSubmitHandler={nameChangeSubmitHandler}
                token={token}
            /> : <Spinner />}
        </div>

    )
};

const mapStateToProps = state => {
    return {
        token: state.auth.access,
        myId: state.auth.user_id,
    }
}

export default connect(mapStateToProps, null)(UserProfile);