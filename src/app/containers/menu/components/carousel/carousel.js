import React, { Fragment, useRef, useState, useEffect } from 'react';
import './carousel.scss';

export const Carousel = (props) => {
    const [select, setSelect] = useState('');
    const [current, setCur] = useState(0);
    const carousel = useRef(null);

    useEffect(() => {

        if (props.selectedItem) {
            const id = `${props.title}-${props.selectedItem.date}`;
            // console.log(id);
            const children = Array.from(carousel.current.children);
            // console.log(children);
            const selectItem = children.find(el => el.id === id);
            // console.log(selectItem);
            children.forEach(child => child.classList.remove('active'));
            selectItem.classList.add('active');
            onSelect(props.selectedItem);
        }
        if (props.search) {
            const children = Array.from(carousel.current.children);
            console.log(children);
            const searchItem = children.findIndex(
                (el) => el.firstChild.alt.toLowerCase().split(' ').some(word => word === props.search.toLowerCase())
                    || el.firstChild.alt.toLowerCase() === props.search.toLowerCase());
            // console.log(searchItem);
            if (searchItem !== -1) {
                children.forEach(child => child.classList.remove('active'));
                children[searchItem].classList.add('active');
            }
        }
    }, [props.search]);

    const onSelect = (item) => {
        console.log(item)
        setSelect(item.name);
        const imgs = Array.from(carousel.current.querySelectorAll('.img'));
        const img = document.getElementById(`img-${props.title}-${item.date}`);
        if (img.classList.contains('focused')) {
            img.classList.remove('focused');
        } else {
            imgs.forEach(el => el.classList.remove('focused'));
            img.classList.add('focused');
        }
        const selected = {...item, title: props.title};
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
    console.log(props);
    console.log(current)
    // onClick = {() => console.dir(carousel.current.querySelector('.active').nextSibling.innerText.split('\n')[0])}
    return (
        <Fragment>
            {props.menu.length > 0 ?
                <Fragment>
                    <div id={`carousel-menu-${props.title}`} className="carousel slide" data-ride="carousel"  data-pause = 'true'>
                        <ol className="carousel-indicators">
                            {props.menu.map((item, i) => <li key={i} data-target={`#carousel-menu-${props.title}`} data-slide-to={i} className={(i === 0)? 'active' : ''}></li>)}
                        </ol>
                        <div className="carousel-inner" ref={carousel} >
                            {props.menu.map((item, i) => {
                                return (
                                    <div key={`${props.title}-${item.date}`} className={`carousel-item ${(i === 0)? 'active' : ''}`} onClick={() => onSelect(item)} id = {`${props.title}-${item.date}`}>
                                        <img src={item.img} className="d-block w-20 img" alt={item.name} id = {`img-${props.title}-${item.date}`}/>
                                        <div className="carousel-caption d-none d-md-block description">
                                            <h5>{item.name}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {props.menu.length > 1 &&
                            <Fragment>
                                <a onClick = {() => setCur(current? current-1 : props.menu.length-1)}  className="carousel-control-prev carousel-control" href={`#carousel-menu-${props.title}`} role="button" data-slide="prev">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="arrow bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                    {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a onClick = {() => setCur(current === props.menu.length-1 ? 0 : current+1)} className="carousel-control-next carousel-control" href={`#carousel-menu-${props.title}`} role="button" data-slide="next">
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
                        {select ?
                            <h3 className='choice'>You choose: <span>{select}</span>!</h3>
                        :
                            <h3 className='choice'>{props.menu[current]?.name}</h3>
                        }
                        <button className='btn btn-warning random-button' onClick={setRandom}>Random</button>
                    </div>
                </Fragment>
                :
                <Fragment>
                    <h3>
                        No available dishes your requested
                    </h3>
                </Fragment>
            }
        </Fragment>
    );
}
