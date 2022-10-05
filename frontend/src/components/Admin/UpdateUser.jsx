import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EmailIcon from "@material-ui/icons/Email";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector(
    (state) => state.userDetailsReducer
  );
  const {
      error: updateError,
      loading: updateLoading,
      isUpdated,
    } = useSelector((state) => state.updateProfile);
    
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // USEEFECT
  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated Successfully...");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [error, alert, dispatch, updateError, isUpdated, navigate, user, id]);

  // SUBMIT HANDLER
  const updateUserRoleSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, name, email, role));
  };
  return (
    <>
      <MetaData title={"Update User - Admin"} />
      <div className="dashBoardContainer container-fluid  p-2 ">
        <div className="row ">
          {/* side bar col which is inside the sidebar */}
          <SideBar />

          {/* productslist col */}
          <div className="col-12 col-md-9 mx-auto mt-2">
            {loading ? (
              <Loader />
            ) : (
              <>
                <form
                  className=" d-flex flex-column justify-content-center align-items-center gap-3"
                  onSubmit={updateUserRoleSubmitHandler}
                  encType="multipart/form-data"
                >
                  <h2 className="text-center text-body my-2 border-bottom border-3 w-50">
                    Update User
                  </h2>

                  {/*  NAME */}
                  <div className="col-5 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                    <PersonIcon className="fs-2 text-body mx-3" />
                    <input
                      className=" border-0 outline-0 w-75 fs-4"
                      type="text"
                      placeholder=" Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ outline: "none" }}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="col-5 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                    <EmailIcon className="fs-2 text-body mx-3" />
                    <input
                      className=" border-0 outline-0 w-75 fs-4"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ outline: "none" }}
                    />
                  </div>

                  {/*  ROLE */}
                  <div className="col-5 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                    <VerifiedUserIcon
                      className={
                        role === "admin"
                          ? "fs-2 text-success mx-3"
                          : "fs-2 text-body mx-3"
                      }
                    />
                    {/* <AccountTreeIon className="fs-2 text-body mx-3" /> */}
                    <select
                      className="border-0 outline-0 fs-5"
                      aria-label="Default select example"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      style={{ outline: "none" }}
                    >
                      <option>Choose Role</option>"
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {/* BUTTON */}
                  <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 ">
                    <input
                      className="  btn btn-danger w-75 "
                      type="submit"
                      value="Update"
                      disabled={
                        updateLoading
                          ? true
                          : false || role === ""
                          ? true
                          : false
                      }
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
