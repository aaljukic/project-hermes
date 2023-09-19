/* eslint-disable react-refresh/only-export-components */
import withLog from "../../../hoc/withLog";
import "./HermesAlert.scss"

interface HermesAlertProps {
  isActive: boolean;
  renderMessage?: (message: JSX.Element) => JSX.Element;
}

const HermesAlert = ({ isActive, renderMessage }: HermesAlertProps) => {
  const defaultMessage = <span>Sorry</span>;

  return (
    <div className={`alert alert-info ${isActive ? 'alert-show' : ''}`}>
      <i className="fa-solid fa-info" />
      <div>{renderMessage ? renderMessage(defaultMessage) : defaultMessage}, Not Implemented</div>
    </div>
  )
}

export default withLog(HermesAlert);
