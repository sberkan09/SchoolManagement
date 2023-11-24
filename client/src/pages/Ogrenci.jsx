import React, { useState, useEffect } from "react";

function fetchData(url, setData) {
    const fetchInfo = () => { 
    return fetch(url) 
            .then((res) => res.json()) 
            .then((d) => setData(d)) 
    }
    
    useEffect(() => {
        fetchInfo();
    }, [])
}

function OgrenciList() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [data, setData] = useState([]);
    fetchData(url, setData);
    return (
        <div className="App">
      <>
        {data.map((dataObj, index) => {
          return (
              <p>{dataObj.name}, {dataObj.username}, {dataObj.email}</p>
          );
        })}
      </>
    </div>
    );
}

export default function Ogrenci() {
    return (
        <>
            <OgrenciList/>
        </>
    );
  }
  