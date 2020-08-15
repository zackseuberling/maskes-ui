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
        let mounted = true;

        const url = `http://localhost:8000/profile/${userId}/`
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(url, config)
            .then(response => {
                const payload = response.data
                if (mounted) { setProfile(payload) }
            })
            .catch(error => {
                if (mounted) { setError(error.response.data.detail) }
            })

        return () => mounted = false;
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
                props.history.push('/profile')
            })
            .catch(error => {
                setError(error.response.data.detail)
            });
    }
    const updateProfileHandler = (event, profileData) => {
        event.preventDefault();
        const url = `http://localhost:8000/profile/${myId}/`;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const body = {
            phone: profileData[0].phone,
            location: profileData[1].location,
            bio: profileData[2].bio,
            facebook: profileData[3].facebook,
            twitter: profileData[4].twitter,
            venmo: profileData[5].venmo,
            user: myId,
        }
        axios.put(url, body, config)
            .then(response => {
                props.history.push('/profile')
            })
            .catch(error => {
                setError(error.response.data.detail)
            });
    }

    return (
        <div>
            {error ? props.history.goBack() : null}
            {profile ? <Profile
                profile={profile}
                myId={myId}
                nameChangeSubmitHandler={nameChangeSubmitHandler}
                updateProfileHandler={updateProfileHandler}
                token={token}
                history={props.history}
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