import axios from "axios"
import { useState } from "react"

const Comment = ({ user, thread }) => {
  return (
    <div className="border p-2 rounded bg-gray-50">
      <p className="font-medium text-sm text-blue-600">
        {user?.username || "Unknown User"}
      </p>
      <p className="text-gray-700">{thread}</p>
    </div>
  )
}

export default Comment
