import React from 'react';
import PropTypes from 'prop-types';
import styles from './contact-list.module.css';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.contactItem}>
          {name}: {number}
          <button
            type="button"
            className={styles.contactBtn}
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            <DeleteIcon width="20" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
