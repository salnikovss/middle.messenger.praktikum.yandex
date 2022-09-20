declare module '*.hbs' {
  const value: (context?: Record<string, unknown>) => string;
  export default value;
}
