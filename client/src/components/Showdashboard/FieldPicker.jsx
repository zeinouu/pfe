import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsDatabase } from "react-icons/bs";
const Key = ({
    keyName,
    onKeyChange,
    inputName,
    checked,
    databaseName,
    collectionName,
    selectedKeys,
  }) => {
    return (
      <div className="col-12 mb-2 key-container">
        <label className="form-selectgroup-item flex-fill">
          <input
            type="checkbox"
            name={inputName}
            value={keyName}
            className="form-selectgroup-input"
            onChange={(event) =>
              onKeyChange(event.target.value, event.target.checked)
            }          checked={selectedKeys[databaseName]?.[collectionName]?.some(
              (item) => item.key === keyName
            )}
          />
          <div className="form-selectgroup-label d-flex align-items-center p-1">
            <div className="me-1">
              <span className="form-selectgroup-check"></span>
            </div>
            <div className="form-selectgroup-label-content d-flex align-items-center ">
              <div>
                <div className="font-weight-medium">{keyName}</div>
              </div>
            </div>
          </div>
        </label>
      </div>
    );
  };
 const FieldPicker = ({collection={},selectedKeys=[],keys}) => {
 const {databaseName,collectionName,uri}=collection


  const handleKeyChange = (keyName, isChecked, collectionName) => {
    //  setTempSelectedKeys((prevKeys) => {
    //   if (isChecked) {
    //     const isKeyAlreadyPresent = prevKeys.some(
    //       (k) => k.key === keyName && k.collection === collectionName
    //     );

    //     if (!isKeyAlreadyPresent) {
    //       return [...prevKeys, { key: keyName, collection: collectionName }];
    //     }
    //   } else {
    //     return prevKeys?.filter(
    //       (k) => k.key !== keyName || k.collection !== collectionName
    //     );
    //   }
    //   return prevKeys;
    // });
  };

//   const handleButtonClick = () => {
//     console.log("Temp selected keys:", tempSelectedKeys);
//     setSelectedKeys((prevKeys) => {
//       return {
//         ...prevKeys,
//         [selectedDatabaseName]: {
//           ...(prevKeys[selectedDatabaseName] || {}),
//           [selectedCollectionName]: tempSelectedKeys?.filter(
//             (k) => k.collection === selectedCollectionName
//           ),
//         },
//       };
//     });
//   };

//   const handleDeleteButtonClick = () => {
//     setSelectedKeys((prevKeys) => {
//       const updatedKeys = { ...prevKeys };
//       if (updatedKeys[selectedDatabaseName]) {
//         delete updatedKeys[selectedDatabaseName][selectedCollectionName];
//       }
//       return updatedKeys;
//     });
//   };

//   const handleKeyRemoval = (keyName, collectionName) => {
//     setTempSelectedKeys((prevKeys) => {
//       return prevKeys?.filter(
//         (k) => k.key !== keyName || k.collection !== collectionName
//       );
//     });

//     setSelectedKeys((prevKeys) => {
//       const updatedKeys = { ...prevKeys };
//       updatedKeys[collectionName] = updatedKeys[collectionName]?.filter(
//         (item) => item.key !== keyName
//       );
//       return updatedKeys;
//     });
//   };


  return (
    <>
      <section>
        <div className="container1">
          <div className="box1">
            <div className="container3">
              <div className="card m-2">
                <div className="card-header">
                  <h3 className="card-title">
                    <BsDatabase className="ti" /> Extracted data
                  </h3>
                </div>
                <div
                  className="list-group list-group-flush overflow-scroll"
                  style={{ maxHeight: "36rem" }}
                >
                  <div className="card-body">
                    <div className="col-12">
                      {!keys.length&&"This collection has no fields"}
                      {!!keys?.length &&
                        keys.map((e,i) => {
                          const inputName = `selected_key_${i}`; //Unique inputName based on the data's _id property
                          return (
                            <Key
                              key={i}
                              keyName={e?.name}
                              inputName={inputName}
                              onKeyChange={(keyName, isChecked) =>{
                                // handleKeyChange(
                                //   keyName,
                                //   isChecked,
                                //   selectedCollectionName
                                // )
                              }}
                              databaseName={databaseName}
                              collectionName={collectionName}
                              selectedKeys={selectedKeys}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box2">
            {/* <button className="thez" onClick={handleButtonClick}>
              <IconChevronsRight color="white" size={33} />
            </button>
            <button className="tjib" onClick={handleDeleteButtonClick}>
              <IconChevronsLeft color="white" size={33} />
            </button> */}
          </div>
          <div className="box3">
            <div className="container3">
              <div className="card m-2">
                <div className="card-header">
                  <h3 className="card-title">
                    <BsDatabase className="ti" /> New data Base
                  </h3>
                </div>
                <div
                  className="list-group list-group-flush overflow-scroll"
                  style={{ maxHeight: "36rem" }}
                >
                  <div className="card-body">
                    <div className="col-12">
                      {/* {Object.entries(selectedKeys).map(
                        ([database, collections]) =>
                          Object.entries(collections).map(
                            ([collection, items]) =>
                              items.map((item, index) => (
                                <div
                                  className="col-12 mb-2"
                                  key={`${database}-${collection}-${index}`}
                                >
                                  <label
                                    className="form-selectgroup-item flex-fill"
                                    onClick={() =>
                                      handleKeyRemoval(item.key, collection)
                                    }
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-selectgroup-input"
                                      checked={true}
                                      readOnly
                                    />
                                    <div className="form-selectgroup-label d-flex align-items-center p-1">
                                      <div className="me-1">
                                        <span className="form-selectgroup-check"></span>
                                      </div>
                                      <div className="form-selectgroup-label-content d-flex align-items-center ">
                                        <div>
                                          <div className="font-weight-medium">
                                            {database}.{collection}.{item.key}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              ))
                          )
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default FieldPicker