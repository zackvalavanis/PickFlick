import { useAuth } from "../Auth/useAuth"

export function Profile() {
  const { user } = useAuth()

  console.log(user)
  return (

    <>
      <h1>
        {user?.first_name}
      </h1>
    </>
  )
}