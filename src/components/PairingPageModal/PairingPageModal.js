import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PairingPageModal({ showModal, imageSrc, onClose }) {
  // Prevent body from scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className='w-full lg:w-[60%] h-[70%] flex flex-col items-center justify-center overflow-hidden bg-white p-2 md:p-4'>
   
        <div className="flex justify-between items-center">
          <h3 className="text-2xl">Image Preview</h3>
          <button
            className="text-black font-semibold text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className=' relative  w-full h-full'>
        <Image src={imageSrc} alt="animal" fill style={{objectFit:'cover', objectPosition:'center'}}/>
        </div>
 
      </div>

    </div>
  );
}
