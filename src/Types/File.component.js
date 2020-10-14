import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextField, IconButton, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

const FILE_TYPES = {
  any: 'any',
  image: 'image',
  pdf: 'pdf',
};

const FileFieldComponent = ({ file, fileType, onFileChange }) => {
  const fileInputRef = useRef();
  // const uploadedImageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(file || null);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const onFileInputChange = ({ target: { files } }) => {
    const [fileData] = files;

    onFileChange(fileData);
    if (fileData && fileType === FILE_TYPES.image) {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      // const { current } = uploadedImageRef;
      // current.file = fileData;
      reader.onload = (e) => {
        // current.src = e.target.result;
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(fileData);
    }
  };

  const onDeleteClick = () => {
    if (file && fileType === FILE_TYPES.image) {
      // const { current } = uploadedImageRef;
      // delete current.file;
      // delete current.src;
      setImageSrc(null);
    }
    onFileChange(null);
  };

  const containerClassName = classnames(
    'FileField FileField__Container',
    `FileField--${fileType}`,
    {
      'FileField--withFile': !!file,
    }
  );

  return (
    <div className={containerClassName}>
      <Paper className="FileField__UploadContainer">
        {!!imageSrc && (
          <img className="FileField__UploadedImage" src={imageSrc} />
        )}
        <IconButton
          className="FileField__UploadContainer__Button"
          onClick={onUploadClick}
          color="primary"
          size="medium"
        >
          <UploadIcon />
        </IconButton>
        <IconButton
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

  const allowMoreFiles = files.length < max;

  const onFileChange = (index) => (file) => {
    let newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
    onChange({ target: { value: newFiles } });
  };

  const onAddClick = () => {
    setFiles(files.concat(null));
  };

  return (
    <div className="FileComponent FileComponent__Container">
      {files.map((file, i) => (
        <FileFieldComponent
          key={i}
          file={file}
          fileType={fileType}
          onFileChange={onFileChange(i)}
        />
      ))}

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
