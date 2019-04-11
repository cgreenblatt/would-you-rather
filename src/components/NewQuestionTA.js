import React, { Component, Fragment } from 'react'

class NewQuestionTA extends Component {

  constructor(props) {
    super(props)
    this.textInput = React.createRef();
  }

  componentDidMount() {
    if (this.props.name === 'optionOneText')
     this.textInput.current.focus();
  }

  changeHandler = (e) => {
    this.props.handleChange(e, this.props.name)
  }

  render() {

    const { placeholder, text, name } = this.props
    const maxLength = 100
    const charsLeft = maxLength - text.length

    return (
      <Fragment>
        <textarea
          ref = {this.textInput}
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
