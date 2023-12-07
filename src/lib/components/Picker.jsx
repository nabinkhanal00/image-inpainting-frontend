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

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="large_size">Large file input</label>
      <input onChange={handleFileChange} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" />

      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>    </div>

  )

}
export default Picker
