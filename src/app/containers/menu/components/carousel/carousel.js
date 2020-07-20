import React, { Fragment, useRef, useState, useEffect } from 'react';
import './carousel.scss';

export const Carousel = (props) => {
    const [select, setSelect] = useState('');
    const carousel = useRef(null);

    useEffect(() => {

        if (props.selectedMenu.length) {
            const selected = props.selectedMenu.find(el => el.type === props.type);
            console.log(selected);
            if (selected) {
                const id = `${props.type}-${selected.date}`;
                // console.log(id);
                const children = Array.from(carousel.current.children);
                // console.log(children);
                const selectItem = children.find(el => el.id === id);
                // console.log(selectItem);
                children.forEach(child => child.classList.remove('active'));
                selectItem.classList.add('active');
                onSelect(selected);
            }
        }
    }, [])

    const onSelect = (item) => {
        setSelect(item.name);
        const imgs = Array.from(carousel.current.querySelectorAll('.img'));
        const img = document.getElementById(`img-${props.type}-${item.date}`);
        if (img.classList.contains('focused')) {
            img.classList.remove('focused');
        } else {
            imgs.forEach(el => el.classList.remove('focused'));
            img.classList.add('focused');
        }
        const selected = {...item, type: props.type};
        props.onSelect(selected);
    }

    const setRandom = () => {
        const rand = Math.floor(Math.random()*props.menu.length);
        if (props.menu[rand].name === select) {
            setRandom()
        }
        const children = Array.from(carousel.current.children);
        children.forEach(child => child.classList.remove('active'));
        children[rand].classList.add('active');
        onSelect(props.menu[rand]);
    }
    return (
        <Fragment>
            <div id={`carousel-menu-${props.type}`} className="carousel slide" data-ride="carousel"  data-pause = 'true'>
                <ol className="carousel-indicators">
                    {props.menu.map((item, i) => <li key={i} data-target={`#carousel-menu-${props.type}`} data-slide-to={i} className={(i === 0)? 'active' : ''}></li>)}
                </ol>
                <div className="carousel-inner" ref={carousel}>
                    {props.menu.map((item, i) => (
                        <div key={`${props.type}-${item.date}`} className={`carousel-item ${(i === 0)? 'active' : ''}`} onClick={() => onSelect(item)} id = {`${props.type}-${item.date}`}>
                            <img src={item.img} className="d-block w-20 img" alt={item.name} id = {`img-${props.type}-${item.date}`}/>
                            <div className="carousel-caption d-none d-md-block description">
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {props.menu.length > 1 &&
                <Fragment>
                    <a className="carousel-control-prev carousel-control" href={`#carousel-menu-${props.type}`} role="button" data-slide="prev">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="arrow bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                    {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                    <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next carousel-control" href={`#carousel-menu-${props.type}`} role="button" data-slide="next">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="arrow bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                        {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                        <span className="sr-only">Next</span>
                    </a>
                </Fragment>
                }
            </div>
            <div className='centred'>
                {select && <h3 className='choice'>You choose: <span>{select}</span>!</h3>}
                <button className='btn btn-warning random-button' onClick={setRandom}>Random</button>
            </div>
        </Fragment>
    );
}