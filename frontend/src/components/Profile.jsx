function Profile({ currentUser }) {
  return (
    <>
      <div className="flex items-center mt-10">
        <div className="relative rounded-lg mx-auto">
          <div className="flex justify-center">
            <div className="w-[150px] h-[150px] text-lg font-medium bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer">
              {currentUser.name[0].toUpperCase()}
            </div>
          </div>

          {/* Write code here */}
        </div>
      </div>
    </>
  );
}

export default Profile;
