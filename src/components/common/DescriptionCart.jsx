import parse from "html-react-parser"; 

export default function DescriptionCart({description}) {
    const value = description.toString()
  return (
    <div className="px-2">
      {parse(value)} 
    </div>
  );
}