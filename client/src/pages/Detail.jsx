import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
  const params = useParams();

  useEffect(() => {
    console.log(params.postNum);

    axios
      .get(`api/detail`)
      .then((res) => res.data.success && console.log("성공"))
      .catch((err) => console.log("클라이언트", err));
  }, []);
  return <div>Detail</div>;
}

export default Detail;
