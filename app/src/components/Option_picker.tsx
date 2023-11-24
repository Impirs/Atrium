import React, { useState } from 'react';

interface OptionsPickerProps {
    onSelectOptions: (options: Options) => void;
}

interface Options {
    requiredOption: string;
    optionalOption1?: string;
    optionalOption2?: string;
}

const OptionsPicker: React.FC<OptionsPickerProps> = ({ onSelectOptions }) => {
    const [ options, setOptions ] = useState<Options>({
        requiredOption: '',
        optionalOption1: '',
        optionalOption2: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOptions((prevOptions) => ({ ...prevOptions, [ name ]: value }));
    };

    const handleSelectOptions = () => {
        onSelectOptions(options);
    };

    return (
        <div>
            <label>
                Required Option:
                <input
                    type="text"
                    name="requiredOption"
                    value={options.requiredOption}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Optional Option 1:
                <input
                    type="text"
                    name="optionalOption1"
                    value={options.optionalOption1}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Optional Option 2:
                <input
                    type="text"
                    name="optionalOption2"
                    value={options.optionalOption2}
                    onChange={handleInputChange}
                />
            </label>

            <button onClick={handleSelectOptions}>Select Options</button>
        </div>
    );
};

export default OptionsPicker;
