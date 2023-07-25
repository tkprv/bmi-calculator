import React, { useState, useRef } from "react";
import "./bmi.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import axios from 'axios'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Card } from 'primereact/card';
import { useHistory } from "react-router-dom";

function BMI() {
  let history = useHistory();
  const toast = useRef(null)
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBmi] = useState();

  const adddata = async (height, weight) => {
    if (height <= 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกข้อมูลใหม่',
        life: 3000,
      })
    }
    else if (weight <= 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกข้อมูลใหม่',
        life: 3000,
      })
    }
    else if (height <= 0 && weight <= 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'ข้อมูลที่กรอกไม่ถูกต้อง กรุณากรอกข้อมูลใหม่',
        life: 3000,
      })
    }
    else {
      const h = height / 100
      const bmi = weight / (h * h)
      let value;
      if (bmi >= 30) {
        value = 'โรคอ้วน (Obesit)'
      }
      else if (bmi >= 25) {
        value = 'น้ำหนักมากกว่าเกณฑ์ปกติ (Overweight)'
      }
      else if (bmi >= 18.5) {
        value = 'น้ำหนักอยู่ในเกณฑ์ปกติ (Normal weight)'
      }
      else {
        value = 'น้ำหนักต่ำกว่าเกณฑ์ปกติ (Underweight)'
      }
      axios.post(`http://localhost:3001/bmi/adddata`, {
        height: height,
        weight: weight,
        bmi: bmi,
        databmi: value
      })
      showdata()
    }
  }

  const showdata = () => {
    axios
      .get("http://localhost:3001/bmi/showdata", {})
      .then((res) => {
        setBmi(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className="form-div">
      <h2 style={{ textAlign: 'center' }}>Calculate Your Body Mass Index</h2>
      <Card style={{ background: 'rgb(238, 237, 237)', marginTop: '1.5em', marginLeft: '35.6em' }} className="w-25rem">
        <div >
          <h5>ส่วนสูง (เซนติเมตร)
            <InputText value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: "12em", height: "2em", marginLeft: '.5em' }} />
          </h5>
        </div>

        <div>
          <div style={{ marginTop: "1em" }}>
            <h5>น้ำหนัก (กิโลกรัม)
              <InputText value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: "12em", height: "2em", marginLeft: '1.4em' }} />
            </h5>
          </div>
        </div>
        <div style={{ marginTop: '1.5em', textAlign: 'center' }}>
          <Toast ref={toast} />
          <Button onClick={() => adddata(height, weight)} icon="pi pi-download" label="ป้อนข้อมูล" style={{ height: '2.5em' }} />
          <Button onClick={() => history.push({ pathname: "Page/bmi" })} icon="pi pi-replay" label="ป้อนข้อมูลใหม่" severity="help" style={{ height: '2.5em', marginLeft: '.5em' }} />
        </div>
        <div>
          <hr style={{ marginTop: "2em" }}></hr>
        </div>
        <div style={{ marginTop: "1em", textAlign: 'center' }}>
          <h5>BMI = {bmi?.bmi} {bmi?.databmi}</h5>
        </div>
      </Card>
    </div>
  );
}

export default BMI;
