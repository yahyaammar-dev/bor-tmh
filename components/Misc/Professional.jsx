import React from "react";
import Button from "./Button";

const Professional = ({ profile_image, fullName, position, onClick, available }) => {

  const isNetservex = profile_image.includes('https://tmh.netservex.com/');

  // Replace the substring if it exists in the URL
  const modifiedProfileImage = isNetservex
    ? profile_image.replace('https://tmh.netservex.com/', 'https://takemihome.it//')
    : profile_image;

  return (
    <div>
      {

        <div className="py-5 px-12 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div className="flex flex-col items-center pb-10">
            <img
              className="w-48 h-64 mb-3  shadow-lg"
              src={modifiedProfileImage}
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {fullName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {position}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6 justify-center">
              <Button text='Book Me' disableded={!available} outlined onClick={onClick} />
            </div>
          </div>
        </div>

      }

    </div >
  );
};

export default Professional;
