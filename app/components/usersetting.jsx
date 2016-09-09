import React, { Component } from 'react';
import {Link} from 'react-router'; 

export default class UserSetting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      passWord: false,
      address: false,
      phone: false,
      email: false,
      user: {}
    };
  }

  handleSubmit(setSomething) {

    var valid = true;
    var filter = function validateURL(textval) {
      var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
      return urlregex.test(textval);
    };

    if ($('#user-password').val() === '' && setSomething === 'passWord') {
      $('.passwordError').show();
      $('.emailError').hide();
      $('.addressError').hide();
      $('.phoneError').hide();
      valid = false;
    }
    if ($('#user-email').val() === '' && setSomething === 'email'){    
      $('.emailError').show();      
      $('.addressError').hide();
      $('.phoneError').hide();
      $('.passwordError').hide();
      valid = false;
    }

    if ($('#user-address').val() === '' && setSomething === 'address'){
      $('.addressError').show();
      $('.emailError').hide();      
      $('.phoneError').hide();
      $('.passwordError').hide();
      valid = false;
    }

    if ( $('#user-phone').val() === '' && $('#user-phone').val().length <= 6 && setSomething === 'phone'){
      $('.phoneError').show();
      $('.emailError').hide();      
      $('.addressError').hide();
      $('.passwordError').hide();
      valid = false;
    }

    if(valid === true) {
      var stateObj = {};
      $('.phoneError').hide();
      $('.emailError').hide();      
      $('.addressError').hide();
      $('.passwordError').hide();

      if(setSomething === 'passWord'){
        stateObj[setSomething] = $('#user-password').val();
      }
      if(setSomething === 'email') {
        stateObj[setSomething] = $('#user-email').val();  
      }
      if(setSomething === 'address') {
        stateObj[setSomething] = $('#user-address').val();
      }
      if(setSomething === 'phone') {
        stateObj[setSomething] = $('#user-phone').val();
      }

      this.setState(stateObj);

      var context = this;
      $.ajax({
        method: 'GET',
        url: 'api/user_data',
        success: function(userData) {
          // console.log('user',userData);
          $.ajax({
            method: 'PUT',
            url: '/users',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({userData: context.state.user}),
            success: function(newUserInformation) {
              console.log(newUserInformation);
              console.log('User ingo updated !!');
            },
            error: function(error) {
              console.log('error');
            }
          });
        }
      });

      $('#user-password').val('');
      $('#user-email').val('');
      $('#user-address').val('');
      $('#user-password').val('');
    }
  }

  handleToggle(stateToChange) {
    var s = {};
    s[stateToChange] = !this.state[stateToChange];
    this.setState(s);
  }
  
  render() {
    var passCheck = this.state.passWord ? <div><input id='user-password' type='text' placeholder='Type new password' className="input-xlarge"></input>
                                            <button style={{marginLeft:15}} type='button' className="passwordBtn btn btn-primary" onClick={this.handleSubmit.bind(this, 'passWord')}>Submit</button>
                                            <div className="passwordError alert alert-danger fade in" role="alert" style={{display: 'none'}}>
                                            <strong>Woah! Invalid Password </strong><small>Please enter a valid password</small></div>
                                          </div> : '';
    var mailCheck = this.state.email ?  <div><input  id='user-email' type='text' placeholder='Type new email' className="input-xlarge"></input>
                                          <button style={{marginLeft:15}} type='button' className="emailBtn btn btn-primary" onClick={this.handleSubmit.bind(this, 'email')}>Submit</button>
                                          <div className="emailError alert alert-danger fade in" role="alert" style={{display: 'none'}}>
                                          <strong>Woah! Invalied email </strong><small>Please enter a valid email address</small></div>
                                       </div> : '';
    var addressCheck = this.state.address ? <div><input id='user-address' type='text' placeholder='Type new address' className="input-xlarge"></input> 
                                              <button style={{marginLeft:15}} type='button' className="addressBtn btn btn-primary" onClick={this.handleSubmit.bind(this, 'address')}>Submit</button>
                                              <div className="addressError alert alert-danger fade in" role="alert" style={{display: 'none'}}>
                                              <strong>Woah! Invalid address </strong><small>Please enter a valid address</small></div>
                                            </div> : '';
    var phoneCheck = this.state.phone ? <div><input id='user-phone' type='text' placeholder='Type new phone number' className="input-xlarge"></input>
                                          <button style={{marginLeft:15}} type='button' className="phoneBtn btn btn-primary" onClick={this.handleSubmit.bind(this, 'phone')}>Submit</button>
                                          <div className="phoneError alert alert-danger fade in" role="alert" style={{display: 'none'}}>
                                          <strong>Woah! Invalid Phone number </strong><small>Please enter a valid phone number</small></div>
                                        </div> : '';
    return (
      
      <div style = {{margin: 50}}>
        <div>
          <Link to='/usersetting' onClick={this.handleToggle.bind(this, 'passWord')}><h3>Change Password</h3></Link>
          {passCheck}
        </div>
        <div>
          <Link to='/usersetting' onClick={this.handleToggle.bind(this, 'email')}><h3>Change Email</h3></Link>
          {mailCheck}
        </div>
        <div>
          <Link to='/usersetting' onClick={this.handleToggle.bind(this,'address')}><h3>Change Address</h3></Link>
          {addressCheck}
        </div>
        <div>
          <Link to='/usersetting' onClick={this.handleToggle.bind(this, 'phone')}><h3>Change Phone Number</h3></Link>
          {phoneCheck}
        </div>
      </div>

    );
  }
}