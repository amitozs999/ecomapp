import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children, ratingtext }) => {
  //
  const { user } = useSelector((state) => ({ ...state })); //cur user from redux state
  const [modalVisible, setModalVisible] = useState(false); //popupvisible state

  let history = useHistory();
  let { slug } = useParams(); //old url me hoga slug

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true); //on click pe make modal visible
    } else {
      history.push({
        //take him to login page to login and then give rating   /
        pathname: "/login", //component={Login}
        state: { from: `/product/${slug}` }, //passing this so that after login vapas yha ah sake login page pe check karenge
        //in send values ko use karke if yha se aya he toh login ke baad yhi bhej to usestate use karke
      });
    }
  };

  return (
    <>
      {/* //show text based on login or not */}
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        {/* <br />{" "} */}
        {/* {user
          ? ratingtext
            ? "Update Rating"
            : "Leave Rating "


          : "Login to leave rating"} */}

        {user && ratingtext ? "  Update Rating" : "  Leave Rating "}
      </div>

      <Modal //popup
        title="Leave your rating"
        style={{
          top: 20,
          // border: "20px",
          // borderTopWidth: "5px",
        }}
        okText="Submit"
        centered
        visible={modalVisible} //based on this state value
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will apper soon"); //jesi hi click on ok/submit
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
