import { Link } from "react-router-dom"

export default function Error() {
  return (
    <>
      <h1 style={{ display: "flex", alignContent: 'center' }}>404</h1>
      <Link to='/'>Back to Main</Link>
    </>
  )
}
