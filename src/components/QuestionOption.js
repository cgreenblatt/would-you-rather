import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QuestionOption extends Component {

  render() {

    const { question, option, authedUserId } = this.props;

    const thisOptionVotes = question[option].votes.length;
    const totalVotes = question.optionOne.votes.length +
      question.optionTwo.votes.length;

    const yesVote = question[option].votes.includes(authedUserId);
    let classList = 'question-option';
    if (yesVote) classList += '  yes-vote';
    const tallyBarStyle = {
      width: `${totalVotes? thisOptionVotes/totalVotes*100 : 0}%`,
      height: '100%',
      backgroundColor: '#008080',
      display: 'inline-block',
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px'
    };

    return (
      <div className={ classList } >
        {yesVote &&
        <div className='checkmark-container'>
          <div className='checkmark'>
            <FontAwesomeIcon icon={['fas', 'check']}/>
          </div>
        </div> }
        <h3 className='font-medium'>Would you rather {question[option].text}?</h3>
        <div className='tally-bar-background'>
          <div style={tallyBarStyle}></div>
        </div>
        <div className='tally-text'>{thisOptionVotes} out of {totalVotes} votes</div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUserId: authedUser };
}

export default connect(mapStateToProps)(QuestionOption);
