import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-center text-2xl font-bold mb-4">Profile</h2>
      {/* Your profile information goes here */}
      <div className="flex justify-center">
        <Link to="/" className="py-2 px-4 bg-blue-500 text-white rounded-md">
          Back to Chat
        </Link>
      </div>
    </div>
  );
};

export default Profile;
