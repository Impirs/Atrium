import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { drawCalendar } from "../pages/dyncal";
import { showImage } from "./Custom_w";
import { showProgress } from "../pages/Todo";
import { showWhatLeft } from "../pages/dyncal";
import { showSchedule } from "../pages/schedule";
import { create } from 'domain';

interface WidgetProps {
    contains: string,
    to: string,
    size?: 'one-one' | 'one-two' | 'two-one' | 'two-two',
    event?: 'next' | 'custom',
    show?: 'tod' | 'tom' | 'tod-tom',
}

interface AddBtnProps {
    imageUrl: string;
}

// Widget itself and what can it contains
const Widget: React.FC<WidgetProps> = ({ contains, to, size, event, show }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    useEffect(() => {
        const widgetContainer = document.getElementById('widget-container');

        if (!widgetContainer) return;

        if (contains === 'calendar' && size === 'two-two') {
            drawCalendar({
                target: widgetContainer,
                type: 'month',
                highlighttoday: true,
                prevnextbutton: 'hide'
            });
        } else if (contains === 'calendar' && size === 'one-one') {
            drawCalendar({
                target: widgetContainer,
                type: 'day',
            });
        } else if (contains === 'image') {
            showImage({
                target: widgetContainer,
                size: size,
            });
        } else if (contains === 'todo') {
            showProgress({
                target: widgetContainer,
                // firstly just a one-one version
            })
        } else if (contains === 'daysTill') {
            showWhatLeft({
                target: widgetContainer,
                event: event,
            })
        } else if (contains === 'schedule') {
            showSchedule({
                target: widgetContainer,
                show: show
            })
        }

    }, [ contains, size ]);

    return (
        <button className="custom-widget" onClick={handleClick}>
            <div id="widget-container"></div>
        </button>
    );
};

const AddBtn: React.FC<AddBtnProps> = ({ imageUrl }) => {
    const [ isExpanded, setExpanded ] = useState(false);

    const handleClick = () => {
        setExpanded(!isExpanded);
    };

    const choose = () => {

    }

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
                                <button className="choose_widget" onClick={choose}>
                                    <span className="widget_name">Calendar</span>
                                </button>
                                <button className="choose_widget" onClick={choose}>
                                    <span className="widget_name">Image</span>
                                </button>
                                <button className="choose_widget" onClick={choose}>
                                    <span className="widget_name">To-do List</span>
                                </button>
                                <button className="choose_widget" onClick={choose}>
                                    <span className="widget_name">Big Day</span>
                                </button>
                                <button className="choose_widget" onClick={choose}>
                                    <span className="widget_name">Schedule</span>
                                </button>
                            </div>
                            <div className="widget-size">
                                <button className="two-two" onClick={choose}>
                                    <span className='size'>2x2</span>
                                </button>
                                <button className="two-one" onClick={choose}>
                                    <span className='size'>2x1</span>
                                </button>
                                <button className="one-two" onClick={choose}>
                                    <span className='size'>1x2</span>
                                </button>
                                <button className="one-one" onClick={choose}>
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