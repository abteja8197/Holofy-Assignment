import React, { useState, useRef } from 'react';
import video1 from './../assets/italy.mp4';

const Drag = ({ data }) => {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        })
    }
    const handleDragEnd = (e, params) => {
        dragNode.current.removeEventListener('dragend', handleDragEnd);

        dragItem.current = null;
        dragNode.current = null;
        setDragging(false);
    }
    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpIndex].items.splice(params.itemIndex, 0, newList[currentItem.grpIndex].items.splice(currentItem.itemIndex, 1)[0])
                dragItem.current = params;
                return newList;
            })
        }
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grpIndex === params.grpIndex && currentItem.itemIndex === params.itemIndex) {
            return 'current item'
        } else {
            return 'item'
        }
    }

    return (
        <div className="groups">
            {list.map((grp, grpIndex) => (
                <div
                    key={grp.title}
                    className="group"
                    onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpIndex, itemIndex: 0 }) : null}
                >
                    <p className="title">{grp.title}</p>
                    {grp.items.map((item, itemIndex) => (
                        <div
                            key={item}
                            draggable
                            onDragStart={(e) => handleDragStart(e, { grpIndex, itemIndex })}
                            onDragEnter={dragging ? (e) => handleDragEnter(e, { grpIndex, itemIndex }) : null}
                            className={dragging ? getStyles({ grpIndex, itemIndex }) : 'item'}>
                            <video width="200" height="300" controls>
                                <source src={video1} type="video/mp4" />
                                <p>
                                    Your browser does not support the video tag.
                                </p>
                            </video>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Drag;