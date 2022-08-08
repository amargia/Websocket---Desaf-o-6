const messages = require("../Messages/messages");

class MessagesActions {
  static add(message){
    return messages.addMessage(message);
  }
  static update(id, newContent){
    return messages.updateMessage(id, newContent);
  }
}

module.exports = { MessagesActions };