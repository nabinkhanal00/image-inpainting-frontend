import CanvasImage from "./CanvasImage";

function Canvas(props){
  return (
    <CanvasImage width={props.width} height={props.height} file={props.file}/>
  )
}
export default Canvas;
