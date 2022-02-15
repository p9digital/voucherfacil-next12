/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SelectStyled, SelectEscuro } from './InputsStyles';

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
  display: flex;
  position: relative;
  width: ${(props) => (props.medium ? '65%' : (props.tiny) ? '30%' : 'none')};
`;

export default function Select({
  name,
  label,
  placeholder,
  handleChange,
  value,
  type,
  color,
  options,
  valido,
  simpleValue,
  medium,
  tiny,
  groups,
  groupsFiltrado,
}) {
  switch (color) {
    case 'escuro':
      return (
        <>
          {!simpleValue ? (
            <SelectWrapper>
              <SelectEscuro
                name={name}
                aria-label={label}
                onChange={handleChange}
                value={value}
                type={type}
                valido={valido}
                medium={medium}
                tiny={tiny}
                disabled={options.length < 1}
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

              </SelectEscuro>
              <ArrowSelect color="#fff" />
            </SelectWrapper>

          ) : (
            <SelectWrapper>
              <SelectEscuro
                name={name}
                aria-label={label}
                onChange={handleChange}
                value={value}
                type={type}
                valido={valido}
                medium={medium}
                tiny={tiny}
                disabled={options.length < 1}
              >
                <option>{placeholder}</option>
                {options.map((item, i) => (
                  <option value={item} key={`${item}-${i}`}>{item}</option>
                ))}
              </SelectEscuro>
              <ArrowSelect color="#fff" />
            </SelectWrapper>
          )}
        </>
      );

    case 'claro':
      return (
        <>
          {!simpleValue ? (
            <SelectWrapper
              medium={medium}
              tiny={tiny}
            >
              <SelectStyled
                name={name}
                aria-label={label}
                onChange={handleChange}
                value={value}
                type={type}
                valido={valido}
                disabled={options.length < 1}
              >
                <option>{placeholder}</option>
                {options.map((item) => (
                  <option value={item.value} key={item.value}>{item.name}</option>
                ))}
              </SelectStyled>
              <ArrowSelect color="#333" />
            </SelectWrapper>

          ) : (
            <SelectWrapper
              medium={medium}
              tiny={tiny}
            >
              <SelectStyled
                name={name}
                aria-label={label}
                onChange={handleChange}
                value={value}
                type={type}
                valido={valido}
                disabled={options.length < 1}
              >
                <option>{placeholder}</option>
                {options.map((item) => (
                  <option value={item} key={item}>{item}</option>
                ))}
              </SelectStyled>
              <ArrowSelect color="#333" />
            </SelectWrapper>
          )}
        </>

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
  value: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  valido: PropTypes.bool.isRequired,
  simpleValue: PropTypes.bool,
  medium: PropTypes.bool,
  tiny: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.object),
  groupsFiltrado: PropTypes.bool,
};

Select.defaultProps = {
  simpleValue: false,
  medium: false,
  tiny: false,
  groups: [],
  groupsFiltrado: false,
};
