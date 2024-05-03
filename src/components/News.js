import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  console.log(props.apiKey);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updatePage = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parseData = await data.json();
    props.setProgress(80);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `Aaj ka Samachar - ${capitalizeFirstLetter(props.category)}`;
    updatePage();
  }, [])


  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  }


  return (
    <>
      <h2 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>Aaj ka Samachar - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={ <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

export default News