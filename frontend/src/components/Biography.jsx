import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="biography container">
      <div className="banner">
        <img src={imageUrl} alt="about-Img" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias culpa
          harum facilis, quia voluptatum a vero quasi dolorem sapiente, rerum
          fuga accusantium placeat natus. Cumque fuga autem perferendis dolore
          labore.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione,
          suscipit!
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
          obcaecati sed aut.
        </p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
};

export default Biography;
