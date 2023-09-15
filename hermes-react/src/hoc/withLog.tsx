import React, { useEffect, useContext } from 'react';
import LogContext from '../context/LogContext';

type WithLogProps = {
  customName?: string;
};

const withLog = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P & WithLogProps) => {
    const logMessagePrefix = useContext(LogContext);
    const { customName, ...rest } = props;
    const componentName = customName || WrappedComponent.name;

    useEffect(() => {
      if (logMessagePrefix) {
        console.log(`${logMessagePrefix} ${componentName}`);
      }
    }, [logMessagePrefix, componentName]);

    return <WrappedComponent {...(rest as P)} />;
  };
};

export default withLog;

