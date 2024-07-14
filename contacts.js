const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading contacts:', err.message);
    throw err;
  }
};

const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data)
        const searchedContact = contacts.find(contact => contact.id === contactId);
        if (!searchedContact) {
            throw new Error(`Contact with id: ${contactId} was not found`)
        }
        return searchedContact;
    }
    catch (err) {
        console.error('Error reading contacts:', err.message);
        throw err;
      }
}

const removeContact = async (contactID) => {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const searchedContactIndex = contacts.findIndex(contact => contact.id === contactID);
        if (searchedContactIndex === -1) {
            throw new Error(`Contact with id: ${contactID} was not found`);
        }
        const deletedContact = contacts.splice(searchedContactIndex, 1)[0];
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));      
        return deletedContact; 
    } catch (err) {
        console.error('Error removing contact:', err.message);
        throw err;
    }
};

const addContact = async (name, email, phone) => {
    if (!name || !email || !phone) {
        throw new Error('Name, email, and phone are required.');
    }
    try {
        const newContact = {
            name: name,
            email: email,
            phone: phone,
        }
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data)
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        console.log ('Contact added successfully:', newContact);
    } catch (err) {
        console.error('Error adding contact:', err.message);
        throw err;
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
