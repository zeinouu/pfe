import axios from "axios";
import React, { useState, useEffect } from "react";

export const Key = ({ keyName }) => {
  return (
    <button className="list-group-item">
      <div className="row">
        <div className="col-auto ms-1">{keyName}</div>
      </div>
    </button>
  );
};

const Extracteddata = ({ collectionData }) => {
  return (
    <div className="row">
      {!!collectionData?.length &&
        collectionData.map((e) => {
          return <Key key={e?._id} keyName={e?.name} />;
        })}
    </div>
  );
};
export default Extracteddata