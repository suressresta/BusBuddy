function Section() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "15px",
          backgroundColor: "#e5e5e5",
          color: "grey",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-4 col-md-6">
              <div>
                <div className="cityBus">
                  <h4
                    style={{
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Bus Hire Cities
                  </h4>
                </div>

                <ul className="list-unstyled ">
                  <li>
                    <p className="text-decoration-none">
                      Bus Hire in Kathmandu
                    </p>
                  </li> 
                  <li>
                    <p className="text-decoration-none">
                      Bus Hire in Bhaktapur
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">Bus Hire in Chitwan</p>
                  </li>
                  <li>
                    <p className="text-decoration-none">Bus Hire in Pokhara</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div>
                <h4 style={{ visibility: "collapse" }}>Bus Hire Cities</h4>
                <ul className="list-unstyled">
                  <li>
                    <p className="text-decoration-none">Bus Hire in Jhapa</p>
                  </li>
                  <li>
                    <p className="text-decoration-none ">Bus Hire in Dharan</p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Bus Hire in Nepalgunj
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">Bus Hire in Lalitpur</p>
                  </li>
                </ul>
              </div>
            </div>
            {/*<div className="col-xl-3 col-lg-3 col-md-6">
              <div>
                <h4 style={{ color: "black" }}>Tempo Traveller in Cities</h4>
                <ul className="list-unstyled">
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Banglore
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Ahmedabad
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Coimbatore
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Vadodara
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div>
                <h4 style={{ visibility: "collapse", marginBottom: "-30px" }}>
                  Tempo travellers in other cities
                </h4>
                <ul className="list-unstyled">
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Banglore
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Ahmedabad
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Coimbatore
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none">
                      Tempo travellers in Vadodara
                    </p>
                  </li>
                </ul>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </>
  );
}
export default Section;
