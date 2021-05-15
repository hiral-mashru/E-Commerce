import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from'react-router-dom';
import { detailsProduct,saveProductReview } from '../Actions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../Constants'

function ProductScreen(props){
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector(state=> state.productDetails);
    const {product,loading,error} = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    const dispatch = useDispatch();
    console.log("product: ",product)
    useEffect(() => {
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [productSaveSuccess])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
          })
        );
    };

    const handleAddToCart = () => {
        props.history.push("/cart/"+props.match.params.id + "?qty="+qty)
    }

    // console.log(props.match.params.id)
    // const product = data.products.find(x => x._id === props.match.params.id);
    // console.log(product)
    return (<div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :<div>
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className="card7">
            <div className="card5">
            <div className="container1">
            <div className="details-info"><br/>
                <ul>
                    {/* <li>{product.review}</li> */}
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        <a href="#reviews">
                            <Rating
                            value={product.rating}
                            text={product.numReviews + ' reviews'}
                            />
                        </a>
                    </li>
                    <li>
                        <b>Price: </b><b>{product.price}</b>
                    </li>
                    <li>
                        Description:
                        {product.description}
                    </li>
                </ul>
            </div>
            </div></div><br></br>
            <div className="content-margined">
            
            {/* {!(product.reviews.length) && <div>There is no review</div>} */}
            <ul className="review" id="reviews">
            <div className="reviews"><br></br>
            <h2><center>Reviews</center></h2>
            {!(product.reviews) ? <div><center>There is no review</center></div> : <div>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div className="reviewName">
                  <div><b><u>{review.name}</u></b></div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                  </div><br></br>
                </li>
              ))} </div>
            }
            </div>
              <li>
                
              </li>
            </ul>
          </div>
          </div>
            
            <div className="details-action"><br/>
            <div className="detail-action">
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.countInStock > 0 ? "In stock" : "Out of stock"}
                    </li>
                    <li>
                        Qty: <select value={qty} onChange={(e)=> {setQty(e.target.value)}}>
                            {[...Array(product.countInStock).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>
                            )}
                        </select>
                    </li>
                    <li>
                        {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                        }
                    </li>
                </ul>
                </div>
            <ul className="review" id="reviews">
            <div ><br></br>
            {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container2"><br></br>
                    <h2><center>Write a customer review</center></h2>
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
                </div>
                </ul>
                </div>
            </div>
        {/* </div> */}
        </div>
        }
    </div>);
} 

export default ProductScreen;