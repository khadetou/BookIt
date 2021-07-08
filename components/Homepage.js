import Cart from "./subcomponents/Cart";
const Homepage = () => {
  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

      <a href="#" className="ml-2 back-to-search">
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      <div className="row">
        <Cart
          src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960"
          desc="Charming Studio < 10 Miles to Wells' Beaches!"
        />
        <Cart
          src="https://a0.muscache.com/im/pictures/2121b1e3-1d2b-4824-9268-eba1e593bc28.jpg?im_w=720"
          desc="Picturesque 2-Story Farmhouse w/Private Hot Tub"
        />
        <Cart
          src="https://a0.muscache.com/im/pictures/4599de32-549f-4125-8c93-ef99ce5b4cb0.jpg?im_w=720"
          desc="Downtown Portsmouth Private Getaway! Hot Tub"
        />
        <Cart
          src="https://a0.muscache.com/im/pictures/70d71940-9610-46b8-b028-cc190bbfe6e9.jpg?im_w=960"
          desc="Spacious Suite in a quiet Boston neighborhood."
        />
      </div>
    </section>
  );
};

export default Homepage;
