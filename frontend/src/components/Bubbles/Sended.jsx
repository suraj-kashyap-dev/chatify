import dateTimeConverter from "../../helpers/dateTimeConverter.js";
import TruncateText from "../Base/TruncateText.jsx";
function Sendedbubble({ message }) {
  return (
    <>
      <div className="chat-message cursor-pointer">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-violet-600 text-white ">
                <div className="flex items-center gap-1 ">
                  <TruncateText text={message.message} maxWords={50} />
                </div>
              </span>
            </div>
            <span className="text-xs">
              {dateTimeConverter(message.created_at)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sendedbubble;
