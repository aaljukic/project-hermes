/* eslint-disable react-refresh/only-export-components */
import withLog from '../../../../hoc/withLog';
import './HermesSkeletonText.scss'


interface HermesSkeletonTextProps {
  width: string;
  height: string;
}

const HermesSkeletonText = ({ width, height }: HermesSkeletonTextProps) => {
  return (
    <div className="skeleton-text" style={{ width, height }}>
    </div>
  );
};

export default withLog(HermesSkeletonText);