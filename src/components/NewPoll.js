import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';
import OptionTA from './OptionTA';

class NewPoll extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toPolls: false,
  };

  handleChange = (e, option) => {
    const text = e.target.value;
    this.setState(() => ({ [option]: text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { history } = this.props;
    this.props.addQuestion(optionOneText, optionTwoText)
     .then(question => this.setState(() => ({ toPolls: true })));
  };

  render() {


    if (this.state.toPolls) {
      return <Redirect to='/polls/unanswered' />
    }

    return (
      <div className='gray-border min-max-width'>
        <h2 className='new-question-header'>Create New Question</h2>
          <div className='new-question-content'>
            <div>Complete the question:</div>
            <h3 className='new-question-subheader1'>Would you rather ...</h3>
            <form onSubmit={this.handleSubmit}>
              <OptionTA
                placeholder='Enter Option One Text Here'
                name='optionOneText'
                handleChange={this.handleChange}
                text={this.state.optionOneText}
              />
              <h3 className='new-question-subheader2'>OR</h3>
              <OptionTA
                placeholder='Enter Option Two Text Here'
                name='optionTwoText'
                handleChange={this.handleChange}
                text={this.state.optionTwoText}
              />
              <button
                type='submit'
                className='new-question-btn'
              >
                Submit
              </button>
            </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser}, props) {
  return {
    authedUser,
   };
}

function mapDispatchToProps(dispatch) {
  return ({
    addQuestion: function(optionOneText, optionTwoText) {
      return dispatch(handleAddQuestion(optionOneText, optionTwoText));
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
