import Image from "next/image";
import Link from "next/link";
const Cart = ({ src, desc }) => {
  const stars = 5;
  const rating = 4.5;

  const starPercentage = `${(rating / stars) * 100}%`;

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-2">
        <Image
          className="card-img-top mx-auto"
          width={239}
          height={170}
          src={src}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{desc}</a>
          </h5>

          <div className="ratings mt-auto mb-3">
            <p className="card-text">
              <b>$12</b> / night
            </p>

            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">(5 Reviews)</span>
          </div>

          <Link href="/">
            <a className="btn btn-block view-btn text-light">View Details</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
