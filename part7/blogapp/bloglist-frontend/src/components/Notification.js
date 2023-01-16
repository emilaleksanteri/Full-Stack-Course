import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.type === 'success') {
    return (
      <p className="text-4xl text-zinc-900 border-2 border-green-400 bg-green-400 p-4 text-center m-2 rounded-md font-extrabold">
        {notification.notification}
      </p>
    )
  }

  if (notification.type === 'error') {
    return (
      <p className="text-4xl text-zinc-900 border-2 border-rose-400 bg-rose-400 p-4 text-center m-2 rounded-md font-extrabold">
        {notification.notification}
      </p>
    )
  }
}

export default Notification
