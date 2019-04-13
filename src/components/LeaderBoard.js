import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserScore from './UserScore';


class LeaderBoard extends Component {

  render() {
    const { users, authedUser } = this.props;

    if (!authedUser) {
       return <Redirect
        to={{
          pathname: "/",
          state: { referrer: `/leaderboard`}
        }}
      />
    }

    //sort all users by score
    let sortedUsers = [...users].sort((u1, u2) => u2.score - u1.score);
    // assign rank
    sortedUsers[0].rank = 1;
    for (let i = 1; i < sortedUsers.length; i++) {
      // handle tie
      if (sortedUsers[i].score === sortedUsers[i-1].score) {
        sortedUsers[i].rank = sortedUsers[i - 1].rank;
      } else {
        sortedUsers[i].rank = sortedUsers[i - 1].rank + 1;
      }
    }

    return(
      <div className='min-max-width justify-self-center'>
        {sortedUsers.map((user) => (
          <UserScore key={user.id} userId={user.id} rank={user.rank}/>))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users: Object.values(users).map(user => {
      return {
        id: user.id,
        score: user.questions.length + Object.keys(user.answers).length,
      }
    })
  };
}

export default connect(mapStateToProps)(LeaderBoard)
