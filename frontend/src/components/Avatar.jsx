function Avatar({ user }) {
    return <>
    <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white">
        {user.username[0].toUpperCase()}
    </div>
    </>
}

export default Avatar;