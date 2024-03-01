import Messages from "../models/Message.js";

const getMessages = async (request, response, next) => {
  try {
    const { from, to } = request.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        created_at: msg.createdAt,
      };
    });
    response.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

const addMessage = async (request, response, next) => {
  try {
    const { from, to, message } = request.body;

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return response.json({
        msg: "Message added successfully."
      });
    }

    return response.json({
      msg: "Failed to add message to the database"
    });
  } catch (ex) {
    next(ex);
  }
};

export {
  addMessage,
  getMessages,
}