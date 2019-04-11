import React, { Component, Fragment } from 'react'

class NewQuestionTA extends Component {

  changeHandler = (e) => {
    this.props.handleChange(e, this.props.name)
  }

  render() {

    const { placeholder, text } = this.props
    const maxLength = 100
    const charsLeft = maxLength - text.length

    return (
      <Fragment>
        <textarea
          onChange={this.changeHandler}
          className="new-question-textarea"
          rows="1"
          value={text}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {charsLeft <= maxLength && (
          <div className='question-length'>
          {charsLeft}
          </div>
        )}
      </Fragment>
    )
  }
}

export default NewQuestionTA
