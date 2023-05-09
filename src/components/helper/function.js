
export function isValidProxyFormat(proxy) {
  const proxyRegex = /^(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/; // Regex pattern for IP address and port number format

  return proxyRegex.test(proxy);
}
export const checkDuplicate = (data, newItem) => {
  const foundIndex = data.findIndex(item => item.ip_address === newItem.ip_address);
  return foundIndex;
};
