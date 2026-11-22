import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const placeholder = 'https://placehold.co/200?text=Choose+image';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const {handleInputChange, handleSubmit, inputs} = useForm(doUpload, {
    title: '',
    description: '',
  });

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : placeholder),
    [file],
  );

  useEffect(
    () => () => {
      if (file) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [file, previewUrl],
  );

  function handleFileChange(event) {
    setFile(event.target.files?.[0] ?? null);
  }

  async function doUpload(formInputs) {
    setError('');
    const token = localStorage.getItem('token');
    if (!file || !token) {
      setError(!file ? 'Choose a file to upload.' : 'Log in to upload media.');
      return;
    }

    setIsUploading(true);
    try {
      const fileData = await postFile(file, token);
      await postMedia(fileData, formInputs, token);
      navigate('/', {replace: true});
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      setError(
        uploadError instanceof Error ? uploadError.message : 'Upload failed.',
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img src={previewUrl} alt="preview" width="200" />
        <button
          type="submit"
          disabled={!file || inputs.title.trim().length <= 3 || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
};

export default Upload;
