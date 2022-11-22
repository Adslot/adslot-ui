const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'AdslotUI';

const invariant = (condition, message) => {
  if (!isProduction && !condition) {
    throw new Error(`${prefix} ${message}`);
  }
};

export default invariant;
