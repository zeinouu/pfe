import axios from "axios";
import React, { useState } from "react";
import { BsDatabase  ,BsCollection} from "react-icons/bs";


export const Collection = ({ uri, databaseName, CollectionName, handleCollectionClick }) => {
  return (
    <button className="list-group-item" >
      <div className="row">
        <div className="col-auto ms-3" onClick={() => handleCollectionClick(uri, databaseName, CollectionName)}><BsCollection/> {CollectionName}</div>
      </div>
    </button>
  );
};

const Index = ({ uri, databaseName, handleCollectionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState([]);

  const toggleOpen = async () => {
    if (!isOpen) {
      await getCollections();
    }
    setIsOpen((v) => !v);
  };


  const getCollections = async () => {
    const { data } = await axios.get(
      `http://localhost:8801/api/dbconnection/getCollections?uri=${encodeURIComponent(
        uri
      )}&databaseName=${databaseName} `
    );
    setCollections(data?.collections || []);
  };
  return (
    
    <>
      <button className="list-group-item" onClick={toggleOpen}>
        <div className="row">
          <div className="col-auto ms-3">
            <BsDatabase />
            {databaseName}
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="row">
          {!!collections?.length &&
            collections.map((e,i) => {
              return (
                <Collection
                  key={i+e.name}
                  uri={uri}
                  databaseName={databaseName}
                  CollectionName={e?.name}
                  handleCollectionClick={handleCollectionClick}
                  />
              );
            })}
        </div>
      )}
    </>
  );
};
export default Index;
