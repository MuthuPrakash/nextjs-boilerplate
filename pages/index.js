import React, {Component} from 'react'
import Link from 'next/link'
import { FormErrors } from './src/FormErrors';

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
        name: '',
        message: '',
        formErrors: {name: '', message: ''},
        nameValid: false,
        messageValid: false,
        formValid: false
    }
  };

  
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
        () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let nameValid = this.state.nameValid;
  let messageValid = this.state.messageValid;

  switch(fieldName) {
      case 'name':
      nameValid = value.length >= 1;
      fieldValidationErrors.name = nameValid ? '' : ' is missing';
      break;
      case 'message':
      messageValid = value.length >= 1;
      fieldValidationErrors.message = messageValid ? '': ' is missing';
      break;
      default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  nameValid: nameValid,
                  messageValid: messageValid
                  }, this.validateForm);
  }

  validateForm() {
      this.setState({formValid: this.state.nameValid && this.state.messageValid});
  }

  errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }


    

  handleFormSubmit = (e) => {
    e.preventDefault()
    const { name, message } = this.state

    const data = {
      name,
      message
    }

    fetch('/api/guestbook', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          name: '',
          message: ''
        })
        alert("Success! Guestbook entry added.");
      }
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      
    })
  }

  render() {
    const {name, message, submitted, success} = this.state
    return(
      <div>

          <div className="App">
              <div className="App-header">
                  <h1>Remedy Health Media App</h1>
              </div>
              <form  className="guestbookForm" onSubmit={this.handleFormSubmit}>
                  <h2>Guestbook</h2>
                  <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                      <div className={'form-group ${this.errorClass(this.state.formErrors.name)}'}>
                          <label>
                              Name:
                              </label>
                              <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event) => this.handleUserInput(event)}/>
                          
                      </div>
                          
                      <div className={'form-group ${this.errorClass(this.state.formErrors.message)}'}>
                          <label>
                              Message:
                              </label>
                              <textarea name="message" className="form-control" value={this.state.message} onChange={(event) => this.handleUserInput(event)}/>
                          
                      </div>
                          
                          <button type="submit" className="btn btn-primary" value="Submit" disabled={!this.state.formValid}>Submit</button>
                          
                  </form>

                      
              <div>
                  <Link href="/guestbook" >
                  <a style={{ fontSize: 20 }}>View all the saved Guestbook</a>
              </Link>
              </div>
          
              <div>
              
              
              </div>
              
          </div>
          
          <style jsx>{`
              body {margin: 0;padding: 0;font-family: sans-serif;}
              
          .guestbookForm {
              width: 500px;
              margin: auto;
          }

          .App {
              text-align: center;
          }
          .App-header {
              background-color: #222;
              height: 115px;
              padding: 20px;
              color: white;
          }
          
          .App-intro {
              font-size: large;
          }
          
          h2{
              font-size: 30px;
              margin-top: 20px;
              margin-bottom: 10px;
              font-family: inherit;
              font-weight: 500;
              line-height: 1.1;
              color: inherit;
              display: block;
          }
          *, :after, :before {
              box-sizing: border-box;
          }
          .panel {
              box-shadow: 0 1px 2px rgba(0,0,0,.05);
              margin-bottom: 20px;
              background-color: #fff;
              border: 1px solid transparent;
              border-radius: 4px;
          }
          .panel-default {
              border-color: #ddd;
          }
          
          .form-group {
              margin-bottom: 15px;
          }

          label {
              display: inline-block;
              max-width: 100%;
              margin-bottom: 5px;
              font-weight: 700;
          }

          .has-error .form-control {
              border-color: #a94442;
              box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          }

          .form-control {
              width: 100%;
              height: 34px;
              padding: 6px 12px;
              background-color: #fff;
              background-image: none;
              border: 1px solid #ccc;
              border-radius: 4px;
              transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          }

          primary[disabled]{
              background-color: #265a88;
              background-image: none;
          }

          .btn-primary[disabled]{
              box-shadow: none;
          }

          .btn[disabled]{
              cursor: not-allowed;
              opacity: .65;   
          }

          .btn-primary {
              background-repeat: repeat-x;
              border-color: #245580;
              text-shadow: 0 -1px 0 rgba(0,0,0,.2);
              box-shadow: inset 0 1px 0 hsla(0,0%,100%,.15), 0 1px 1px rgba(0,0,0,.075);
              color: #fff;
              background-image: linear-gradient(180deg,#337ab7 0,#265a88);
              color: #fff;
              background-color: #337ab7;
          }

          .btn {
              display: inline-block;
              padding: 6px 12px;
              margin-bottom: 0;
              font-size: 14px;
              font-weight: 400;
              line-height: 1.42857143;
              text-align: center;
              white-space: nowrap;
              vertical-align: middle;
              border: 1px solid transparent;
              border-radius: 4px;
              cursor: pointer;
          }

          .has-error .form-control {
              border-color: #a94442;
              box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          }

          `}
          </style>
      </div>
    );
  }
}

export default Index;
