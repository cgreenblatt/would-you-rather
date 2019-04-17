import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class OptionTA extends Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    if (name === 'optionOneText') {
      this.textInput.current.focus();
    }
  }

  changeHandler(e) {
    const { name, handleChange } = this.props;
    handleChange(e, name);
  }

  render() {
    const { placeholder, text } = this.props;
    const maxLength = 100;
    const charsLeft = maxLength - text.length;

    return (
      <Fragment>
        <textarea
          ref={this.textInput}
          onChange={this.changeHandler}
          className="new-question-textarea"
          rows="1"
          value={text}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {charsLeft <= maxLength && (
          <div className="question-length">
            {charsLeft}
          </div>
        )}
      </Fragment>
    );
  }
}

OptionTA.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default OptionTA;
