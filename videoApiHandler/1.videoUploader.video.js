import { URL } from '../export/export.variable.js';

const uploadForm = document.querySelector('#uploadForm');
const loader = document.getElementById('loader');

const fileInput = document.querySelector('#video');
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file.size > 100 * 1024 * 1024) {
    // 100MB limit
    alert('File is too large! Maximum size is 100MB.');
  } else {
    console.log('File is ready to upload.');
  }
});

// Handle Video uplaod form
const videoUploadHandler = async (e) => {
  e.preventDefault();

  // Show the loader
  loader.classList.remove('hidden');

  //   get all the data from frontend
  const formData = new FormData(e.target);
  console.log(formData);

  try {
    const response = await fetch(`${URL}/api/v1/videos/`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
    console.log(response);

    const responseMsg = await response.json();

    console.log(responseMsg);

    if (!response.ok) {
      alert(responseMsg || 'Video Upload failed! Please try again.');
      location.reload();
    } else {
      alert(responseMsg.message || 'Video Uploaded Succesfully!');
      location.href = `./homepageVid.html`;
    }
  } catch (error) {
    console.log(error);
    alert(error || 'Video Upload failed! Please try again.');
    // location.reload();
  } finally {
    // Hide the loader after data is fetched or error occurs
    loader.classList.add('hidden');
  }
};

uploadForm.addEventListener('submit', videoUploadHandler);
