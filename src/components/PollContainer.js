import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollContainer extends Component {

  render() {

    const { children, headerText, author } = this.props;

    return (
       <div className='gray-border min-max-width justify-self-center'>
         <h2 className='grid-header font-medium'>
           {headerText}
         </h2>
         <div className='two-col-grid'>
           <img
              src={author.avatarURL}
              alt={`${author.name}'s avatar`}
              className='avatar avatar-grid'
            />
            {children}
          </div>
        </div>
      );
    }
  }

function mapStateToProps({ questions, users }, { questionId }) {
  const question = questions[questionId];
  return {
    question,
    author: users[question.author],
  };
}

export default connect(mapStateToProps)(PollContainer);
