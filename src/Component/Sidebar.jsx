import React, { useState, createRef } from 'react'
import { IoHomeOutline, IoSettingsSharp } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';
import { userLoginInfo } from '../Slices/userSlice';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Link } from 'react-router-dom';

const Sidebar = ({active}) => {
  //--------------- const portion for image cropper
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  //------------ image cropper ends---------------
  const auth = getAuth();
  const storage = getStorage();
  // const [upImageInfo, setUpImageInfo] = useState("");
  const [imageModal, setImageModal] = useState(false);
  // const [imageUrl, setImageUrl] = useState("");
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  let [cropModal, setCropModal] = useState(false);
  // console.log(data);
  let name = localStorage.getItem("name");
  const handleImageModal = () => {
    setImageModal(true);
  }

  let handleClose = () => {
    setImageModal(false);
    setCropData('');
    setImage('');
    setCropModal('');
  }
  // -----this is an image upload process with image crop facility-----------------
  const handleProPic = (e) => {
    setCropModal(true)
    console.log(e)
    e.preventDefault();
    // In below portion all files data is stored in variable name "files"
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    // In below portion file read result is stored setImage
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    // In below portion an image URL is set in 0 index of file
    reader.readAsDataURL(files[0]);
  };
  // fuction used for crop image
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, 'some-child');
      // Data URL string
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: downloadURL
          }).then(() => {
            setImageModal(false)
          })
        });
      });
    }
  };
  // ------------this is an image upload process----------------
  // const handleImageInfo = (e) => {
  //   // here files will show all the information of the uploaded file in console
  //   // console.log(e.target.files[0])
  //   setUpImageInfo(e.target.files[0])
  // }
  // handleImageUpload was taken in upload button
  // const handleImageUpload = (e) => {
  //   const storageRef = ref(storage, 'some-child');

  //   // 'file' comes from the Blob or File API
  //   uploadBytes(storageRef, upImageInfo).then((snapshot) => {
  //     getDownloadURL(storageRef).then((downloadURL) => {
  //       // console.log('File available at', downloadURL);
  //       // setImageUrl(downloadURL)
  //       updateProfile(auth.currentUser, {
  //         displayName: name,
  //         photoURL: downloadURL
  //       }).then(() => {
  //         setImageModal(false)
  //       })
  //     });
  //   });
  // }

  return (
    <div className='flex flex-col justify-around items-center h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-16 h-16 rounded-full object-cover overflow-hidden relative group'>
          <img src={data.photoURL} alt="portrait" />
          <div onClick={handleImageModal} className='w-16 h-16 flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,.7)] invisible rounded-full group-hover:visible'>
            <FaCloudUploadAlt className='text-2xl text-white' />
          </div>
        </div>
        <div>
          <h3 className='font-nova text-sm font-semibold text-darkblue'>{data.displayName}</h3>
          <h4 className='font-nunito text-xs font-normal text-darkblue '>Web Devoloper</h4>
        </div>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center '>
        <div className={active=="Home"? 'text-3xl text-white flex justify-center items-center bg-skyblue w-14 h-14  rounded-lg mr-5 mb-4' : 'text-3xl text-darkblue flex justify-center items-center w-14 h-14  rounded-lg mr-5 mb-4'}>
          <Link to='/Home'>
            <IoHomeOutline />
          </Link>
        </div>
        <div className={active=="message"? 'text-3xl text-white flex justify-center items-center bg-skyblue w-14 h-14  rounded-lg mr-5 mb-4' : 'text-3xl text-darkblue flex justify-center items-center w-14 h-14  rounded-lg mr-5 mb-4'}>
          <Link to='/message'>
            <TiMessages />
          </Link>
        </div>
        <div className='text-3xl text-darkblue w-14 h-14 rounded-lg'>
          <MdNotificationsActive />
        </div>
        <div className='text-3xl  text-darkblue w-14 h-14 rounded-lg'>
          <IoSettingsSharp />
        </div>
      </div>
      <div className='text-3xl  text-darkblue bg-skyblue w-14 h-14 rounded-full flex justify-center items-center mr-5'>
        <TbLogout />
      </div>
      {imageModal &&
        <div className='w-full h-screen absolute top-0 left-0 bg-[rgba(0,0,0,.5)] flex justify-center items-center '>
          <div className='w-[450px] h-auto bg-violate rounded-xl relative p-4'>
            <IoIosCloseCircle onClick={handleClose} className='text-3xl text-purple absolute top-[5px] right-[5px]' />
            {/* We are using a prebuild component for image uploading */}
            {/* <div class="flex items-center justify-center w-full ">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input onChange={handleImageInfo} id="dropzone-file" type="file" class="hidden" />
              </label>
            </div> */}
            <input onChange={handleProPic} type="file" />
            {cropModal &&
              (<Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
              )}

            <button onClick={getCropData} className='w-full mt-4 py-3  bg-purple text-white rounded-md font-nunito text-xl'>Upload</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Sidebar