export const generateOTP = (length = 6) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * Math.pow(10, length - 1)
  ).toString();
};

export const getOTPExpiry = (minutes) => {
  return Date.now() + minutes * 60 * 1000;
};

export const isOTPExpired = (expiryTime) => {
  return Date.now() > expiryTime;
};
