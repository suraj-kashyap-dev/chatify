import Messages from "../models/Message.js";

const getMessages = async(req, res) => {
  try {
    const { from, to, page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    const totalMessagesCount = await Messages.countDocuments({
      users: { $all: [from, to] },
    });

    const totalPages = Math.ceil(totalMessagesCount / pageSize);

    const messages = await Messages.find({
      users: { $all: [from, to] },
    })
      .sort({ updatedAt: -1 }) // Sort in descending order
      .skip(parseInt(skip, 10))
      .limit(parseInt(pageSize, 10));

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        created_at: msg.createdAt,
      };
    });

    res.json({
      messages: projectedMessages,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        msg: "Message added successfully.",
      });
    }

    return response.json({
      msg: "Failed to add message to the database",
    });
  } catch (ex) {
    next(ex);
  }
};

export { addMessage, getMessages };
