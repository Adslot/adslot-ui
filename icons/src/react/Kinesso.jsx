import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgKinesso = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22.371 22.371"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="m17 8.088 1.425-2.467 3.214 5.566-1.421 2.469L17 8.088zm-.586 12.158h-2.849l3.212-5.564h2.849l-3.212 5.563zm-4.865-2.707 3.3-5.719 1.425 2.468-3.3 5.72-1.425-2.47zm-5.592 2.706-1.425-2.468h6.426l1.424 2.468H5.957zM.728 11.188 2.153 8.72l3.214 5.563-1.424 2.463-3.215-5.558zm5.228-9.055h2.849L5.593 7.696H2.746l3.21-5.564zm3.44.238 1.425 2.468-3.3 5.72L6.096 8.09l3.3-5.72zm8.529 2.86L16.5 7.698H9.9l1.424-2.468 6.601.001zm-4.361 3.1h2.849l3.258 5.643.046.078h-2.848l-.046-.078-3.259-5.643zm-4.029 5.716-1.651-2.86 1.651-2.86h3.3l1.651 2.86-1.65 2.86H9.535zm-3.578 0-3.3-5.722H5.5l3.3 5.721H5.957zm-.091.633h6.606l-1.424 2.466-6.6-.008 1.418-2.459zM16.414 2.13 17.839 4.6h-6.427L9.987 2.131h6.427zm.364-.63H5.593L0 11.184l5.592 9.685h11.186l5.593-9.687-5.593-9.682z" />
    </svg>
  );
};

SvgKinesso.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgKinesso.displayName = 'Kinesso';
export default SvgKinesso;
