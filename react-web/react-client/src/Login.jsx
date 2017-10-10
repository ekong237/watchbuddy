import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      renderErrorMessage: 'false'
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit() {
    $.ajax({
      url: '/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({email: this.state.email, password: this.state.password}),
      success: (data) => this.postLogin(data),
      error: () => this.renderErrorMessage()
    });
  }

  changeView() {
    this.props.changeView('Signup')
  }

  postLogin(data) {
    this.props.getUsername(data);
    this.props.changeView('UserHome');
  }

  renderErrorMessage() {
    this.setState({renderErrorMessage: 'true'});
  }

  render() {
    return (<Transition animation='fade up' duration={1000} transitionOnMount={true}>
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>
          {`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}
        </style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='red' textAlign='center'>
              <div><Icon name ='film' /> <Icon name='child' /> WatchBuddy</div>
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleEmailChange.bind(this)}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input 
                  onChange={this.handlePasswordChange.bind(this)}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button
                  color = 'red'
                  fluid size = 'large'
                  onClick = { this.handleSubmit.bind(this) }>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us?
              <a onClick={this.changeView.bind(this)}> Sign Up</a>
            </Message>

            <div>
              { this.state.renderErrorMessage === 'true' &&
                <Message negative>
                  <Message.Header>We're sorry</Message.Header>
                  <p>There was a problem with your username or password. Please try again.</p>
                </Message> }
            </div>
            
            </Grid.Column>
          </Grid>
        </div>
      </Transition>)
  }
}

export default Login;