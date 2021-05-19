import React, { useState, useRef } from 'react';
import video1 from './../assets/italy.mp4';

const Drag = ({ data }) => {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const [regElem, setRegElem] = useState(0);
    const videoRef = useRef();

    const handleDragStart = (e, params) => {
        setDragging(true);
    }

    const handleTouchStart = (e, params) => {
        setDragging(true);
        var elem = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        setRegElem(elem);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e, grpIndex) => {
        let modifiedList = list;
        modifiedList.forEach((i, index) => modifiedList[index].video = false);
        modifiedList[grpIndex].video = true;

        setList(modifiedList);
        setDragging(false);
    }

    const handleTouchEnd = (e, grpIndex) => {
        var elem = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

        if (!elem.contains(videoRef.current) && regElem !== elem) {
            elem.appendChild(videoRef.current);
        }
        setDragging(false);
    }

    return (
        <div className="groups">
            {list.map((grp, grpIndex) => (
                <div
                    key={grp.title}
                    className="group"
                    onDragOver={dragging ? (e) => handleDragOver(e, grpIndex) : null}
                    onDrop={dragging ? (e) => handleDrop(e, grpIndex) : null}
                    onTouchEnd={dragging ? (e) => handleTouchEnd(e, grpIndex) : null}
                >
                    <p className="title">{grp.title}</p>
                    {grp.video ? (<div
                        ref={videoRef}
                        draggable
                        onDragStart={(e) => handleDragStart(e, { grpIndex })}
                        onTouchStart={(e) => handleTouchStart(e, { grpIndex })}
                        className='item'>
                        <video width="200" height="300" controls>
                            <source src={video1} type="video/mp4" />
                            <p>
                                Your browser does not support the video tag.
                            </p>
                        </video>
                    </div>) : null}
                </div>
            ))}
        </div>
    )
}

export default Drag;