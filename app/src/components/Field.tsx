// Tfield.tsx

import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Downshift from 'downshift';
import './Tfield.css';

interface TfieldProps {
    label: string;
    name: string;
    id: string;
    expandOptions?: boolean;
    ipcFunction?: string;
}

const ipcRenderer = (window as any).ipcRenderer;
const Tfield: React.FC<TfieldProps> = ({
    label,
    name,
    id,
    expandOptions = false,
    ipcFunction = '',
}) => {
    const [ field, meta, helpers ] = useField(name);
    const [ groups, setGroups ] = useState<string[]>([]);
    const [ isInputFocused, setIsInputFocused ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (ipcFunction) {
                const response = await ipcRenderer.invoke(ipcFunction);
                setGroups(response);
            }
        };

        fetchData();
    }, [ ipcFunction ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>) => {
        const inputValue = 'value' in e.target ? (e.target as HTMLInputElement).value : '';
        helpers.setValue(inputValue);
    };


    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <div className="tfield-container">
            <label htmlFor={id}>{label}</label>
            <Downshift
                onChange={(selection) => helpers.setValue(selection)}
                itemToString={(item) => (item ? item : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                }) => (
                    <div>
                        <input
                            {...getInputProps({
                                ...field,
                                id,
                                onFocus: handleInputFocus,
                                onBlur: handleInputBlur,
                                ...(!isInputFocused && { placeholder: 'Enter text...' }),
                                onChange: (e) => {
                                    handleInputChange(e);
                                    field.onChange(e);
                                },
                            })}
                        />
                        <div {...getMenuProps()}>
                            {expandOptions && isOpen ? (
                                <div className="options-menu">
                                    {groups
                                        .filter(
                                            (item) =>
                                                !inputValue ||
                                                item.toLowerCase().includes(inputValue.toLowerCase())
                                        )
                                        .map((item, index) => (
                                            <div
                                                {...getItemProps({
                                                    key: item,
                                                    index,
                                                    item,
                                                    style: {
                                                        backgroundColor:
                                                            highlightedIndex === index ? 'lightgray' : 'white',
                                                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                    },
                                                })}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}
            </Downshift>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};

export default Tfield;
