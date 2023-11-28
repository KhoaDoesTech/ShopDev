import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

function ImageUpload({
  name,
  setValue,
  value,
}) {
  const { register } = useFormContext();
  const [image, setImage] = useState(value);
  const onDrop = async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('upload_preset', 'wasteimages');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/neel0506/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      setImage(data.secure_url);
      if (name && setValue) {
        setValue(name, data.secure_url); // Update the form field value
      } // Update the form field value
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImageUrlChange = (imageUrl) => {
    setImage(imageUrl);
    if (name && setValue) {
      setValue(name, imageUrl); // Update the form field value
    }
  };
  const handlePaste = (event) => {
    const imageUrl = event.clipboardData.getData('text');
    handleImageUrlChange(imageUrl);
  };
  return (
    <div className="file-upload-container">
      <div
        {...getRootProps({
          className:
            'border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer text-center',
        })}
      >
        <input {...getInputProps()} ref={register} name={name} />
        <p>Drag & drop an image here, or click to select an image</p>
      </div>
      <div className="mt-2">
        <input
          type="text"
          className="w-full px-4 py-2"
          value={image || ''}
          placeholder="Paste image URL here"
          onChange={(e) => setValue(name, e.target.value)}
          onPaste={handlePaste}
        />
      </div>
      {value && <img src={value} alt="Uploaded" className="h-[10rem] mt-2" />}
    </div>
  );
}
export default ImageUpload;