import Avatar from "../Avatar";
import dateTimeConverter from "../../helpers/dateTimeConverter.js";

function ReceivedBubble({ message, user }) {
  return (
    <>
      <div className="chat-message">
        <div className="flex">
          <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="">
                    <svg
                      fill="#00000"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330"
                      xml:space="preserve"
                      className="h-3 font-semibold w-3 mr-1 transform rotate-90"
                    >
                      <path
                        id="XMLID_222_"
                        d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
                      />
                    </svg>
                  </span>
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
