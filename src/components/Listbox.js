import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

class Listbox extends Component {

  render() {

    const {
      users,
      activeUserId,
      setActiveUserId,
      listboxCollapsed,
      toggleListbox,
    } = this.props;

    const userIds = Object.keys(users);

    return (
      <div className='listbox-container'>
        <div
          onClick={toggleListbox}
          className='listbox-button'>
            {activeUserId ?
             users[activeUserId].name :
             'Select User'
            }
          <span className='listbox-chevron'>
            <FontAwesomeIcon icon={
              listboxCollapsed ?
              ['fas', 'chevron-down'] :
              ['fas', 'chevron-up']
            }/>
          </span>
        </div>
        {!listboxCollapsed &&
        <ul  className='listbox-list gray-border'>
          {userIds.map((id) => (
            <li
              key={id}
              onPointerEnter={() => {setActiveUserId(id)}}
              onClick={toggleListbox}
              className='listbox-li'>
              <img src={users[id].avatarURL} alt={`${users[id].name}'s' avatar`} className='avatar'/>
              <span className='listbox-li-name'>{users[id].name}</span>
            </li>
          ))}
        </ul>}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Listbox);
