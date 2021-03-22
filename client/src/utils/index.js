import PropTypes from "prop-types";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const percentSavings = (newPrice, oldPrice) => {
  const ratio = ((oldPrice - newPrice) / oldPrice) * 100;
  return Math.round(ratio);
};

percentSavings.propTypes = {
  newPrice: PropTypes.number,
  oldPrice: PropTypes.number,
}

export const searchFilter = (str, query) => {
  return str.toLowerCase().includes(query.toLowerCase());
};

searchFilter.propTypes = {
  str: PropTypes.string,
  query: PropTypes.string,
};
