import React, { useState,useEffect} from 'react';
import { Link} from'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../Actions';
import Rating from '../components/Rating'

function HomeScreen(props){

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList =   useSelector((state) => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    // dispatch(listProducts());
    return () => {
      //
    }
  }, [category])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

    return(
    <div><br/>
      {category && <h2>{category}</h2>}

<ul className="filter">
  <li>
    <form onSubmit={submitHandler}>
      <input
        name="searchKeyword"
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  </li>
  <li>
    Sort By{' '}
    <select name="sortOrder" onChange={sortHandler}>
      <option value="">Newest</option>
      <option value="lowest">Highest</option>
      <option value="highest">Lowest</option>
    </select>
  </li>
</ul>
     <div>
       {/* <img className="saree" src='/images/summerCollection1.jpg' /> */}
       <section class="slider2 cid-skRS7ouhNy" id="slider2-4"> 
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10">
                <div class="carousel slide" id="skRShwNwVW" data-interval="5000">
                    
                    <ol class="carousel-indicators">
                        <li data-slide-to="0" class="active" data-target="#skRShwNwVW"></li>
                        <li data-slide-to="1" data-target="#skRShwNwVW"></li>
                        <li data-slide-to="2" data-target="#skRShwNwVW"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item slider-image item active">
                            <div class="item-wrapper">
                                <img class="d-block w-100" src="/images/b1.png"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5 class="mbr-section-subtitle mbr-fonts-style display-5">
                                        {/* <strong>Fixed-Height Slider</strong> */}
                                    </h5>
                                    {/* <p class="mbr-section-text mbr-fonts-style display-7">
                                        Click on the image to edit slides.</p> */}
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item slider-image item">
                            <div class="item-wrapper">
                                <img class="d-block w-100" src="/images/b2.png"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5 class="mbr-section-subtitle mbr-fonts-style display-5">
                                        {/* <strong>Fixed-Height Slider</strong> */}
                                    </h5>
                                    {/* <p class="mbr-section-text mbr-fonts-style display-7">
                                        Click on the image to edit slides.</p> */}
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item slider-image item">
                            <div class="item-wrapper">
                                <img class="d-block w-100" src="/images/b3.png"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5 class="mbr-section-subtitle mbr-fonts-style display-5">
                                        {/* <strong>Fixed-Height Slider</strong> */}
                                    </h5>
                                    {/* <p class="mbr-section-text mbr-fonts-style display-7">
                                        Click on the image to edit slides.</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control carousel-control-prev" role="button" data-slide="prev" href="#skRShwNwVW">
                        <span class="mobi-mbri mobi-mbri-arrow-prev" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control carousel-control-next" role="button" data-slide="next" href="#skRShwNwVW">
                        <span class="mobi-mbri mobi-mbri-arrow-next" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section><br/>
     </div>
     <h1><center>Shop by Category</center></h1>
    {loading ? (<div>Loading...</div>):
    error ? (<div>{error}</div>):
        (<div> <ul className="products">
          { 
            products.map((product) => (
            <li key={product._id}>
                <div className="product">
                  <div className="card">
                  <Link to={'/product/'+product._id}>
                    <img className="product-image" src={product.image} alt="product" />
                  </Link>
                  <div className="container1">
                  <div className="product-name">
                    <Link to={'/product/'+product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
                  </div>
                  </div>
                </div>
            </li>
            ))
          }
          </ul></div>)}
    </div>
    
    );
} 

export default HomeScreen;