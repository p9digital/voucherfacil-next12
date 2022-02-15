/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { InputStyled, InputEscuro } from './InputsStyles';

export default function Select({
  name, label, placeholder, handleChange, value, type, color, mask, valido,
}) {
  switch (color) {
    case 'escuro':
      return (
        <MaskedInput
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          type={type}
          placeholder={placeholder}
          mask={mask}
          render={(ref, props) => <InputEscuro ref={ref} {...props} />}
          guide={false}
          valido={valido}
        />
      );

    case 'claro':
      return (
        <MaskedInput
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          type={type}
          placeholder={placeholder}
          mask={mask}
          render={(ref, props) => <InputStyled ref={ref} {...props} />}
          guide={false}
          valido={valido}
        />
      );

    default:
      return (
        <span>Favor selecionar o estilo</span>
      );
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  mask: PropTypes.any.isRequired,
  valido: PropTypes.bool.isRequired,
};
