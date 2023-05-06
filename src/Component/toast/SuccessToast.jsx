import React from 'react'

function SuccessToast({err}) {
 
  return (
    <div>
        <div className="toast">
  <div className="alert alert-info">
    <div>
      <span>{err}</span>
    </div>
  </div>
</div>
    </div>
  )
}

export default SuccessToast