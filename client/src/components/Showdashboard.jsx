import React from "react";
import { useEffect, useState } from "react";
import "./Showdashboard.css";
import { BsDatabase } from "react-icons/bs";
import axios from "axios";
import { IconChevronsRight } from "@tabler/icons-react";
import { IconChevronsLeft } from "@tabler/icons-react";
import Sidebar from "./Showdashboard/Sidebar";
import FieldPicker from "./Showdashboard/FieldPicker";

const Showdashboard = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [tempSelectedKeys, setTempSelectedKeys] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [isFilters, setIsFilters] = useState(false);
  const [keys, setKeys] = useState([]);

  const handleCollectionClick = async (uri, databaseName, collectionName) => {
       console.log('called');
      setSelectedCollection({
        uri,
        databaseName,
        collectionName,
      });
      const { data } = await axios.get(
        `http://localhost:8801/api/dbconnection/getCollectiondata?uri=${encodeURIComponent(
          uri
        )}&databaseName=${databaseName}&collectionName=${collectionName}`
      );
      setKeys(data.keys)

  };

  return (
    <>
      {!isFilters && <Sidebar handleCollectionClick={handleCollectionClick} />}
      {!isFilters && <FieldPicker collection={selectedCollection} keys={keys} selectedKeys={selectedKeys}/> }
      {isFilters && <></>}
    </>
  );
};

export default Showdashboard;
