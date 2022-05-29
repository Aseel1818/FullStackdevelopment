import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
 64  
frontend/src/components/Rating.js
@@ -0,0 +1,64 @@
function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? 'fas fa-star'
              : rating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fas fa-star'
              : rating >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fas fa-star'
              : rating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fas fa-star'
              : rating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fas fa-star'
              : rating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span> {numReviews} reviews</span>
    </div>
  );
}
export default Rating;
