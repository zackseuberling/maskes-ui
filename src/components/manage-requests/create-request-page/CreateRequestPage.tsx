import React from 'react';

import './CreateRequestPage.css';
import { Button, Form, Row, Col } from 'react-bootstrap';

const CreateRequestPage = () => {
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
      <Form className="create-request-form">
        <Form.Group controlId="contact">
          <Form.Label>
            What would be the quickest method of reaching you?{' '}
          </Form.Label>
          <Form.Control as="select" className="my-1 mr-sm-2" custom>
            <option value="0">Choose...</option>
            <option value="1">Phone Number - Call</option>
            <option value="2">Phone Number - Text</option>
            <option value="3">Three</option>
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
          <Form.Control placeholder="Your answer" />
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

        <Button onClick={() => console.log('hello world')} variant="primary">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default CreateRequestPage;
