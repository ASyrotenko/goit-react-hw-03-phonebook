import React, { Component } from 'react';
import shortid from 'shortid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';

import styles from './app.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    const normalizedName = name.toLowerCase();
    const findeName = this.state.contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );

    if (findeName) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    this.setState({ filter: '' });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filtredContacts = this.filterContacts();
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm title={'Phonebook'} onSubmit={this.addContact} />
        <h2 className={styles.subTitle}>Contacts</h2>
        <div className={styles.contactListWrap}>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filtredContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
