import { useState } from 'react';
import AWS from 'aws-sdk';
import styled from '@emotion/styled';
import { hiddenStyle } from '../styles/Hide';
import { v4 as uuidv4 } from 'uuid';

const S3UploadImage = (folderName: string) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const REGION = import.meta.env.VITE_AWS_S3_APP_REGION;
  const S3_BUCKET = import.meta.env.VITE_AWS_S3_BUCKET_NAME;

  AWS.config.update({
    region: REGION,
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_ID,
    secretAccessKey: import.meta.env.VITE_AWS_S3_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET + folderName },
    region: REGION,
    signatureVersion: 'v4',
  });

  const uploadFile = async (file: File) => {
    let imageUrl = null;
    let fileName = file.name;

    if (folderName === 'profile/') {
      fileName = uuidv4().split('-').join('') + '.' + file.name.split('.')[1];
    }
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: folderName + fileName,
      ContentType: 'image/*',
    };

    const putObjectPromise = myBucket.putObject(params).promise();

    await putObjectPromise
      .then((data) => {
        console.log(data);
        // @ts-ignore
        imageUrl = data.$response.request.params.Key;
      })
      .catch((err) => {
        console.log(err);
      });
    // .on('httpUploadProgress', (Progress, res) => {
    //   console.log(res);
    //   //@ts-ignore
    // })
    // .send((err) => {
    //   if (err) console.log(err);
    // });
    return imageUrl;
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileExt = file.name.split('.')[1];
      setImageFile(file);

      if (fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'svg' && fileExt !== 'png') {
        alert('jpg, svg, png 형식의 이미지 파일만 업로드 가능합니다');
      }
    }
  };

  const handleUploadBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (imageFile) {
      uploadFile(imageFile);
    } else alert('업로드 할 이미지 파일을 선택해주세요');
  };

  const handleUpload = async () => {
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadFile(imageFile);
    } else alert('업로드 할 이미지 파일을 선택해주세요');
    return imageUrl;
  };

  return { handleFileInput, handleUploadBtn, handleUpload };
};

export default S3UploadImage;
