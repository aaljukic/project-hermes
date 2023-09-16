/* eslint-disable react-refresh/only-export-components */
import withLog from "../../hoc/withLog";
import "./Hermes404.scss"

const Hermes404 = () => {
  return (
    <div className="error-page">404 Page Not Found</div>
  )
}

export default withLog(Hermes404);