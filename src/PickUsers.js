import React, { useEffect, useState } from "react";
import { data } from "./contants";
import { RxCross2 } from "react-icons/rx";
let names = data;
export default function PickUsers() {
  const [searchText, setSearchText] = useState("");
  const [fil, setFil] = useState(names);
  const [selected, setSelected] = useState([]);
  const [showList, setShowList] = useState(false);

  const removeChip = (ele) => {
    names.push(ele);
    setSelected(selected.filter((x) => x != ele));
  };
  const renderChips = () => {
    return selected.map((ele, ind) => {
      return (
        <div
          className="px-2 py-1 mr-2 border mb-2 border-black rounded-xl bg-gray-300"
          key={ind}
        >
          <div className="flex items-center">
            <span className="mr-2 ">{ele}</span>
            <span className="cursor-pointer" onClick={() => removeChip(ele)}>
              <RxCross2 />
            </span>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    document
      .getElementById("input")
      .addEventListener("onClick", () => setShowList(true));
  });
  useEffect(() => {
    setFil(names);
  }, [selected]);

  const handeChange = (e) => {
    setSearchText(e.target.value);
    let nam = e.target.value;
    setFil(names.filter((x) => x.toLowerCase().includes(nam.toLowerCase())));
  };

  const selectUser = (text) => {
    setSelected([...selected, text]);
    names = names.filter((x) => x != text);
    setSearchText("");
  };
  return (
    <div className="mt-20 mx-32">
      <div className="">
        <div className="flex flex-wrap items-center border-b-4 border-blue-700">
          <div className="flex flex-wrap" id="input">
            {renderChips()}
          </div>
          <input
            type="text"
            id="input"
            placeholder="Add new user ..."
            onClick={() => setShowList(true)}
            value={searchText}
            onChange={handeChange}
            className=" flex-1 w-full outline-none py-4 px-2 text-lg font-semibold"
          />
        </div>
        {showList && (
          <div className=" mt-1 w-2/4 p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
            {fil.map((nam, index) => {
              return (
                <div className="text-left" key={index}>
                  <p
                    className="m-2 font-semibold cursor-pointer"
                    onClick={() => selectUser(nam)}
                  >
                    {nam}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}