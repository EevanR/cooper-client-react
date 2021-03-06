import React from "react";
import cooperCalculator from "../modules/cooperCalculator";
import { saveData } from "../modules/performanceData";

const DisplayCooperResult = ({
  distance,
  gender,
  age,
  authenticated,
  entrySaved,
  entryHandler
}) => {
  const result = cooperCalculator(distance, gender, age);

  const propsPassed = distance && age ? true : false;

  return (
    <>
      {propsPassed && (
        <>
          <div>
              <h3 id="cooper-message">
                {age} year old {gender} running {distance} meters.
              </h3>
              <p id="cooper-result">Result: {result}</p>
              {authenticated && !entrySaved ? (
                <button className="ui button"
                  id="save-result"
                  onClick={() => saveData(result, distance, age, gender, entryHandler)}
                >
                  Save entry
                </button>
              ) : (
                false
              )}
              {!authenticated && !entrySaved ? (
                <p>Login to save your entry!</p>
              ) : (
                false
              )}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayCooperResult;