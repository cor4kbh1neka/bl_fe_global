import React from 'react'

export const renderSkeleton = () => {
  return (
    <>
    {[1, 2, 3].map((_, index) => (
        <div className="listdatalive skeleton" key={index}>
        <div className="loader"></div>
        </div>
    ))}
    </>
  )
  
}
