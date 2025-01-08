import React from "react";

const About = () => {

  return (
    <section className="container mx-auto px-4 my-10">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-primary mb-4">About VibeSpace</h1>
        <p className="text-lg text-gray-500">Your social media platform redefined!</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full lg:w-3/4 bg-base-100 rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            Welcome to <strong className="text-primary">VibeSpace</strong> – where social interaction meets personal productivity! 
            VibeSpace is your all-in-one platform for connecting with others and organizing your thoughts in a private, secure space.
          </p>

          <h3 className="text-3xl font-semibold text-primary my-6">What Makes VibeSpace Unique?</h3>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <i className="bi bi-check-circle-fill text-success text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Social Media Features</h5>
                <p className="text-gray-400">Share your thoughts with the world by uploading posts, liking others' content, and engaging through comments.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <i className="bi bi-check-circle-fill text-success text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Follow & Connect</h5>
                <p className="text-gray-400">Build your network by following other users and staying updated with their latest posts.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <i className="bi bi-check-circle-fill text-success text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Private Personal Space</h5>
                <p className="text-gray-400">Keep your private thoughts organized with a personal notebook accessible only to you.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <i className="bi bi-check-circle-fill text-success text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Secure & Reliable</h5>
                <p className="text-gray-400">Your privacy is our priority. VibeSpace ensures your data is safe with advanced security measures.</p>
              </div>
            </li>
          </ul>

          <h3 className="text-3xl font-semibold text-primary my-6">Features</h3>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <i className="bi bi-star-fill text-warning text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Post Creation & Interaction</h5>
                <p className="text-gray-400">Easily create posts, like content from others, and leave comments to engage with the community.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <i className="bi bi-star-fill text-warning text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Follow System</h5>
                <p className="text-gray-400">Stay connected by following your favorite users and seeing their updates in your feed.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <i className="bi bi-star-fill text-warning text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Private Notes</h5>
                <p className="text-gray-400">Enjoy a secure space to write and manage private notes that only you can access.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <i className="bi bi-star-fill text-warning text-2xl"></i>
              <div>
                <h5 className="text-xl font-bold">Real-time Notifications</h5>
                <p className="text-gray-400">Get instant updates when someone interacts with your posts or follows you.</p>
              </div>
            </li>
          </ul>

          <h3 className="text-3xl font-semibold text-primary my-6">Our Mission</h3>
          <p className="text-lg text-gray-400 leading-relaxed">
            At VibeSpace, our mission is to foster meaningful connections while helping individuals stay organized and inspired. 
            We strive to combine the best of social interaction and personal productivity in one seamless platform.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mt-4">
            Thank you for being a part of the VibeSpace community. We’re here to help you connect, create, and thrive in the digital world.
          </p>
        </div>
      </div>
    </section>
  );

};

export default About;
