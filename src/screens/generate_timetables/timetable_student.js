import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { Getstudenttimetable } from "../../redux/generate_studenttimetable/studenttimetableAction";
const Timetable_student = (props) => {
  const doc = new jsPDF();
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const { studenttimetabledata } = useSelector(
    (state) => state.studenttimetable_get
  );
  const history = useHistory();
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated!");
  const [studentData, setStudentData] = useState([]);

  // const { loading, error } = useSelector((state) => state.Update_lecturer);

  const [name, setName] = useState("");
  console.log("studenttimetabledata", studenttimetabledata);
  useEffect(() => {
    dispatch(Getstudenttimetable(name));
  }, [name]);

  useEffect(() => {
    setStudentData(studenttimetabledata);
  }, [studenttimetabledata]);

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/generate_timetables/student_timetable",
      });
    } else {
      setName(props.location.state.genGroup[0].gen_groupid);
    }
  }, []);

  // const submitHandler =e =>{
  //     e.preventDefault();
  //     isClicked(true);
  //     dispatch(UpdateLecturerDetails(props.location.state?.id,name,emp_id));
  //     console.log(name,emp_id);
  // }

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
      name: "Student Details >",
      pathname: "/generate_timetables/student_timetable",
    },
    {
      id: 4,
      name: "Student TimeTable",
      pathname: "/generate_timetables/timetable_lecturer",
    },
  ];

  const writeTimeTable = (day, time) => {
    const tempData = studentData.filter(
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
            {res.selectedValueParallelSession}
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

  const generatePdf = () => {
    if(studentData.length === 0){
      alert("No Data to print");
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
          <h2 className="text-center text-dark">Student Time Table</h2>
        
          {studentData.length === 0 && (
                   <div class="myDiv">
                  <p className="text-danger text-center" id= "alert">
                    Current Group does not have a timetable
                  </p>
                  </div>
                )};
          <table>
           
            <tr>
              <td>
                <label htmlFor="name">Student Group id</label>
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
              className="table table-light table-hover table-border LecturerViewContainer__table"
              id="mytable"
            >
              <thead>
              <tr>
                  <td></td>
                  <td></td>
               
                  <td>{name}</td>
                  <td></td>
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

export default React.memo(Timetable_student);
