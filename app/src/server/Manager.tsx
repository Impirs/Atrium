import React, { useState } from 'react';

interface ItemManagerProps { }

const ItemManager: React.FC<ItemManagerProps> = () => {
    const [ itemIds, setItemIds ] = useState<number[]>([ 1, 2, 3, 4, 5 ]);
    const [ itemName, setItemName ] = useState<string>('');
    const [ itemDescription, setItemDescription ] = useState<string>('');

    const handleAddItem = () => {
        const newItemId = Date.now();
        setItemIds([ ...itemIds, newItemId ]);
        setItemName('');
        setItemDescription('');
    };

    const handleRemoveItem = (itemId: number) => {
        const updatedItemIds = itemIds.filter((id) => id !== itemId);
        setItemIds(updatedItemIds);
    };

    return (
        <div>
            <h2>Управление элементами:</h2>

            <ul>
                {itemIds.map((itemId) => (
                    <li key={itemId}>
                        Элемент {itemId}
                        <button onClick={() => handleRemoveItem(itemId)}>Удалить</button>
                    </li>
                ))}
            </ul>

            <h3>Добавить новый элемент:</h3>
            <label>
                Название:
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Описание:
                <input
                    type="text"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleAddItem}>Добавить элемент</button>
        </div>
    );
};

export default ItemManager;
