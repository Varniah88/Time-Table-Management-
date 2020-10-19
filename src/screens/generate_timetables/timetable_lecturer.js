import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import { GetLecturertimetable } from "../../redux/generate_lecturertimetable/lecturertimetableAction";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewLecturer = (props) => {
  const doc = new jsPDF();
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const history = useHistory();
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated!");

  const { lectimetabledatas } = useSelector(
    (state) => state.lecturertimetables
  );

  const [name, setName] = useState("");
  const [emp_id, setEmpID] = useState("");
  const [LecturerData, setLecturerData] = useState([]);
  console.log("LecturerData", LecturerData);
  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/generate_timetables/lecturer_table",
      });
    } else {
      setName(props.location.state.name);
      setEmpID(props.location.state.emp_id);
    }
  }, []);

  useEffect(() => {
    dispatch(GetLecturertimetable(name));
  }, [name]);

  useEffect(() => {
    setLecturerData(lectimetabledatas);
  }, [lectimetabledatas]);

  const writeTimeTable = (day, time) => {
    const tempData = LecturerData.filter(
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
      name: "Lecturer Details >",
      pathname: "/generate_timetables/lecturer_table",
    },
    {
      id: 4,
      name: "Lecturer TimeTable",
      pathname: "/generate_timetables/timetable_lecturer",
    },
  ];

  const generatePdf = () => {
    if(LecturerData.length === 0 ){
      alert("No Data to Print");
    }
    else{
    console.log("working");
    doc.autoTable({ html: "#mytable" });
    doc.save("table.pdf");
    }
  };

  return (
    <div className="lecturer">
      <ScreenNav rightNavData={navData} />
      <div className="lecturer__container">
        <div className="lecturer__box">
          <h2 className="text-center text-dark">Lecturer Time Table</h2>
          {LecturerData.length === 0 && (
                  <div class="myDiv">
                  <p className="text-danger text-center">
                    Current lecturer does not have a timetable
                  </p>
                  </div>
          )};
          <table>
           
            <tr>
              <td>
                <label htmlFor="name">Lecturer Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </td>
              <td>
                <label htmlFor="eid">Employee Id</label>
                <input
                  placeholder="000150"
                  name="emp_id"
                  type="text"
                  className="form-control"
                  pattern="[0-9]{6}"
                  title="Should be 6 numbers!"
                  value={emp_id}
                  onChange={(e) => setEmpID(e.target.value)}
                  required
                />
              </td>
              <td>
                <td>
                  <button
                    className="btn btn-danger buttonGenerate"
                    onClick={generatePdf}
                  >
                    Generate
                  </button>
                </td>
              </td>
            </tr>
          </table>
          <br></br>
          <div>
            <table
              className="table table-light table-hover table-border LecturerViewContainer__table"
              id="mytable"
            >
              <thead>
              <tr>
                  <td></td>
                  <td></td>
               
                  <td>{name}</td>
                  <td>{emp_id}</td>
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
        </div>
      </div>
    </div>
  );
};

export default React.memo(ViewLecturer);
