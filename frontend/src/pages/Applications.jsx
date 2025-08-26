import React from 'react'
import { useParams } from 'react-router-dom'

const Applications = () => {
  const { jobId } = useParams();

  return (
    <div>
      <h1>Applications for Job ID: {jobId}</h1>
    </div>
  )
}

export default Applications
