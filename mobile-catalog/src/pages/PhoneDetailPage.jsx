import { useParams } from 'react-router-dom';

function PhoneDetailPage() {
  const { id } = useParams();

  return <h1>Phone Detail Page - {id}</h1>;
}

export default PhoneDetailPage;