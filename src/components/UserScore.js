import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserScore = (props) => {

  const { user, rank } = props;

  let classList = 'trophy';
  switch (rank) {
    case 1:
      classList = classList.concat(' trophy-first')
      break;
    case 2:
      classList = classList.concat(' trophy-second')
      break;
    case 3:
      classList = classList.concat(' trophy-third')
      break;
    default:
  }

  const questions = user.questions.length;
  const answers = Object.keys(user.answers).length;

  return(
    <div className='gray-border user-score-container'>
      {rank < 4 &&
        <React.Fragment>
          <div className='half-trapezoid'></div>
          <div className={classList}>
            <FontAwesomeIcon icon={['fas', 'trophy']}/>
          </div>
        </React.Fragment>
      }
      <img src={user.avatarURL} alt={`${user.name}'s avatar`} className='avatar avatar-grid'/>
      <div className='score-grid-middle'>
        <h3>{user.name}</h3>
        <div className='score-row'>Answered questions
          <span className='score'>{answers}</span>
        </div>
        <div className='score-row'>Created questions
          <span className='score'>{questions}</span>
        </div>
      </div>
      <div className='gray-border score-total-grid'>
        <div className='score-heading'>
          <h4 className='score-heading-center'>Score</h4>
        </div>
        <div className='score-total'>
          <div className='score-value'>{questions + answers}</div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ users }, { userId }) {
  return { user: users[userId] };
}

export default connect(mapStateToProps)(UserScore);
