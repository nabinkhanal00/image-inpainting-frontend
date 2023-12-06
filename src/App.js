// import { useState } from "react";
import Canvas from "./lib/components/Canvas";
import Description from "./lib/components/Description";
import Header from "./lib/components/Header";
import Title from "./lib/components/Title";

function App() {
  // const [state, setState] = useState(0)
  let title = "Step 1"
  return (
    <div className="h-screen w-screen flex flex-col items-center p-5">
      <Header />
      <Title title={title}/>
      <Description />
      <Canvas width="400" height="400" />
    </div>
  );
}

export default App;
