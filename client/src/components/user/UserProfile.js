import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./UserProfile.css";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import StripeCheckout from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const cookies = new Cookies();
  const history = useHistory();

  const jwt = cookies.get("jwt");
  const [profile, setProfile] = useState({});
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [amount, setAmount] = useState();
  const [amountChanged, setAmountChanged] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shanann.herokuapp.com/user/profile", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        jwt: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode === 200) {
          setProfile(data.details.user);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      });
  }, [amountChanged]);

  const onsubmit = (e) => {
    e.preventDefault();
    const body = {
      currPassword: currPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    fetch("https://shanann.herokuapp.com/changepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode === 200) {
          history.push("/user/logout");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const handleToken = async (token, address) => {
    if (!(Number(amount) >= 1 && Number(amount) <= 10000)) {
      toast.error("Amount mist be between 1 and 10000", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (Number(amount) > 10000) {
      toast.error("You can't add more than 10000 to wallet at a time", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (Number(amount) + Number(profile.walletMoney) >= 25000) {
      toast.error("You can't have more than 25000 in your wallet", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const body = {
      token: token,
      product: {
        amount: Number(amount) * 100,
      },
    };
    fetch("https://shanann.herokuapp.com/user/addmoneytowallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const body1 = {
          amount: Number(amount),
        };
        if (data.statusCode === 200) {
          toast.success("Money added to wallet succesully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetch("https://shanann.herokuapp.com/user/updatewalletmoney", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              jwt: jwt,
            },
            body: JSON.stringify(body1),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setAmount(0);
              let val = !amountChanged;
              setAmountChanged(val);
            });
        } else {
          toast.error("Some thing went wrong", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      {loading === true && <h3 style={{ margin: "auto" }}>loading...</h3>}
      {profile !== {} && loading === false && (
        <div className="profile-user">
          <h1>Hello {profile.name},</h1>
          <h3>
            {" "}
            The difference between the rich and the poor, is finding true love.
          </h3>
          <div className="password-profile">
            <h2>Your Wallet Balence is: ₹{profile.walletMoney}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="Number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => {
                  if (e.target.value < 0) {
                    setAmount(0);
                  } else if (e.target.value <= 10000) {
                    setAmount(e.target.value);
                  } else {
                    setAmount(10000);
                  }
                }}
              ></input>
              <StripeCheckout
                stripeKey="pk_test_51L5uAXSJiwyNXGlnKTT6vpHrQmN1urZHLeVuPaMxOL8jQQ3J6XzlkDQrhDxeN06cgaBWilG6v7b3a4wC6ib157IF00y7d7VDAt"
                currency="INR"
                token={handleToken}
                amount={amount * 100}
                name="Add money to wallet"
              ></StripeCheckout>
            </form>
          </div>
          <div className="profile">
            <form onSubmit={onsubmit} className="password-form">
              <h3 className="password-form-head">Change Password: </h3>
              <div className="password-form-item">
                <label>Current Password</label>
                <br></br>
                <input
                  type="Password"
                  placeholder="Enter current password"
                  onChange={(e) => setCurrPassword(e.target.value)}
                />
              </div>
              <div className="password-form-item">
                <label>New Password</label>
                <br></br>
                <input
                  type="Password"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="password-form-item">
                <label>Confirm Password</label>
                <br></br>
                <input
                  type="Password"
                  placeholder="Enter new password again"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <button>submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
