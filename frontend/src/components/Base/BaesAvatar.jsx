function Avatar({ user }) {
  return (
    <>
      <div className="relative">
        {user.is_active ? (
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width={10} height={10}>
              <circle cx={4} cy={4} r={4} fill="currentColor" />
            </svg>
          </span>
        ) : (
          ""
        )}
        <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer">
          {user.name[0].toUpperCase()}
        </div>
      </div>
    </>
  );
}

export default Avatar;
