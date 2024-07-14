const contacts = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log("All contacts:", allContacts);
      break;

    case "get":
      const searchedContact = await contacts.getContactById(id);
      console.log("Your searched contact is:", searchedContact);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log("The deleted contact is:", deletedContact);
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      console.log("Your new added contact is:", addedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};


invokeAction(argv);
