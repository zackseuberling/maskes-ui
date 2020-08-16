import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import "./Profile.css";
import { BsPencil, BsX, BsCheck } from 'react-icons/bs';
import axios from '../../shared/axios';

const Profile = (props) => {
    const { profile, myId, nameChangeSubmitHandler, updateProfileHandler, token, history } = props;
    const isOwner = profile.id === parseInt(myId)


    const [showEditDisplayName, setShowEditDisplayName] = useState(false)
    const [displayName, setDisplayName] = useState(profile ? profile.display_name : null)
    const toggleEditDisplayName = () => {
        setShowEditDisplayName(!showEditDisplayName)
        setDisplayName(profile.display_name)
    }
    const onChangeDisplayName = (e) => {
        setDisplayName(e.target.value)
    }

    //Fullname
    const [showEditFullName, setShowEditFullName] = useState(false)
    const [firstName, setFirstName] = useState(profile ? profile.first_name : null)
    const [lastName, setLastName] = useState(profile ? profile.last_name : null)
    const toggleEditFullName = () => {
        setShowEditFullName(!showEditFullName);
        setFirstName(profile.first_name)
        setLastName(profile.last_name)
    }
    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const edit_button = (toggleEdit) => isOwner && <Button variant='link' className='edit-btn' onClick={toggleEdit}><BsPencil /></Button>

    const save_cancel_icons = (toggleEdit) => (
        isOwner &&
        <div className='m-2'>
            <Button variant='link' className='edit-info-btn' type='submit'><BsCheck /></Button>
            <Button variant='link' className='delete-info-btn' onClick={toggleEdit}><BsX /></Button>
        </div>
    )

    const full_name_edit_form = (
        <Form onSubmit={(event) => nameChangeSubmitHandler(event, firstName, lastName, profile.display_name)}>
            <Row>
                <Col sm={5}>
                    <Form.Control required className='m-2' value={firstName} placeholder="First Name" onChange={onChangeFirstName} />
                </Col>
                <Col sm={5} className="text-secondary">
                    <Form.Control required className='m-2' value={lastName} placeholder="Last Name" onChange={onChangeLastName} />
                </Col>
                <Col sm={2} className="text-secondary pr-0">
                    {save_cancel_icons(toggleEditFullName)}
                </Col>
            </Row>
        </Form>
    )

    //Profile Data
    const [profileData, setProfileData] = useState(profile ? [
        { phone: profile.phone, onEdit: false },
        { location: profile.location, onEdit: false },
        { bio: profile.bio, onEdit: false },
        { facebook: profile.facebook, onEdit: false },
        { twitter: profile.twitter, onEdit: false },
        { venmo: profile.venmo, onEdit: false },
    ] : null)

    const toggleProfileEditor = (i) => {
        setProfileData(profileData.map((pd, j) => (j === i) ? { ...pd, key: j, onEdit: !pd.onEdit } : { ...pd, key: j }))
    }

    const onChangeProfileData = (e, i) => {
        setProfileData(profileData.map((pd, j) => (i === j) ? { ...pd, key: j, [e.target.id]: e.target.value } : { ...pd, key: j }));
    }

    const profile_edit_form = (id, key) => (
        isOwner && <Col sm={6} md="auto">
            <Form inline onSubmit={(e) => updateProfileHandler(e, profileData)}>
                <Form.Control
                    id={id}
                    placeholder={profile[id]}
                    value={profileData[key][id]}
                    onChange={(e) => onChangeProfileData(e, key)} />
                {save_cancel_icons(() => toggleProfileEditor(key))}
            </Form>
        </Col>

    )

    //Privacy
    const [privacy, setPrivacy] = useState(
        profile ?
            [
                { fullname_privacy: profile.fullname_privacy },
                { email_privacy: profile.email_privacy },
                { phone_privacy: profile.phone_privacy },
                { location_privacy: profile.location_privacy }
            ]
            : []);


    const onChangePrivacy = (e, i) => {
        // e.preventDefault();
        const url = `/profile/${myId}/`;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        const body = {
            user: myId,
            [e.target.id]: e.target.checked
        }
        setPrivacy(privacy.map((pvc, j) => (j === i) ? { ...pvc, key: j, [e.target.id]: e.target.checked } : { ...pvc, key: j }))
        axios.put(url, body, config)
            .then(response => {

            })
            .catch(error => {
            })

    };

    return (
        <Container>
            <Row>
                <Col md={4} className='mb-3'>
                    <Card>
                        <Card.Body>
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src={profile.image} alt={profile.display_name} className="rounded-circle" width="150" />
                                <div className="mt-3">
                                    <h4>{!showEditDisplayName ? (profile.display_name) :
                                        <Form onSubmit={(event) => nameChangeSubmitHandler(event, profile.first_name, profile.last_name, displayName)}>
                                            <Form.Control
                                                style={{ fontSize: 20, margin: 5, textAlign: 'center' }}
                                                type='input'
                                                value={displayName}
                                                onChange={onChangeDisplayName}
                                            />
                                            {save_cancel_icons(toggleEditDisplayName)}
                                        </Form>
                                    }
                                        {!showEditDisplayName && edit_button(toggleEditDisplayName)}
                                    </h4>

                                    {profileData[2].onEdit || profile.bio === ""
                                        ? profile_edit_form("bio", 2) : <p className="text-secondary mb-1"><Button
                                            className='edit-profile-link pl-0'
                                            style={{ textAlign: 'left' }}
                                            variant='link'
                                            disabled={!isOwner}
                                            onClick={() => toggleProfileEditor(2)} >
                                            {profile.bio}
                                        </Button></p>}

                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col sm={5} className="my-auto" md="auto">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="#3d95ce" stroke="currentColor"
                                            strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-facebook mr-2 icon-inline text-primary">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    Facebook
                                    </Col>
                                    {profileData[3].onEdit || profile.facebook === ""
                                        ? profile_edit_form("facebook", 3) :
                                        <Col className="text-secondary mb-1" md="auto">
                                            {<Button
                                                className='edit-profile-link pl-0'
                                                style={{ textAlign: 'left', color: 'gray' }}
                                                variant='link'
                                                onClick={isOwner ? () => toggleProfileEditor(3) : () => window.open(`http://www.faceboook.com/${profile.facebook}`, "_blank")} >
                                                {profile.facebook}
                                            </Button>}
                                        </Col>
                                    }
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col sm={5} className="my-auto mr-3" md="auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-twitter mr-2 icon-inline text-info">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                        </svg>
                                    Twitter
                                    </Col>

                                    {profileData[4].onEdit || profile.twitter === ""
                                        ? profile_edit_form("twitter", 4) :
                                        <Col className="text-secondary mb-1" md="auto">
                                            {<Button
                                                className='edit-profile-link pl-0'
                                                style={{ textAlign: 'left', color: 'gray' }}
                                                variant='link'
                                                onClick={isOwner ? () => toggleProfileEditor(4) : () => window.open(`https://twitter.com/${profile.twitter}`, "_blank")} >
                                                {profile.twitter}
                                            </Button>}
                                        </Col>}
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col sm={5} className="my-auto mr-3" md="auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                            aria-hidden="true" width="24" height="24"
                                            viewBox="0 0 512 512"
                                            preserveAspectRatio="xMidYMid meet"
                                            className="feather feather-venmo mr-2 icon-inline text-info">
                                            <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89V441.6c0 20.31 17.85 38.4 38.28 38.4h373.78c20.54 0 35.94-18.2 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zM277.96 387H174.32l-41.57-248.56l90.75-8.62l21.98 176.87c20.53-33.45 45.88-86.03 45.88-121.87c0-19.62-3.36-32.98-8.61-43.99l82.65-16.73c9.56 15.78 13.86 32.04 13.86 52.57c-.01 65.5-55.92 150.59-101.3 210.33z" fill="#3d95ce" />
                                        </svg>
                                    Venmo
                                    </Col>
                                    {profileData[5].onEdit || profile.venmo === ""
                                        ? profile_edit_form("venmo", 5) :
                                        <Col className="text-secondary  mb-1" md="auto">
                                            {<Button
                                                className='edit-profile-link pl-0'
                                                style={{ textAlign: 'left', color: 'gray' }}
                                                variant='link'
                                                onClick={isOwner ? () => toggleProfileEditor(5) : () => window.open(`https://venmo.com/${profile.venmo}`, "_blank")} >
                                                {profile.venmo}
                                            </Button>}
                                        </Col>}
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col>
                <Col className="md-8">
                    <Card className="mb-3">
                        <Card.Body>
                            {showEditFullName
                                ? full_name_edit_form
                                : <Row>
                                    <Col sm={3} lg={2} className="my-auto">
                                        Full Name
                                    </Col>
                                    <Col sm={6} className="text-secondary">
                                        {!profile.fullname_privacy || isOwner ? `${profile.first_name} ${profile.last_name}` : null}
                                        {isOwner && <BsPencil className='edit-pencil' onClick={toggleEditFullName} />}

                                    </Col>
                                    {isOwner && <Col sm='auto' className="text-secondary my-auto pull-right">
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="fullname_privacy"
                                                label={privacy[0].fullname_privacy ? "private" : "public"}
                                                checked={privacy[0].fullname_privacy}
                                                onChange={(e) => onChangePrivacy(e, 0)}
                                            />
                                        </Form>
                                    </Col>}
                                </Row>
                            }

                            <hr />

                            <Row>
                                <Col sm={3} lg={2} className="my-auto">
                                    Email
                                </Col>
                                <Col sm={6} className="text-secondary">
                                    {!profile.email_privacy || isOwner ? profile.email : null}

                                </Col>

                                {isOwner && <Col sm='auto' className="text-secondary my-auto">
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="email_privacy"
                                            label={privacy[1].email_privacy ? "private" : "public"}
                                            checked={privacy[1].email_privacy}
                                            onChange={(e) => onChangePrivacy(e, 1)}
                                        />
                                    </Form>
                                </Col>}
                            </Row>

                            <hr />

                            <Row>
                                <Col sm={3} lg={2} className="my-auto">
                                    Phone
                                </Col>
                                {profileData[0].onEdit || profile.phone === ""
                                    ? profile_edit_form('phone', 0)
                                    : <Col sm={6} className="text-secondary">
                                        {!profile.phone_privacy || isOwner ?
                                            <Button
                                                style={{ textAlign: 'left' }}
                                                className='edit-profile-link pl-0'
                                                variant='link'
                                                disabled={!isOwner}
                                                onClick={() => toggleProfileEditor(0)} >{profile.phone}</Button> : null}
                                    </Col>}
                                {isOwner && <Col sm='auto' className="text-secondary my-auto">
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="phone_privacy"
                                            label={privacy[2].phone_privacy ? "private" : "public"}
                                            checked={privacy[2].phone_privacy}
                                            onChange={(e) => onChangePrivacy(e, 2)}
                                        />
                                    </Form>
                                </Col>}
                            </Row>

                            <hr />

                            <Row>
                                <Col sm={3} lg={2} className="my-auto">
                                    Location
                                </Col>
                                {profileData[1].onEdit || profile.location === ""
                                    ? profile_edit_form("location", 1)
                                    : <Col sm={6} className="text-secondary">
                                        {!profile.location_privacy || isOwner ?
                                            <Button
                                                className='edit-profile-link pl-0' style={{ textAlign: 'left' }} variant='link' disabled={!isOwner} onClick={() => toggleProfileEditor(1)} >{profile.location}</Button> : null}
                                    </Col>}
                                {isOwner && <Col sm='auto' className="text-secondary my-auto">
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="location_privacy"
                                            label={privacy[3].location_privacy ? "private" : "public"}
                                            checked={privacy[3].location_privacy}
                                            onChange={(e) => onChangePrivacy(e, 3)}
                                        />
                                    </Form>
                                </Col>}
                            </Row>
                        </Card.Body>
                    </Card>
                    {isOwner && <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Button className="mb-0" variant='link' onClick={() => history.push('/email-reset')}>Reset Email</Button>
                            </Row>
                            <hr />
                            <Row>
                                <Button className="mb-0" variant='link' onClick={() => history.push('/password-reset')}>Reset Password</Button>
                            </Row>

                        </Card.Body>
                    </Card>}


                    <Row className="gutters-sm">
                        <Col sm={6} className="mb-3">
                            <Card className="h-100">
                                <Card.Body>
                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Volunteer</i>{profile.volunteer_count}</h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Card className="h-100">
                                <Card.Body>
                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Delivered</i>{profile.delivered_count}</h6>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    )
};

export default Profile;