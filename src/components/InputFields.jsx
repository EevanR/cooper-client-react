import React from "react";

const InputFields = ({ onChangeHandler }) => {
  return (
    <>
      <div className="inputFields"> 
        <div className="ui divider">
          <div className="fields">
            <form class="ui form">
              <div className="field">
                <label>Distance</label>
                <div className="ui fluid input"><input onChange={onChangeHandler} name="distance" id="distance" placeholder="Meters"></input></div>
              </div>
              <div className="field">
                <label>Age</label>
                <div className="ui fluid input"><input onChange={onChangeHandler} name="age" id="age" placeholder="#" ></input></div>
              </div>
              <select onChange={onChangeHandler} name="gender" id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputFields;
