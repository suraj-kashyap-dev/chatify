import Avatar from "../Avatar";
import dateTimeConverter from "../../helpers/dateTimeConverter.js";

function ReceivedBubble({ message, user }) {
  return (
    <>
      <div className="chat-message cursor-pointer">
        <div className="flex">
          <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                <div className="flex items-center gap-1">
                  <span>{message.message}</span>
                </div>
              </span>
            </div>
            <span className="text-xs">
              {dateTimeConverter(message.created_at)}
            </span>
          </div>

          <div className="flex items-center">
            <Avatar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceivedBubble;
