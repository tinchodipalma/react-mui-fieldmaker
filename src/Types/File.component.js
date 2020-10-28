import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextField, IconButton, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import DnD from '../DnD';

const FILE_TYPES = {
  any: 'any',
  image: 'image',
  pdf: 'pdf',
};

const readImageFile = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
};

const getImageSrc = (file) => {
  let src = null;

  if (file) {
    if (typeof file === 'object' && file.blob) {
      src = file.blob;
    } else if (typeof file === 'string') {
      src = file;
    }
  }

  return src;
};

const FileFieldComponent = ({ file, fileType, onFileChange }) => {
  const fileInputRef = useRef();
  const [imageSrc, setImageSrc] = useState(
    fileType === FILE_TYPES.image ? getImageSrc(file) : null
  );

  const loadImageSrc = async (imageFile) => {
    let newImageSrc = imageFile ? getImageSrc(imageFile) : null;
    try {
      if (!newImageSrc) {
        newImageSrc = await readImageFile(imageFile);
      }
      setImageSrc(newImageSrc);
    } catch (err) {
      // do nothing.
    }

    return newImageSrc;
  };

  useEffect(() => {
    if (file && fileType === FILE_TYPES.image) {
      loadImageSrc(file);
    }
  }, [file]);

  const onUploadClick = () => {
    if (!file) {
      fileInputRef.current.click();
    }
  };

  const onFileInputChange = async ({ target: { files } }) => {
    const [fileData] = files;

    if (fileData && fileType === FILE_TYPES.image) {
      const blobURL = await loadImageSrc(fileData);
      fileData.blob = blobURL;
    }

    onFileChange(fileData);
  };

  const onDeleteClick = (event) => {
    event.stopPropagation();
    if (file && fileType === FILE_TYPES.image) {
      setImageSrc(null);
    }
    onFileChange(null);
  };

  const containerClassName = classnames(
    'FileField FileField__Container',
    `FileField--${fileType}`,
    {
      'FileField--withFile': !!file,
      'FileField--withImage': !!imageSrc,
    }
  );

  return (
    <div className={containerClassName}>
      <Paper
        className="FileField__UploadContainer"
        component={!file ? 'a' : 'div'}
        onClick={onUploadClick}
      >
        {!!imageSrc && (
          <img className="FileField__UploadedImage" src={imageSrc} />
        )}
        <IconButton
          className="FileField__UploadContainer__Button"
          component="div"
          color="primary"
          size="medium"
        >
          <UploadIcon />
        </IconButton>
        <IconButton
          component="a"
          className="FileField__UploadContainer__DeleteButton"
          onClick={onDeleteClick}
          color="primary"
          size="medium"
        >
          <CloseIcon />
        </IconButton>
      </Paper>
      <TextField
        inputRef={fileInputRef}
        className="FileField__Input"
        type="file"
        label=""
        value=""
        onChange={onFileInputChange}
        fullWidth
      />
    </div>
  );
};

FileFieldComponent.defaultProps = {
  file: '',
  fileType: FILE_TYPES.any,
};

FileFieldComponent.propTypes = {
  file: PropTypes.any,
  fileType: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
};

const FileComponent = ({
  value,
  label,
  max,
  fileType,
  onChange,
  ...otherProps
}) => {
  const [files, setFiles] = useState(
    Array.isArray(value) ? [...value] : [value]
  );

  useEffect(() => {
    setFiles(Array.isArray(value) ? [...value] : [value]);

    // eslint-disable-next-line
  }, [value]);

  const allowMoreFiles = files.length < max;

  const onFileChange = (index) => (file) => {
    let newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
    onChange({ target: { value: newFiles } });
  };

  const onDnDChange = (elements) => {
    setFiles(elements);
    onChange({ target: { value: elements } });
  };

  const onAddClick = () => {
    setFiles(files.concat(null));
  };

  return (
    <div className="FileComponent FileComponent__Container">
      <DnD
        elements={files}
        onChange={onDnDChange}
        elementClassName="FileField__Draggable"
      >
        {(file, index) => (
          <FileFieldComponent
            key={index}
            file={file}
            fileType={fileType}
            onFileChange={onFileChange(index)}
          />
        )}
      </DnD>

      {allowMoreFiles && (
        <div className="FileField__AddContainer">
          <IconButton
            className="FileField__AddContainer__Button"
            onClick={onAddClick}
            size="medium"
          >
            <AddIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

FileComponent.defaultProps = {
  value: '',
  fileType: FILE_TYPES.any,
  max: 1,
};

FileComponent.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  fileType: PropTypes.string,
  max: PropTypes.number,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileComponent;
