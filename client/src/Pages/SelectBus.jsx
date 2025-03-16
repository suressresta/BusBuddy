import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Styles/selectbus.module.css";
import axios from "axios";
import { AiTwotoneStar } from "react-icons/ai";
import { BiArrowFromLeft } from "react-icons/bi";
import { saveDatafilter } from "../Redux/filter/filter.action";
import { removeall } from "../Redux/ticket/ticket.action";
import Filters from "../Components/Seats/Filters";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../Utils/notification";

function SelectBus() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [wentwrong, setwentwrong] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataredux = useSelector((state) => state.filter.data);

  useEffect(() => {
    dispatch(removeall());
  }, [dispatch]);

  useEffect(() => {
    let from = searchParams.get("from");
    let to = searchParams.get("to");
    let date = searchParams.get("date");
    if (
      from === "" ||
      to === "" ||
      date === "" ||
      from === null ||
      to === null ||
      date === null ||
      date === undefined
    ) {
      setwentwrong(true);
    } else {
      getdata(from, to, date);
    }
  }, [searchParams]);

  async function getdata(from, to, date) {
    try {
      let res = await axios.post("http://localhost:8080/bus/busavaliable", {
        from,
        to,
        date,
      });

      if (res.data.data.length === 0) {
        error("Cities Not Found");
        return navigate("/");
      }

      dispatch(saveDatafilter(res.data.data));
      setwentwrong(false);
    } catch (error) {
      console.log(error.message);
      setwentwrong(true);
    }
  }

  async function handlebook(ele) {
    navigate({
      pathname: `/bookticket/${ele._id}`,
      search: `?&date=${searchParams.get("date")}`,
    });
  }

  return (
    <>
      {wentwrong ? (
        <div className={styles.wrong}>
          <img src={require("../Images/404-error-page-templates.png")} />
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.filter}>
            <h5 style={{ textAlign: "left", marginLeft: "25px" }}>FILTERS</h5>
            <hr />
            <Filters />
            <hr />
          </div>
          <div className={styles.busdata}>
            {/* Ensure dataredux is an array before using map */}
            {Array.isArray(dataredux) &&
              dataredux.map((ele, i) => {
                return (
                  <div key={i}>
                    <h5>
                      {ele.companyname.charAt(0).toUpperCase() +
                        ele.companyname.slice(1)}{" "}
                    </h5>
                    <div>
                      <p>{ele.from}</p>
                      <p>
                        <BiArrowFromLeft />
                      </p>
                      <p>{ele.to}</p>
                    </div>
                    <div>
                      {ele.amenities?.map((e, i) => (
                        <div key={i}>
                          <p>{e}</p>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <h6>Arrival Time : {ele.arrival}</h6>
                    <h6>Departure Time : {ele.departure}</h6>
                    <hr />
                    <h6>Email : {ele.email}</h6>
                    <h6>Phone : {ele.phone}</h6>
                    <hr />
                    <div>
                      <h5>Price : RS {ele.price}</h5>
                      <h5 style={{display:"flex"}}>
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <AiTwotoneStar
                              key={i}
                              color={i < ele.rating ? "#FFED00" : "gray"}
                            />
                          ))}
                      </h5>
                    </div>
                    <button onClick={() => handlebook(ele)}>View Seats</button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default SelectBus;
