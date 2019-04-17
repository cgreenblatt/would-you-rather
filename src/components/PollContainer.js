import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PollContainer(props) {

  const {
    children, headerText, author,
  } = props;

  return (
    <div className="gray-border min-max-width justify-self-center">
      <h2 className="grid-header font-medium">
        {headerText}
      </h2>
      <div className="two-col-grid">
        <img
          src={author.avatarURL}
          alt={`${author.name}'s avatar`}
          className="avatar avatar-grid"
        />
        {children}
      </div>
    </div>
  );
}

PollContainer.propTypes = {
  question: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  headerText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function mapStateToProps({ questions, users }, { questionId }) {
  const question = questions[questionId];
  return {
    question,
    author: users[question.author],
  };
}

export default connect(mapStateToProps)(PollContainer);
