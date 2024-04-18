import React, { useState } from "react";
import Select, { components } from 'react-select';
import styles from './DropDown.module.css';

function DropDown({onSelect, options, predeterminated}) {
    const [selected, setSelected] = useState(predeterminated);

    const handeOptionChange = (option) => {
        setSelected(option);
        onSelect(option);
    };

    const Option = (props) => {
        return (
          <components.Option {...props}>
            <img src={props.data.icon} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
            {props.data.label}
          </components.Option>
        );
      };

    return(
        <div className={styles['body']}>
            <Select
                isSearchable={false}
                value={selected}
                onChange={handeOptionChange}
                options={options}
                components={{ Option }}
                getOptionLabel={(option) => (
                    <>
                      <img src={option.icon} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                      {option.label}
                    </>
                  )}
                styles={{
                    singleValue: (provided) => ({
                        ...provided,
                        color: '#ffffff',
                    }),
                    control: (provided, state) => ({
                        ...provided,
                        color: state.isSelected ? 'white' : 'black',
                        backgroundColor: 'none',
                        border: 'none',
                        width: '140px',
                        textAlign: 'left',
                        cursor: 'pointer'
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        color: '#3b4252',
                        backgroundColor: state.isSelected ? 'transparent' : provided.backgroundColor,
                        cursor: 'pointer'
                    })
                }}  
            >
            </Select>
        </div>
    )
}

export default DropDown;