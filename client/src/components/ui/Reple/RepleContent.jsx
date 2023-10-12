import React, { useEffect, useRef, useState } from "react";
import "../../../style/components/ui/Reple/RepleContent.scss";
import { useSelector } from "react-redux";

function RepleContent({ elem, idx }) {
  const [modalFlag, setModalFlag] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(elem.user.uid);
  }, []);

  return (
    <div className="RepleContent">
      <div key={idx} className="item">
        <div className="profile">
          <div className="img_wrap">
            <img src={elem.user.photoURL} alt={elem.user.photoURL} />
          </div>
          <span>{elem.user.displayName}</span>
        </div>
        <div className="text">
          <p>{elem.reple}</p>
          {elem.user.uid === user.uid && (
            <div className="modalControl">
              <span
                onClick={() => {
                  setModalFlag(true);
                }}
              >
                ⋯
              </span>
              {modalFlag && (
                <div className="modal" ref={ref}>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function useOnClickOutside(ref, callback) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}

export default RepleContent;
