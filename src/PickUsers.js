import React, { useEffect, useRef, useState } from "react";
import { data } from "./contants";
import { RxCross2 } from "react-icons/rx";
let names = data;
export default function PickUsers() {
  const [searchText, setSearchText] = useState("");
  const [fil, setFil] = useState(names);
  const [selected, setSelected] = useState([]);
  const [showList, setShowList] = useState(false);
  const listRef = useRef();
  const selRef = useRef();
  const inputRef = useRef();

  let listItems = [];
  const removeChip = (ele) => {
    names.push(ele);
    setSelected(selected.filter((x) => x != ele));
    setSearchText("");
    inputRef.current.focus();
  };
  const renderChips = () => {
    return selected.map((ele, ind) => {
      return (
        <div
          className="px-2 py-1 mr-2 border-2 mb-2 border-black rounded-xl  focus:outline-none focus:border-blue-600 bg-gray-300"
          key={ind}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              console.log(e.key);
              removeChip(ele);
            }
          }}
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

  const inputkeyDown = (e) => {
    listItems = listRef.current.childNodes;
    if (e.key === "ArrowDown" && listItems.length >= 1) {
      e.preventDefault();
      listItems[0].focus();
    }
    let nam = e.target.value;
    let items = selRef.current.childNodes;
    if (e.key === "Backspace" && nam === "" && items.length > 0) {
      items[items.length - 1].focus();
    }
  };

  const listkeydown = (e) => {
    e.preventDefault();
    listItems = listRef.current.childNodes;
    let cur = e.target;
    let n = listItems.length;
    let i = 0;
    for (; i < n; i++) {
      if (listItems[i] == cur) break;
    }
    if (e.keyCode == 40) {
      if (i != n - 1) listItems[i + 1].focus();
    } else if (e.keyCode == 38) {
      if (i != 0) listItems[i - 1].focus();
    } else if (e.keyCode == 13) {
      selectUser(e.target.innerText);
    }
  };

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
    inputRef.current.focus();
  };
  return (
    <div className="mt-20 mx-32">
      <div className="">
        <div className="flex flex-wrap items-center border-b-4 border-blue-700">
          <div ref={selRef} className="flex flex-wrap" id="input">
            {renderChips()}
          </div>
          <input
            type="text"
            ref={inputRef}
            tabIndex={0}
            placeholder="Add new user ..."
            onKeyDown={inputkeyDown}
            onClick={() => setShowList(true)}
            value={searchText}
            onChange={handeChange}
            className="flex-1 w-full outline-none py-4 px-2 text-lg font-semibold"
          />
        </div>
        {showList && (
          <div
            id="list"
            ref={listRef}
            className="mt-1 w-2/4 p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto"
          >
            {fil.map((nam, index) => {
              return (
                <div
                  className="text-left m-2 font-semibold cursor-pointer focus:bg-gray-200 outline-none"
                  onKeyDown={listkeydown}
                  onClick={() => selectUser(nam)}
                  key={index}
                  tabIndex={0}
                >
                  {nam}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
