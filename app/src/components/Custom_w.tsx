import React from "react"

interface ImageProps {
    target?: HTMLElement,
    size?: string, // Не доделано
    imageUrl?: string, // Не доделано, нужно добавить подкачку изображением выбором из файлов
}

const Image: React.FC<ImageProps> = ({ target, size, imageUrl }) => {

    // DEFAULT
    imageUrl = '../../assets/error';

    return (
        <div className="image">
            <img src={imageUrl} alt="this_image" className="image" />
        </div>
    );
}

export { Image };