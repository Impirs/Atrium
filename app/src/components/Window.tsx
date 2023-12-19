import React, { useRef, useEffect } from 'react';
import './css/Window.css';

interface FloatingWindowProps {
    contentRenderer: () => React.ReactNode;
    cssFile: string;
    onClose: (data: any) => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({
    contentRenderer,
    cssFile,
    onClose,
}) => {
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (windowRef.current) {
                const offsetX = e.clientX - windowRef.current.getBoundingClientRect().left;
                const offsetY = e.clientY - windowRef.current.getBoundingClientRect().top;

                windowRef.current.style.left = `${e.clientX - offsetX}px`;
                windowRef.current.style.top = `${e.clientY - offsetY}px`;
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        if (windowRef.current) {
            windowRef.current.addEventListener('mousedown', () => {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            });
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleCreateButtonClick = () => {
        // Допустим, что здесь вы генерируете какие-то данные из вашего контента
        const data = { example: 'data' };

        // Закрыть окно и передать данные в родительский компонент
        onClose(data);
    };

    return (
        <div ref={windowRef} className={`floating-window ${cssFile}`}>
            <div className="window-header">Drag me</div>
            <div className="window-content">{contentRenderer()}</div>
            <div className="window-footer">
                <button onClick={handleCreateButtonClick}>Create</button>
            </div>
        </div>
    );
};

export default FloatingWindow;
