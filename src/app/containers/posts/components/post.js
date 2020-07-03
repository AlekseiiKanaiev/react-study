import React from 'react';

export const Post = (props) => {
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.post.title}</h5>
                {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Переход куда-нибудь</a> */}
            </div>
        </div>
    );
}