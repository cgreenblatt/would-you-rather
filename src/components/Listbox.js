import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

function Listbox(props) {

  const {
    users,
    activeUserId,
    setActiveUserId,
    listboxCollapsed,
    toggleListbox,
  } = props;

  const userIds = Object.keys(users);

  return (
    <div className="listbox-container">
      <div
        role="button"
        onClick={toggleListbox}
        className="listbox-button">
        {activeUserId ? users[activeUserId].name : 'Select User'}
        <span className="listbox-chevron">
          <FontAwesomeIcon icon={listboxCollapsed ? ['fas', 'chevron-down'] : ['fas', 'chevron-up']} />
        </span>
      </div>
      {!listboxCollapsed && (
      <ul className="listbox-list gray-border">
        {userIds.map(id => (
          <li
           key={id}
            onPointerEnter={() => {setActiveUserId(id);}}
            onClick={toggleListbox}
            className="listbox-li">
            <img src={users[id].avatarURL} alt={`${users[id].name}'s' avatar`} className="avatar" />
            <span className="listbox-li-name">{users[id].name}</span>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

Listbox.propTypes = {
  users: PropTypes.object.isRequired,
  activeUserId: PropTypes.string,
  setActiveUserId: PropTypes.func.isRequired,
  listboxCollapsed: PropTypes.bool.isRequired,
  toggleListbox: PropTypes.func.isRequired,
};

function mapStateToProps({ users }, ownProps) {
  return {
    users,
    ...ownProps
  };
}

export default connect(mapStateToProps)(Listbox);
