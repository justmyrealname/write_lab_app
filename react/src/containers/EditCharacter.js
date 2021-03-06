import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TextField from '../components/TextField';

class EditCharacter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      backstory: '',
      age: '',
      avatar_url: '',
      errors:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCharacter = this.getCharacter.bind(this);
  }

  // Put your functions here
  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  getCharacter() {
    fetch(`/api/v1/characters/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        name: body.name,
        avatar_url: body.avatar_url,
        backstory: body.backstory,
        age: body.age
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // fetchPost(postPath, method, data, redirectPath) takes 3 arguments:
  //  - url to post to
  //  - variable of object to post (newChar/newPost/etc.)
  //  - url for redirect

  handleSubmit(event) {
    event.preventDefault();
    let newData = {
      name:       this.state.name,
      age:        this.state.age,
      backstory:  this.state.backstory,
      avatar_url: this.state.avatar_url
    }
    this.props.fetchPost(
      `/api/v1/characters/${this.props.params.id}`,
      'PATCH',
      newData,
      `/boards/${this.props.params.board_id}`
    )
  }

  componentDidMount() {
    this.getCharacter();
  }

  render() {

    return(
      <div>
        <h4>Edit Character</h4>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fieldName='name'
            label='Character Name:'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <img id='edit-avatar' src={this.state.avatar_url} />
          <TextField
            fieldName='avatar_url'
            label='Avatar:'
            value={this.state.avatar_url}
            onChange={this.handleChange}
          />
          <TextField
            fieldName='age'
            label='Age:'
            value={this.state.age}
            onChange={this.handleChange}
          />
          <TextField
            fieldName='backstory'
            label='Backstory:'
            value={this.state.backstory}
            onChange={this.handleChange}
          />
          <input type='submit' value='Save Changes' />
        </form>
      </div>
    )
  }
}

export default EditCharacter;
