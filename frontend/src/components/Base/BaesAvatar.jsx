import { userProfile } from "../../utils/api";
function Avatar({ user, showStatus = true }) {
  const getStatusColor = () => {
    switch (user.status) {
      case "online":
        return "text-green-500";
      case "offline":
        return "text-gray-500";
      case "busy":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="relative">
        {user.status && showStatus && (
          <span className={`absolute ${getStatusColor()} right-0 bottom-0`}>
            <svg width={10} height={10}>
              <circle cx={4} cy={4} r={4} fill="currentColor" />
            </svg>
          </span>
        )}
        {user.profile ? (
          <div className="relative">
            {user.status && showStatus && (
              <span className={`absolute ${getStatusColor()} right-0 bottom-0`}>
                <svg width={10} height={10}>
                  <circle cx={4} cy={4} r={4} fill="currentColor" />
                </svg>
              </span>
            )}
            <img
              src={`${userProfile}/${user.profile}`}
              alt="test"
              className={`w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer ${getStatusColor()}`}
            />
          </div>
        ) : (
          <div
            className={`w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer ${getStatusColor()}`}
          >
            {user.name[0].toUpperCase()}
          </div>
        )}
      </div>
    </>
  );
}

export default Avatar;
