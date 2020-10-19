import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./timetable_location.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { UpdateRoom } from "../../redux/Room/RoomAction";
import ScreenNav from "../screen-nav/ScreenNav";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { GetLocationtimetable } from "../../redux/generate_locationtimetable/locationtimetableAction";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Room = (props) => {
  const doc = new jsPDF();
  console.log("props.history", props.location.state?.room.name);
  const dispatch = useDispatch();
  const history = useHistory();

  const [roomData, setroomData] = useState("");
  const { locationtimetabledatas } = useSelector(
    (state) => state.locationtimetables
  );
  const [LocationData, setLocationData] = useState([]);
  console.log("LocationData", locationtimetabledatas);
  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/generate_timetables/location_table",
      });
    } else {
      setroomData(props.location.state);
    }
  }, []);

  useEffect(() => {
    dispatch(GetLocationtimetable(roomData?.room?.name));
  }, [roomData]);

  useEffect(() => {
    setLocationData(locationtimetabledatas);
  }, [locationtimetabledatas]);

  const writeTimeTable = (day, time) => {
    const tempData = LocationData.filter(
      (res) =>
        res.selectedValueWorkingday === day &&
        res.selectedValueWorkinghour === time
    );
    if (tempData.length > 0) {
      return tempData.map((res, i) => (
        <td key={i}>
          <span>
            {res.subCode}-{res.selectedValueSubject}({res.selectedValueTag}
            )
            <br />
            {res.selectedValueGroup.label}
            <br />
            {res.selectedValueroom}
          </span>
        </td>
      ));
    } else {
      return <td> X</td>;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: props.location.state?.room.name,

      building: props.location.state?.room.building,
    },
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Generate TimeTable > ",
      pathname: "/generate_timetables/main",
    },
    {
      id: 3,
      name: "Location Details >",
      pathname: "/generate_timetables/location_table",
    },
    {
      id: 4,
      name: "Location TimeTable",
      pathname: "/generate_timetables/timetable_location",
    },
  ];

  const generatePdf = () => {
    if(LocationData.length === 0){
      alert("No Data to Print");

    }
    else{
    console.log("working");
    doc.autoTable({ html: "#mytable" });
    doc.save("table.pdf");
    }
  };

  return (
    <div className="roomUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="roomUpdate__container">
        <div className="roomUpdate__box">
          <h2 className="text-center text-dark">Location Time Table</h2>
          {LocationData.length === 0 && (
                  <div class="myDiv">
                  <p className=" text-center">
                    Current Room does not have any timetable
                  </p>
                  </div>
                )};
          <table>
           
            <tr>
              <td>
                <label htmlFor="building">Building</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  name="building"
                  className="form-control"
                  value={formik.values.building}
                />
              </td>
              <td>
                <label htmlFor="name">Room Name</label>
                <input
                  placeholder="A640"
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger buttonGenerate"
                  onClick={generatePdf}
                >
                  Generate
                </button>
              </td>
            </tr>
          </table>
          <br></br>

          <div>
            <table
              className="table table-light table-hover  LecturerViewContainer__table"
              id="mytable"
            >
              <thead>
              <tr>
                  <td></td>
                  <td></td>
                  <td>{formik.values.building}</td>
                  <td>{formik.values.name}</td>
                 
                  <td></td>
                  <td></td>
                  <td></td>
                  
                </tr>
                <tr>
                  <th>Time</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8.30</td>
                  {writeTimeTable("Monday", "08.30 AM")}
                  {writeTimeTable("Tuesday", "08.30 AM")}
                  {writeTimeTable("Wednesday", "08.30 AM")}
                  {writeTimeTable("ThursDay", "08.30 AM")}
                  {writeTimeTable("Friday", "08.30 AM")}
                  {writeTimeTable("Saturday", "08.30 AM")}
                  {writeTimeTable("Sunday", "08.30 AM")}
                </tr>
                <tr>
                  <td>9.30</td>
                  {writeTimeTable("Monday", "09.30 AM")}
                  {writeTimeTable("Tuesday", "09.30 AM")}
                  {writeTimeTable("Wednesday", "09.30 AM")}
                  {writeTimeTable("ThursDay", "09.30 AM")}
                  {writeTimeTable("Friday", "09.30 AM")}
                  {writeTimeTable("Saturday", "09.30 AM")}
                  {writeTimeTable("Sunday", "09.30 AM")}
                </tr>
                <tr>
                  <td>10.30</td>
                  {writeTimeTable("Monday", "10.30 AM")}
                  {writeTimeTable("Tuesday", "10.30 AM")}
                  {writeTimeTable("Wednesday", "10.30 AM")}
                  {writeTimeTable("ThursDay", "10.30 AM")}
                  {writeTimeTable("Friday", "10.30 AM")}
                  {writeTimeTable("Saturday", "10.30 AM")}
                  {writeTimeTable("Sunday", "10.30 AM")}
                </tr>
                <tr>
                  <td>11.30</td>
                  {writeTimeTable("Monday", "11.30 AM")}
                  {writeTimeTable("Tuesday", "11.30 AM")}
                  {writeTimeTable("Wednesday", "11.30 AM")}
                  {writeTimeTable("ThursDay", "11.30 AM")}
                  {writeTimeTable("Friday", "11.30 AM")}
                  {writeTimeTable("Saturday", "11.30 AM")}
                  {writeTimeTable("Sunday", "11.30 AM")}
                </tr>
                <tr>
                  <td>12.30</td>
                  <td>X</td>
                  <td>X</td>
                  <td>X</td>
                  <td>X</td>
                  <td>X</td>
                  <td>X</td>
                  <td>X</td>
                </tr>
                <tr>
                  <td>01.30</td>
                  {writeTimeTable("Monday", "1.30 PM")}
                  {writeTimeTable("Tuesday", "1.30 PM")}
                  {writeTimeTable("Wednesday", "1.30 PM")}
                  {writeTimeTable("ThursDay", "1.30 PM")}
                  {writeTimeTable("Friday", "1.30 PM")}
                  {writeTimeTable("Saturday", "1.30 PM")}
                  {writeTimeTable("Sunday", "1.30 PM")}
                </tr>
                <tr>
                  <td>2.30</td>
                  {writeTimeTable("Monday", "2.30 PM")}
                  {writeTimeTable("Tuesday", "2.30 PM")}
                  {writeTimeTable("Wednesday", "2.30 PM")}
                  {writeTimeTable("ThursDay", "2.30 PM")}
                  {writeTimeTable("Friday", "2.30 PM")}
                  {writeTimeTable("Saturday", "2.30 PM")}
                  {writeTimeTable("Sunday", "2.30 PM")}
                </tr>
                <tr>
                  <td>3.30</td>
                  {writeTimeTable("Monday", "3.30 PM")}
                  {writeTimeTable("Tuesday", "3.30 PM")}
                  {writeTimeTable("Wednesday", "3.30 PM")}
                  {writeTimeTable("ThursDay", "3.30 PM")}
                  {writeTimeTable("Friday", "3.30 PM")}
                  {writeTimeTable("Saturday", "3.30 PM")}
                  {writeTimeTable("Sunday", "3.30 PM")}
                </tr>
                <tr>
                  <td>4.30</td>
                  {writeTimeTable("Monday", "4.30 PM")}
                  {writeTimeTable("Tuesday", "4.30 PM")}
                  {writeTimeTable("Wednesday", "4.30 PM")}
                  {writeTimeTable("ThursDay", "4.30 PM")}
                  {writeTimeTable("Friday", "4.30 PM")}
                  {writeTimeTable("Saturday", "4.30 PM")}
                  {writeTimeTable("Sunday", "4.30 PM")}
                </tr>
                <tr>
                  <td>5.30</td>
                  {writeTimeTable("Monday", "5.30 PM")}
                  {writeTimeTable("Tuesday", "5.30 PM")}
                  {writeTimeTable("Wednesday", "5.30 PM")}
                  {writeTimeTable("ThursDay", "5.30 PM")}
                  {writeTimeTable("Friday", "5.30 PM")}
                  {writeTimeTable("Saturday", "5.30 PM")}
                  {writeTimeTable("Sunday", "5.30 PM")}
                </tr>
              </tbody>
            </table>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Room;
