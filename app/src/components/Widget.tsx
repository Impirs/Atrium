import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { drawSchedule } from "../pages/schedule";
import { draw } from '../pages/calendar_lib'
import { showBigday } from "../pages/events"; //Error
import { showProgress } from "../pages/todo";
import { Image } from "./Custom_w";
import { create } from 'domain';

interface Options {
    contains: string;
    to: string;
    size?: 'one-one' | 'one-two' | 'two-one' | 'two-two';
    event?: 'next' | 'custom';
    show?: 'tod' | 'tom' | 'tod-tom';
}

interface WidgetProps {
    options: Options;
}

interface AddBtnProps {
    imageUrl: string;
}

// Widget itself and what can it contains
const Widget: React.FC<WidgetProps> = ({ options }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(options.to);
    };

    useEffect(() => {
        const widgetContainer = document.getElementById('widget-container');

        if (!widgetContainer) return;

        if (options.contains === 'calendar' && options.size === 'two-two') {
            //showCalendar({
            draw({
                target: widgetContainer,
                type: 'month',
                highlighttoday: true,
                prevnextbutton: 'hide'
            });
        } else if (options.contains === 'calendar' && options.size === 'one-one') {
            //showCalendar({
            draw({
                target: widgetContainer,
                type: 'day',
            });
        } else if (options.contains === 'image') {
            Image({
                target: widgetContainer,
                size: options.size,
                // Не доделано, нужно добавить подкачку изображением выбором из файлов
            });
        } else if (options.contains === 'todo') {
            showProgress({
                target: widgetContainer,
                // firstly just a one-one version
            })
        } else if (options.contains === 'bigDay') {
            showBigday({
                target: widgetContainer,
                event: options.event,
            })
        } else if (options.contains === 'schedule') {
            drawSchedule({
                target: widgetContainer,
                show: options.show
            })
        }

    }, [ options ]);

    return (
        <button className="custom-widget" onClick={handleClick}>
            <div id="widget-container"></div>
        </button>
    );
};

const AddBtn: React.FC<AddBtnProps> = ({ imageUrl }) => {
    const [ isExpanded, setExpanded ] = useState(false);
    const [ options, setOptions ] = useState<Options>({
        contains: '',
        to: '',
    });

    const handleClick = () => {
        setExpanded(!isExpanded);
    };

    const choose = (newOptions: Partial<Options>) => {
        setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
    };

    return (
        <div className={`button-container ${isExpanded ? 'expanded' : ''}`}>
            <button className="round-button" onClick={handleClick}>
                <img src={imageUrl} alt="AddBtn Icon" className="aad-icon" />
            </button>
            {isExpanded && (
                <div className="expanded-content">
                    {
                        <div className="widget-menu">
                            <div className="widget-variants">
                                <button className="choose_widget" onClick={() =>
                                    choose({ contains: 'calendar', to: '../pages/Calendar' })}>
                                    <span className="widget_name">Calendar</span>
                                </button>
                                <button className="choose_widget" onClick={() =>
                                    choose({ contains: 'image', to: './Custom_w' })}>
                                    <span className="widget_name">Image</span>
                                </button>
                                <button className="choose_widget" onClick={() =>
                                    choose({ contains: 'todo', to: '../pages/Todo' })}>
                                    <span className="widget_name">To-do List</span>
                                </button>
                                <button className="choose_widget" onClick={() =>
                                    choose({ contains: 'bigDay', to: '../pages/Calendar' })}>
                                    <span className="widget_name">Big Day</span>
                                </button>
                                <button className="choose_widget" onClick={() =>
                                    choose({ contains: 'schedule', to: '../pages/schedule' })}>
                                    <span className="widget_name">Schedule</span>
                                </button>
                            </div>
                            <div className="widget-size">
                                <button className="two-two" onClick={() =>
                                    choose({ size: 'two-two' })}>
                                    <span className='size'>2x2</span>
                                </button>
                                <button className="two-one" onClick={() =>
                                    choose({ size: 'two-one' })}>
                                    <span className='size'>2x1</span>
                                </button>
                                <button className="one-two" onClick={() =>
                                    choose({ size: 'one-two' })}>
                                    <span className='size'>1x2</span>
                                </button>
                                <button className="one-one" onClick={() =>
                                    choose({ size: 'one-one' })}>
                                    <span className='size'>1x1</span>
                                </button>
                            </div>
                            <button className='create_btn' onClick={create}>
                                <span className='create_span'>Create</span>
                            </button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};


export { Widget, AddBtn };