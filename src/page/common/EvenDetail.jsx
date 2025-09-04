import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();

  return (
    <div>{id ?? 'Không có id'}</div>
  );
}
