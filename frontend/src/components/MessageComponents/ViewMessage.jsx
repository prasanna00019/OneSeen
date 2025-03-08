import React from 'react'
import { useParams } from 'react-router-dom'

const ViewMessage = () => {
    const {messageId}= useParams()
    console.log(messageId)
    return (
    <div>
      view message ....
    </div>
  )
}

export default ViewMessage
