import React from 'react'
import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCloudPlus } from "react-icons/bs";
import { BsShieldCheck } from "react-icons/bs";
import { BsReplyAll } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BsChevronDoubleDown } from "react-icons/bs";
import './Dashboard.css'


const Dashboard = () =>{

  const [connectionsData, setConnectionsData] = useState(null);


  const [credentials, setCredentials] = useState({
   
    server: undefined,
    port: undefined,
    
  });

  const [credential, setCredential] = useState({ uri: ''});

  const [Allcredentials, setAllcredentials] = useState({
   
    username: undefined,
    password: undefined,
    authDatabase: undefined,
    authMechanism: undefined,

  });

  const navigate = useNavigate()

  const handleChange = (e, credentialsType) => {
    
    if (credentialsType === "all") {
      
      setAllcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    } else if (credentialsType === "urii") {
      setCredential((prev) => ({ ...prev, uri: e.target.value }));
    } else {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (isShown &&  credentials.server && credentials.port&& Allcredentials.username && Allcredentials.password && Allcredentials.authDatabase) {
    
    try {

      const res = await axios.post("http://localhost:8801/api/dbconnection/logns",  { ...credentials, ...Allcredentials });
      
      const connectionsData = res.data.URI;
      setConnectionsData(res.data.URI); 
      navigate(`/Showdashboard`, { state: { connectionsData} });     
    } catch (err) {
      console.error(err);
    }
  } else if (!isShown && credentials.server && credentials.port) {
    try {

      const res = await axios.post("http://localhost:8801/api/dbconnection/logs", credentials);
      
      const connectionsData = res.data.URI;
      setConnectionsData(res.data.URI); 
      navigate(`/Showdashboard`, { state: { connectionsData} });    
    } catch (err) {
      console.error(err);
    }
  }
  };

  const [connections, setConnections] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
     
      const data = await axios.get("http://localhost:8801/api/dbconnection/getconnections");
      // console.log('connections >>>>', data);
      setConnections(data);
    };
    fetchdata();
  }, [])

  const [isShown, setIsShown] = useState(false);

  const handleClick1 = () => {
    setIsShown(false);
  };
  
  const handleClick2 = () => {
    setIsShown(true);
  };
  
 const connectToServer = async (uri) => {
    try {
      credential.uri = uri;
      const encodedUri = encodeURIComponent(credential.uri);
      const res = await axios.get(`http://localhost:8801/api/dbconnection/getdatabasesuri?uri=${encodedUri}`);
      const connectionsData = res.data.URI;
      setConnectionsData(res.data.URI); 
      navigate(`/Showdashboard`, { state: { connectionsData} });  
    } catch (err) { 
      console.error(err);
    }
  };
  return(
    <>
      <section>
      <section >
    <div className="topnav">
    <button className="buttonn">Data base generator</button>
    <div className="topnav-right">
    <button className="button">Logout</button>
    </div>
    </div>
    </section>
    <section>
    <div className="sidebar">
    <button className='button'> <BsCloudPlus/> New connection</button>
    <hr style={{
   background: "#FFFFFF",
   height: "1px",
   border: "none",
   }}/>
   <p><BsShieldCheck/> Saved Connections</p>
   <p><BsReplyAll/> Recent</p>
   { connections && connections?.data.map((connection) => ( 
   
   <button className='butcon' type ="button" key={connection.id} onClick={ async (e) => {
    await connectToServer(connection.URI);
    setCredential(connection.URI);
    handleChange(
      {
        target: { id: "uri", value: connection.URI },
      },
      "urii"
    );
  }} >
    {connection.server} : {connection.port}</button>

   ))}
  </div>
  </section>
  <section>
  <div className='container'>
  <div className='box'>
    <p className='p3'>Server address <BsFillExclamationCircleFill style={{ color: 'red', fontSize: "0.8em" }}/> </p>
    <p className='p5'>Port <BsFillExclamationCircleFill style={{ color: 'red', fontSize: "0.8em" }}/> </p>
    <form>
       <textarea
          className='uri'
          name="server"
          id="server"
          rows={2}
          cols={20}
          onChange={(e) => handleChange(e, "credentials")} 
       />
        <textarea
          className='port'
          name="port"
          id="port"
          rows={2}
          cols={20}
          onChange={(e) => handleChange(e, "credentials")}
        />
      <p className='p4'><BsChevronDoubleDown/> Advanced connection options</p>
      <button type ="button" onClick={handleClick1} className="button">None</button> <button type ="button"  onClick={handleClick2} className="buttonn">Username/Password</button>
   {isShown ? (
   <div className='authentication'>
   <div className='username'>
    <p>Username</p> <input id = "username" onChange={(e) => handleChange(e, "all")} ></input> 
    </div>
    <div className='password'>
    <p>Password</p> <input id = "password" onChange={(e) => handleChange(e, "all")}></input> 
    </div>
    <div className='authdata'>
    <p>Authentication DataBase</p> <input id="authDatabase" onChange={(e) => handleChange(e, "all")}></input> 
    </div>
    <div className='authmeca'>
    <p className='p6'> <BsChevronDoubleDown/> Authentication mechanism</p>
    <button type ="button"   onClick={(e) =>
    handleChange(
      {
        target: { id: "authMechanism", value: "Default" },
      },
      "all"
    )
  }
     className="default">Default</button> 
     <button type ="button"  onClick={(e) =>
    handleChange(
      {
        target: { id: "authMechanism", value: "SCRAM-SHA-256" },
      },
      "all"
    )
  } className="scram">SCRAM-SHA-256</button>
    </div>
   </div>
   
   ) :null }
   <button className ="connectt" onClick={handleClick} type="submit">Connect</button>
    </form>
  </div>
</div>
  </section>
      </section>
    </>
  );
}
export default Dashboard;
