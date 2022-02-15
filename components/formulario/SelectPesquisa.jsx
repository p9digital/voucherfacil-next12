/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../ui/Icon';

import { SelectStyledPesquisa } from './InputsStyles';

export default function SelectPesquisa({
  name,
  label,
  placeholder,
  handleChange,
  value,
  type,
  options,
  valido,
  simpleValue,
  medium,
  tiny,
  groups,
  groupsFiltrado,
  icone
}) {
  return (
    <>
      {!simpleValue ? (
        <SelectWrapper>
          <IconPesquisa
            icon={icone}
            tamanho="16px"
            cor="#333333"
          />
          <SelectStyledPesquisa
            name={name}
            aria-label={label}
            onChange={handleChange}
            value={value}
            type={type}
            valido={valido}
            medium={medium}
            tiny={tiny}
            disabled={options.length < 1}
            icone={icone}
          >
            <option>{placeholder}</option>

            {!groupsFiltrado && groups.length > 1 && name === 'unidade' && (
              <>
                {groups.map((group) => (
                  <optgroup label={group.nome} key={group.id}>
                    {options.length ? (
                      options.map((item) => {
                        if (group.id === item.uf) {
                          return (
                            <option disabled={name === 'unidade' ? !(item.limite >= 1) : false} key={item.value} value={item.value}>
                              {item.name}
                            </option>
                          );
                        }
                      })
                    ) : (
                      <option disabled>Buscando...</option>
                    )}
                  </optgroup>
                ))}
              </>
            )}

            {(groupsFiltrado || groups.length <= 1) && (
              <>
                {options.map((item) => (
                  <option disabled={name === 'unidade' ? !(item.limite >= 1) : false} value={item.value} key={item.value}>{item.name}</option>
                ))}
              </>
            )}

          </SelectStyledPesquisa>
          <ArrowSelect color="#fff" />
        </SelectWrapper>

      ) : (
        <SelectWrapper>
          <IconPesquisa
            icon={icone}
            tamanho="18px"
            cor="#333333"
          />
          <SelectStyledPesquisa
            name={name}
            aria-label={label}
            onChange={handleChange}
            value={value}
            type={type}
            valido={valido}
            medium={medium}
            tiny={tiny}
            disabled={options.length < 1}
            icone={icone}
          >
            <option>{placeholder}</option>
            {options.map((item, i) => (
              <option value={item} key={`${item}-${i}`}>{item}</option>
            ))}
          </SelectStyledPesquisa>
          <ArrowSelect color="#fff" />
        </SelectWrapper>
      )}
    </>
  );
}

const ArrowSelect = styled.div`
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  position: absolute;
  border-top: 6px solid ${(props) => props.color};
  right: 20px;
  top: 45%;
`;

const SelectWrapper = styled.div`
  position: relative;
  width:100%;
`;

const IconPesquisa = styled(Icon)`
  left:5px;
  position:absolute;
  top:15px;
`;

SelectPesquisa.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  valido: PropTypes.bool.isRequired,
  icone: PropTypes.string,
  simpleValue: PropTypes.bool,
  medium: PropTypes.bool,
  tiny: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.object),
  groupsFiltrado: PropTypes.bool,
};

SelectPesquisa.defaultProps = {
  simpleValue: false,
  icone: null,
  medium: false,
  tiny: false,
  groups: [],
  groupsFiltrado: false,
};
