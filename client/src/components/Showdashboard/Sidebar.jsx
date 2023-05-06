import React, { useEffect } from "react";
import Index from "../DatabaseToggler";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsDatabase } from "react-icons/bs";

const Sidebar = ({handleCollectionClick}) => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const connectionsData = location.state.connectionsData;
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8801/api/dbconnection/getdatabases?uri=${encodeURIComponent(
          connectionsData
        )}`
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (connectionsData) fetchData();
  }, []);
  return (
    <>
          <section>
        <div className="topnav">
          <div className="inline">
            <div>
              <button className="bb">
                Connected to {data.server}:{data.port}
              </button>
            </div>
            <div>
              <button className="bb">Logout</button>
            </div>
          </div>
        </div>
      </section>
      <section>
      <div className="sidebar p-3">
        <div className="container">
          <div className="card m-0">
            <div className="card-header">
              <h3 className="card-title">
                <BsDatabase className="ti" /> Databases
              </h3>
            </div>
            <div
              className="list-group list-group-flush overflow-scroll"
              style={{ maxHeight: "36rem" }}
            >
              {!!data?.databases?.length &&
                data?.databases?.map((e,i) => {
                  return (
                    <Index 
                      key={e+i}
                      uri={connectionsData}
                      databaseName={e}
                      handleCollectionClick={handleCollectionClick}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>  
      </>
   
  );
};

export default Sidebar;
