import React, { useEffect, useState } from 'react'
import { getMyApplications } from '../services/api';
import { Alert, Spinner } from 'react-bootstrap';


const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const response = await getMyApplications();
        setApplications(response.data);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  if (loading) return <Spinner animation="border" className="m-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      
    </div>
  )
}

export default MyApplications
