import React, { useEffect, useRef, useState } from "react";
import "../../../style/components/ui/Reple/RepleContent.scss";
import { RepleInput } from "./RepleUpload";

function RepleContent({ elem, idx, user }) {
  const [modalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editReple, setEditReple] = useState();
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));

  return (
    <div className="RepleContent">
      {editFlag ? (
        <>
          <h4>{user.displayName}</h4>
          <RepleInput reple={editReple} setReple={setEditReple} />
        </>
      ) : (
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
                    <button
                      onClick={() => {
                        setEditFlag(true);
                        setModalFlag(false);
                      }}
                    >
                      수정
                    </button>
                    <button>삭제</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
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
