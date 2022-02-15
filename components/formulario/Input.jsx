import React from 'react';
import PropTypes from 'prop-types';

import {
  InputStyled, InputEscuro, TextAreaStyled, TextAreaEscuro,
} from './InputsStyles';

export default function CampoInput({
  name, label, placeholder, handleChange, value, type, color, valido,
}) {
  switch (color) {
    case 'escuro':
      return (
        <InputEscuro
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          type={type}
          placeholder={placeholder}
          valido={valido}
        />
      );

    case 'claro':
      return (
        <InputStyled
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          type={type}
          placeholder={placeholder}
          valido={valido}
        />
      );

    case 'text':
      return (
        <TextAreaStyled
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          type={type}
          placeholder={placeholder}
          valido={valido}
          multiline
        />
      );

    case 'text/escuro':
      return (
        <TextAreaEscuro
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          type={type}
          placeholder={placeholder}
          valido={valido}
          multiline
        />
      );

    default:
      return (
        <span>Favor selecionar o estilo</span>
      );
  }
}

CampoInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  valido: PropTypes.bool.isRequired,
};
