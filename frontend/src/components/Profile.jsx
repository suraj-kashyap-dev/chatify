function Profile({currentUser}) {
  return (
    <>
      <div className="flex items-center mt-10">
        <div className="relative shadow rounded-lg mx-auto">
          <div className="flex justify-center">
          <div className="w-[150px] h-[150px] text-lg font-medium bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer">
            {currentUser.name[0].toUpperCase()}
        </div>
          </div>
          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              {currentUser.name}
            </h1>
            <p className="text-center text-sm text-gray-400 font-medium">
              UI Components Factory
            </p>
            <p>
              <span></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
