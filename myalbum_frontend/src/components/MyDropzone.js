import axios from "axios";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  //backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const MyDropzone = forwardRef((props, ref) => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [selectedPic, setSelectedPic] = useState(null); // Change from previewSrc to selectedFile

  // uploadref from the parent component
  const uploadPic = () => {
    const token = sessionStorage.getItem("jwt");
    const formData = new FormData();
    formData.append("image", selectedPic, selectedPic.name);
    axios
      .post("http://localhost:3000/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Upload failed", error);
        alert("Upload failed");
      });
  };

  useImperativeHandle(ref, () => ({
    uploadPic,
  }));

  const onDrop = useCallback((acceptedFiles) => {
    // Only take the first file, since we only need one preview
    const file = acceptedFiles[0];
    setSelectedPic(file);
    // Initialize FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewSrc(reader.result); // this is the data URL
    };
    reader.readAsDataURL(file);
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.png images will be accepted)</em>
        {previewSrc && (
          <img
            src={previewSrc}
            alt="Preview"
            style={{ width: "10%", height: "auto" }}
          />
        )}
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
});

export default MyDropzone;
