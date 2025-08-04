import React from 'react'


const NewsItem = (props) => {
  
    let {title, description,imageUrl,newsUrl,author,date} = props;
    return (
      <div>
       
        <div className="card" style={{width: "18rem"}}>
        
        
  <img src={imageUrl?imageUrl:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8="} className="card-img-top" alt="..."/>
  <div className="card-body">
  
    <h5 className="card-title">{title}  </h5>
    <p className="card-text">{description}</p> 
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a rel='noopener' href={newsUrl} className="btn btn-dark" target='_blank'>Read More</a>
  </div>
</div>

      </div>
      
    )
  
}
export default NewsItem
