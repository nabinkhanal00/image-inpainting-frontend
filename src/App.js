import { useState } from "react";
import "./App.css"
import Canvas from "./lib/components/Canvas";
import Description from "./lib/components/Description";
import Header from "./lib/components/Header";
import Picker from "./lib/components/Picker";
import ThemeSwitcher from "./lib/components/ThemeSwitcher";
import Title from "./lib/components/Title";

function App() {
  const [state, setState] = useState(0)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("Step One")
  const [finalImage, setFinalImage] = useState(null)
  const handleFilePick = (file) => {
    setState(1)
    setTitle("Step Two")
    setFile(file)
  }
  return (
    <div className="mocha bg-base h-screen w-screen flex flex-col items-center p-5">
    <div className="flex">
      <Header />
    <ThemeSwitcher/>
    </div>
      <Title title={title} />
      <Description />
      {state == 0 ? <Picker handleFilePick={handleFilePick} /> : <Canvas width="400" height="400" file={file} setFinalImage={setFinalImage} />}
      {finalImage && <img />}
    </div>
  );
}

export default App;
