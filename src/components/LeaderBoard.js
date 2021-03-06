import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserScore from './UserScore';

function LeaderBoard(props) {
  const { users } = props;

//  sort all users by score
  const sortedUsers = [...users].sort((u1, u2) => u2.score - u1.score);
  // assign rank
  sortedUsers[0].rank = 1;
  for (let i = 1; i < sortedUsers.length; i += 1) {
    // handle tie
    if (sortedUsers[i].score === sortedUsers[i - 1].score) {
      sortedUsers[i].rank = sortedUsers[i - 1].rank;
    } else {
      sortedUsers[i].rank = sortedUsers[i - 1].rank + 1;
    }
  }

  return (
    <div className="min-max-width justify-self-center">
      {sortedUsers.map(user => <UserScore key={user.id} userId={user.id} rank={user.rank} />)}
    </div>
  );
}

LeaderBoard.propTypes = {
  users: PropTypes.array.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users: Object.values(users).map(user => (
      {
        id: user.id,
        score: user.questions.length + Object.keys(user.answers).length,
      }
    )),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
