import React from 'react';

import './CreateRequestPage.css';
import { Button, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const CreateRequestPage = ({ goTo }) => {
  const locations = [
    'Algona Pacific',
    'Auburn',
    'Bellevue',
    'Bothell',
    'Burien',
    'Convington',
    'Des Moines',
    'Duvall',
    'Fall City',
    'Federal Way',
    'High Line',
    'Issaquah',
    'Kenmore',
    'Kent',
    'Kirkland',
    'Maple Valley',
    'Newcastle',
    'Normandy Park',
    'North Bend',
    'Puyallup',
    'Redmond',
    'Renton',
    'Sammamish',
    'Snoqualmie',
    'Summer',
    'Tukwila',
    'White Center',
    'Woodinville',
  ];
  return (
    <React.Fragment>
      <h3 className="create-your-request-title">Create your requests</h3>
      <Form
        className="create-request-form"
        onSubmit={(event) => {
          event.preventDefault();
          console.log('hello world');
          //   console.log('loading');
          goTo('/');
        }}
      >
        <Form.Group controlId="contact-method">
          <Form.Label>
            What would be the quickest method of reaching you?{' '}
          </Form.Label>
          <Form.Control
            as="select"
            multiple
            name="contact-method"
            onChange={(val1) =>
              console.log(
                'form change value',
                // val1.target,
                val1.target.name,
                val1.target.value
              )
            }
            required
          >
            <option value="call">Phone Number - Call</option>
            <option value="text">Phone Number - Text</option>
            <option value="email">Email</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>
            This form is for South King County & Eastside. If you're in Seattle,
            please complete this form:
            <a href="https://docs.google.com/forms/d/1rOkXW6ElVT0MH9oSI-TuW8L5szCt-ULbZhWebARRZNI/viewform">
              https://docs.google.com/forms/d/1rOkXW6ElVT0MH9oSI-TuW8L5szCt-ULbZhWebARRZNI/viewform
            </a>
            ). Where in South King County or Eastside are you located?
          </Form.Label>
          {locations.map(function (location) {
            return (
              <Form.Check key={location} type="checkbox" label={location} />
            );
          })}
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>
            What is your address? (Address, City, State, ZIP Code)
          </Form.Label>
          <Form.Control placeholder="Your answer" required />
        </Form.Group>

        <Form.Group controlId="Redirect-Request">
          <Form.Label>
            If you live outside of our service area, can we send your request
            details to another local mutual aid organization who we trust?
          </Form.Label>
          <p>
            If you say yes, it will be will be faster and simpler to get you
            your delivery! If you say no and you live outside of our range, we
            will let you know that we can't help you and tell you where to go to
            find help for your location, which may take a while, and then you
            will have to fill out another group's form and begin the whole
            process again from scratch. (We will never share your information
            with advertisers, political candidates or parties, corporations, or
            the government.)
          </p>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="redirect-request"
              id="yes"
            />
            <Form.Check
              type="radio"
              label="No"
              name="redirect-request"
              id="no"
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="food">
          <Form.Label>
            What would be the quickest method of reaching you?{' '}
          </Form.Label>
          <Form.Check type="checkbox" label="Ingredients to cook with" />
          <Form.Check type="checkbox" label="Reheat and serve/frozen" />
          <Form.Check
            type="checkbox"
            label="Low Prep (like sandwiches, pasta)"
          />
          <Form.Check type="checkbox" label="Zero - Prep" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group controlId="food-details">
          <Form.Label>
            We are on a volunteer basis and actively fundraising. At this moment
            we are set up to prioritize delivering ONLY ESSENTIAL/URGENT/
            IMMEDIATE needs of our community members. What are the essential/
            urgent items you need?
          </Form.Label>
          <p>
            Items can be general like "milk," or specific like "a 24-pack of the
            purple Always brand overnight menstrual pads with wings." We will do
            our best to match your requests, but if we can't find something
            specific we may get you a similar substitute. We trust you to know
            your needs and we are committed to delivery without judgement.
          </p>
          <Form.Control placeholder="Your answer" />
        </Form.Group>

        <Form.Group controlId="allergies">
          <Form.Label>
            Do you have any restrictions, allergies or intolerances? If there
            are no allergies/ restrictions, enter none.
          </Form.Label>
          <Form.Control placeholder="Your answer" />
        </Form.Group>

        <Form.Group controlId="household-size">
          <Form.Label>How many individuals are in your household?</Form.Label>
          <Form.Control placeholder="Your answer" />
        </Form.Group>

        <Form.Group controlId="Urgency">
          <Form.Label>
            How urgent is your need? Please allow us 48 hours to respond to your
            request.
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="In the next 72 hours"
              name="urgency"
              id="72hours"
            />
            <Form.Check
              type="radio"
              label="Over the next few days"
              name="urgency"
              id="fewdays"
            />
            <Form.Check
              type="radio"
              label="Useful if available"
              name="urgency"
              id="anytime"
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="Delivery-Support">
          <Form.Label>
            Would you like financial support with your delivery?
          </Form.Label>
          <p>
            We can fund supplies up to a certain amount per request (While
            funding lasts) for folks who are quarantined without pay, sick,
            disabled, elderly, undocumented, queer, Black, Indigenous, and/or
            people of color.
          </p>
          <Col sm={10}>
            <Form.Check
              className="link-radio"
              type="radio"
              name="delivery-support"
              id="pay-donate"
              style={{ display: 'inline-block', float: 'left' }}
            />
            <label htmlFor="pay-donate" style={{ width: '80%' }}>
              Pay with your own money and donate to support your community
              members:{' '}
              <a href="https://www.gofundme.com/f/covid19-eastside-survival-fund">
                https://www.gofundme.com/f/covid19-eastside-survival-fund
              </a>
            </label>
            <Form.Check
              type="radio"
              label="Pay with your own money (coordinate with delivery person)"
              name="delivery-support"
              id="pay"
            />
            <Form.Check
              type="radio"
              label="Request support with your delivery items"
              name="delivery-support"
              id="need-support"
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="Social-Privileges">
          <Form.Label>
            Can you tell us about your social location, privileges you do or
            don’t have, whether you are Black, Indigenous, Person of Color
            (BIPOC), identify as a survivor of domestic or sexual violence, etc.
          </Form.Label>
          <Form.Control placeholder="Your answer" />
        </Form.Group>

        <Form.Group controlId="Share-Contact">
          <Form.Label>
            Is it okay to share your contact number, address, and grocery list
            with the volunteer who is doing the delivery?
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="share-contact"
              id="yes"
            />
            <Form.Check type="radio" label="No" name="share-contact" id="no" />
          </Col>
        </Form.Group>

        <Form.Group controlId="Share-Contact">
          <Form.Label>
            Is it okay to share your contact number, address, and grocery list
            with the volunteer who is doing the delivery?
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="share-contact"
              id="yes"
            />
            <Form.Check type="radio" label="No" name="share-contact" id="no" />
          </Col>
        </Form.Group>

        <Form.Group controlId="Checkin">
          <Form.Label>
            Would you like us to check in via text or call every few weeks to
            support you in your health and wellbeing?
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes, by text"
              name="checkin"
              id="text"
            />
            <Form.Check
              type="radio"
              label="Yes, by phone"
              name="checkin"
              id="phone"
            />
            <Form.Check
              type="radio"
              label="No, thank you"
              name="checkin"
              id="no"
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="Question">
          <Form.Label>
            Are there things you would like us to know? (any support or
            resources you would like to offer, questions, comments, concerns).
          </Form.Label>
          <Form.Control placeholder="Your answer" />
        </Form.Group>

        <Form.Group controlId="join-group">
          <Form.Label>
            Are you interested in joining your neighborhood mutual aid pod or
            need assistance in setting up your own mutual aid pod to support
            yourself and your neighbors with current/ future needs? If so,
            please go this link to join our Neighborhood Mutual Aid Pods Group:
            tinyurl.com/KCMutualAidPod
          </Form.Label>
          <Col sm={10}>
            <Form.Check type="radio" label="Yes" name="join-group" id="yes" />
            <Form.Check type="radio" label="No" name="join-group" id="no" />
          </Col>
        </Form.Group>

        <Form.Group controlId="Question2">
          <Form.Label>
            Is there anything else you would like us to know about resources you
            can offer?
          </Form.Label>
          <p>
            In the near future, we are considering expanding the types of mutual
            aid we offer. These might include emotional support, household chore
            assistance, childcare, dog walking, etc. Please note access details
            when possible, like: are you able to be scent-free (
            <a href="http://thinkbeforeyoustink.com/howtogofragrancefree.html">
              http://thinkbeforeyoustink.com/howtogofragrancefree.html
            </a>
            )? Can you speak several languages, or sign languages? Do you have a
            wheelchair accessible van?
          </p>
          <Form.Control placeholder="Your answer" />
        </Form.Group>

        {/* TODO show poster here */}

        <Button type="submit">Submit</Button>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return {
    goTo: props.history.push,
  };
};

export default withRouter(connect(mapStateToProps)(CreateRequestPage));
