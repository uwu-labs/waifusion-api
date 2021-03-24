const debug = (service: string, ...logItems: any) => {
  console.error(`${service} |`, ...logItems);
};

const error = (...logItems: any) => {
  console.error("ERROR |", ...logItems);
};

export { debug, error };
