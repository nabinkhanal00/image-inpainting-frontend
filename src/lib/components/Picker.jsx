import { useState } from "react"

function Picker(props) {
  const [file, setFile] = useState(null)
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }
  const handleUpload = () => {
    props.handleFilePick(file)

  }
  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>

  )

}
export default Picker
