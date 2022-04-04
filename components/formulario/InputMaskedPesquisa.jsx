/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';

import { InputStyledPesquisa } from './InputsStyles';
import Icon from '../ui/Icon';

export default function CampoInputMasked({
  name, label, placeholder, handleChange, value, type, mask, valido, icone, required
}) {
  return (
    <CampoWrapper>
      <IconPesquisa
        icon={icone}
        tamanho="16px"
        cor="#333333"
      />
      <MaskedInput
        name={name}
        aria-label={label}
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
        mask={mask}
        render={(ref, props) => <InputStyledPesquisa ref={ref} {...props} />}
        guide={false}
        valido={valido}
        icone={icone}
        required={required}
      />
    </CampoWrapper>
  );
}

const CampoWrapper = styled.div`
  display:flex;
  position:relative;
`;

const IconPesquisa = styled(Icon)`
  left:5px;
  position:absolute;
  top:15px;
`;

CampoInputMasked.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  mask: PropTypes.any.isRequired,
  valido: PropTypes.bool.isRequired,
  icone: PropTypes.string,
  required: PropTypes.bool
};

CampoInputMasked.defaultProps = {
  icone: "",
  required: false
};
