import React from 'react'
import {
  Image,
} from "cloudinary-react";
import PropTypes from 'prop-types'

const PayerLogo = ({uri}) => {
    const publicId = uri;
    return (
      <div className="w-100 d-inline-block">
        <Image width="100" publicId={publicId} crop="scale" />
      </div>
    );
}


export default PayerLogo

PayerLogo.propTypes = {
    uri: PropTypes.string,
}