import { createContext } from 'react';

const LogContext = createContext<string | null>(null);

export default LogContext;
