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
          <strong>RK Institute of Medical Science and Research Center</strong>{" "}
          (sometimes abbreviated as RKIAMS Research Center) is located in Uttar
          Pradesh, India. It operates under the <strong>R. K.</strong> Group of
          Institutions and the Shambhu Narain Foundation Charitable Trust,
          offering medical, paramedical, and allied health programs
        </p>
        <p>
          Provides courses in areas such as BAMS (Ayurvedic Medicine), pharmacy,
          paramedical sciences, nursing, and technical diplomas.
        </p>
        <p>
          Approved by national bodies like PCI (Pharmacy Council of India), INC
          (Indian Nursing Council), and NCISM (National Commission for Indian
          System of Medicine); affiliated with relevant universities, for
          instance MJP Rohilkhand University for Ayurvedic programs
        </p>
        <p>
          The campus is described as a lush green, pollution-free environment,
          spread over multiple acres with modern academic and medical
          infrastructure
        </p>
        <p>
          Facilities include well-equipped laboratories, seminar halls, internet
          enabled libraries, and an herbal/medicinal garden. A clean, green
          campus with student support services like transport, security, café,
          banking, and round the clock electricity and water supply is
          emphasized
        </p>
      </div>
    </div>
  );
};

export default Biography;
