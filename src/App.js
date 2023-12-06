import { useState } from "react";
import Canvas from "./lib/components/Canvas";
import Description from "./lib/components/Description";
import Header from "./lib/components/Header";
import Picker from "./lib/components/Picker";
import Title from "./lib/components/Title";

function App() {
  const [state, setState] = useState(0)
  const [file, setFile] = useState(null)
  let title = "Step 1"
  const handleFilePick = (file) => {
    setState(1)
    setFile(file)
  }
  return (
    <div className="h-screen w-screen flex flex-col items-center p-5">
      <Header />
      <Title title={title} />
      <Description />
      {state == 0 ? <Picker handleFilePick={handleFilePick} /> : <Canvas width="400" height="400" file={file} />}
    </div>
  );
}

export default App;
