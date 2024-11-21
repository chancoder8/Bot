import { Platform } from 'react-native';
import { Cloudinary } from '@cloudinary/url-gen';
import { upload } from 'cloudinary-react-native';
import { UploadApiResponse } from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params';

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export const uploadImage = async (file: string) => {
  const options = {
    upload_preset: 'default',
    unsigned: true,
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};

// export const uploadImage = async (file: string) => {
//   const formData = new FormData();
//   formData.append('file', file); // file은 Base64 문자열 또는 Blob이어야 합니다.
//   formData.append('upload_preset', 'default');

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Failed to upload image');
//     }

//     const result = await response.json();
//     return result; // Cloudinary 업로드 결과 반환
//   } catch (error) {
//     console.error('Image upload failed:', error);
//     throw error;
//   }
// };
