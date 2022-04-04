import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputStyledPesquisa } from './InputsStyles';
import Icon from '../ui/Icon';

export default function InputPesquisa({
  name, label, placeholder, handleChange, value, type, valido, icone, required
}) {
  return (
    <CampoWrapper>
      <IconPesquisa
        icon={icone}
        tamanho="16px"
        cor="#333333"
      />
      <InputStyledPesquisa
        name={name}
        aria-label={label}
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
        valido={valido}
        icone={icone}
        required={required}
      />
    </CampoWrapper>
  );
}

const CampoWrapper = styled.div`
  position:relative;
`;

const IconPesquisa = styled(Icon)`
  left:5px;
  position:absolute;
  top:15px;
`;

InputPesquisa.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  valido: PropTypes.bool.isRequired,
  icone: PropTypes.string,
  required: PropTypes.bool
};

InputPesquisa.defaultProps = {
  icone: "",
  required: false
};
