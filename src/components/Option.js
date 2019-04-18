import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Option(props) {

  const { question, option, authedUserId } = props;
  const thisOptionVotes = question[option].votes.length;
  const totalVotes = question.optionOne.votes.length +
    question.optionTwo.votes.length;
  const yesVote = question[option].votes.includes(authedUserId);
  let classList = 'question-option';
  if (yesVote) classList += '  yes-vote';
  const tallyBarStyle = {
    width: `${totalVotes ? thisOptionVotes / totalVotes * 100 : 0}%`,
    height: '100%',
    backgroundColor: '#008080',
    display: 'inline-block',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderTopRightRadius: `${totalVotes === thisOptionVotes ? '5px' : '0'}`,
    borderBottomRightRadius: `${totalVotes === thisOptionVotes ? '5px' : '0'}`
  };

  return (
    <div className={classList}>
      {yesVote && (
          <div className="checkmark">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </div>
      )}
      <h3 className="font-medium">
        {`Would you rather ${question[option].text}?`}
      </h3>
      <div className="tally-bar-background">
        <div style={tallyBarStyle} />
      </div>
      <div className="tally-text">
        {`${thisOptionVotes} out of ${totalVotes} votes`}
      </div>
    </div>
  );
}

Option.propTypes = {
  authedUserId: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  option: PropTypes.string.isRequired,
};

function mapStateToProps({ authedUser }) {
  return { authedUserId: authedUser.id };
}

export default connect(mapStateToProps)(Option);
