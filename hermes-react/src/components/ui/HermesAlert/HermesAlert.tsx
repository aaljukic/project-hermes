/* eslint-disable react-refresh/only-export-components */
import withLog from "../../../hoc/withLog";
import "./HermesAlert.scss"

interface HermesAlertProps {
  isActive: boolean;
  message: string;
}

const HermesAlert = ({ isActive, message }: HermesAlertProps) => {
  return (
    <div className={`alert alert-info ${isActive ? 'alert-show' : ''}`}>
      <i className="fa-solid fa-info" />
      <div>{message}, Not Implemented</div>
    </div>
  )
}

export default withLog(HermesAlert);
