import React from 'react'

const Newsitem =(props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute', right: 0}}> 
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={!imageUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHUuHqXB2eyPpoqAfxaALuMK_IHhpVx28Qvw&s" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
