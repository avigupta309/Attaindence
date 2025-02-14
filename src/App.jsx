import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
function App() {
  let time = new Date();
  let exactEntryTime = time.toLocaleDateString();

  let [formData, setformData] = useState({
    userName: "",
    userEmail: "",
    userRoll: "",
    userMessage: "",
    index: "",
    CurrentTime: "",
  });

  function change(event) {
    let inputName = event.target.name;
    let inputData = event.target.value;
    let setData = { ...formData };
    setData[inputName] = inputData;
    setData["CurrentTime"] = exactEntryTime;
    setformData(setData);
  }

  function reset() {
    setformData({
      userName: "",
      userEmail: "",
      userRoll: "",
      userMessage: "",
      index: "",
      CurrentTime: "",
    });
  }

  const [information, setInformation] = useState([]);
  useEffect(() => {
    if (information.length > 0) {
      localStorage.setItem("ok", JSON.stringify(information));
    }
  }, [information]);

  useEffect(() => {
    const StoredData = JSON.parse(localStorage.getItem("ok")) || [];
    if (StoredData) {
      setInformation(StoredData);
    }
  }, []);

  function saveInfo(event) {
    event.preventDefault();
    console.log(information); ///test

    if (formData.userRoll >= 23 || formData.userRoll <= 0) {
      toast.error("Don't Be Over Smart you Cant enter Roll Greater Than 22.");
    } else {
      if (formData.index === "") {
        let checkExist = information.filter(
          (info) =>
            info.userEmail == formData.userEmail ||
            info.userRoll == formData.userRoll
        );
        if (checkExist.length >= 1) {
          toast.error("Already Exist.....");
        } else {
          const storedData = { ...formData };
          const collectingData = [...information, storedData];

          setInformation(collectingData);
          reset();
        }
      } else {
        let editIndex = formData.index;
        let checkExist = information.filter(
          (info, i) =>
            (info.userEmail == formData.userEmail ||
              info.userRoll == formData.userRoll) &&
            i != editIndex
        );
        if (checkExist.length == 0) {
          let updatingData = [...information];
          updatingData[editIndex] = { ...formData };
          setInformation(updatingData);
          reset();
          toast.success("Updated Sucessfully!");
        } else {
          toast.error("Already Exist.....");
        }
      }
    }
  }

  function del(index) {
    let objectAfterDelete = information.filter((val, i) => index != i);
    setInformation(objectAfterDelete);
    toast.success("Successfully Deleted!");
    localStorage.setItem("ok", JSON.stringify(objectAfterDelete));
  }

  function edit(index) {
    let forUpdateObject = information.filter((data, i) => i == index)[0];
    forUpdateObject["index"] = index;
    setformData(forUpdateObject);
  }

  const [aletter, setAletter] = useState([]);
  const [bletter, setBletter] = useState([]);
  const [cletter, setCletter] = useState([]);
  information.map((val) => {
    if (val.userName.startsWith("a")) {
      setAletter(val.userName);
    }else if(val.userName.startsWith("b")){
      setBletter(val.userName)
    }else if(val.userName.startsWith("c")){
      setCletter(val.userName)
    }

  });

  return (
    <>
      <ToastContainer />
      <div className="container flex justify-center">
        <form onSubmit={saveInfo}>
          <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend text-3xl text-red-500">
              Bim 80th
            </legend>

            <label className="fieldset-label text-xl" aria-required>
              Name
            </label>
            <input
              onChange={change}
              name="userName"
              value={formData.userName}
              type="text"
              className="input"
              placeholder="Student Name"
              required
            />

            <label className="fieldset-label text-xl" aria-required>
              Roll No.
            </label>
            <input
              onChange={change}
              name="userRoll"
              value={formData.userRoll}
              type="number"
              className="input"
              placeholder="Roll Number"
              required
            />

            <label className="fieldset-label text-xl">Email</label>
            <input
              onChange={change}
              name="userEmail"
              value={formData.userEmail}
              type="text"
              className="input"
              placeholder="Email adress"
              required
            />

            <label className="fieldset-label text-xl">Message</label>
            <input
              onChange={change}
              name="userMessage"
              value={formData.userMessage}
              type="text"
              className="input"
              placeholder="Any Query -"
            />
            <br></br>
            <button className="btn btn-success active:bg-red-500 active:text-white">
              {formData.index === "" ? "Save" : "update"}
            </button>
          </fieldset>
        </form>
      </div>

      <div className="table-Area">
        <div className="overflow-x-auto">
          <table
            className="table table-xs"
            border="1"
            style={{
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {information.length >= 1 ? (
                information.map((info, i) => {
                  return (
                    <tr key={i}>
                      <td>{1 + i}</td>
                      <td>{`${info.CurrentTime}`}</td>
                      <td>{info.userName}</td>
                      <td>{info.userEmail}</td>
                      <td>{info.userRoll}</td>
                      <td>
                        <button
                          className="btn btn-xs bg-red-500 text-white"
                          onClick={() => {
                            del(i);
                          }}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-xs bg-blue-500 text-white"
                          onClick={() => {
                            edit(i);
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="footer">
        <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="inline-block fill-current"
            ></svg>
            <img
              className="h-20"
              src="https://www.animatedimages.org/data/media/839/animated-nepal-flag-image-0007.gif"
            />
            <p className="font-bold">
              BPC Pvt. 1992
              <br />
              Bachelor Of Information Management
            </p>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer"
                    className="btn btn-primary bg-green-700 drawer-button"
                  >
                    Open drawer
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <div className="navbar bg-primary text-primary-content">
                      <h1 className="text-2xl">Student Name</h1>
                    </div>
                    {information.length > 0 ? (
                      information.map((val, index) => {
                        return (
                          <li key={index} className="text-left">
                            {val.userName}
                          </li>
                        )
                      })
                    ) : (
                      <li>No Data is found</li>
                    )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
}

export default App;
