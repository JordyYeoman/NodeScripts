import { useForm, SubmitHandler } from "react-hook-form";
import { useAppContext } from "../AppWrapper";
import { getApiHeaders, refreshTimedOut } from "../utils/auth";
import ironHeartIcon from "../assets/ironmanicon.png";
import { useEffect } from "react";
import { AppStateOptions } from "../config/appStateOptions";

interface IFormInputs {
  email: string;
  password: string;
}

function Navbar() {
  const { user, setUser } = useAppContext();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<any> = (data) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", data?.email);
    urlencoded.append("password", data?.password);

    var requestOptions = {
      method: "POST",
      headers: getApiHeaders(),
      body: urlencoded,
    };

    fetch("http://localhost:5000/api/auth/", {
      ...requestOptions,
      // @ts-ignore: Unreachable code error
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        setUser({
          ...user,
          isAuthenticated: true,
          authenticationTime: Date.now(),
        });
        localStorage.setItem("IronHeart.alpha.V0.003", result?.jwtToken);
        localStorage.setItem("AuthTime", Date.now().toString());
        // Clear form
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Check if localStorage item exists
    let token = localStorage.getItem("IronHeart.alpha.V0.003");
    let authTime = localStorage.getItem("AuthTime");

    if (token && authTime) {
      // check auth time
      if (refreshTimedOut(parseFloat(authTime))) {
        console.log("authTime", authTime);
        setUser({
          isAuthenticated: false,
          authenticationTime: null,
        });
        // Clear localstorage token
        localStorage.removeItem("IronHeart.alpha.V0.003");
        localStorage.removeItem("AuthTime");
        return;
      } else {
        setUser({
          ...user,
          isAuthenticated: true,
        });
      }
    }
  }, []);

  return (
    <div className="flex relative px-5 py-2 overflow-hidden">
      {user?.isAuthenticated ? (
        <>
          <img
            className="transition duration-250 cursor-pointer absolute -top-[0.15rem] h-full -right-8 grayscale opacity-80 hover:grayscale-0"
            src={ironHeartIcon}
            alt="IronHeart Icon"
          />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={styles.loginText}>Login</div>
            <div style={styles.inputContainer}>
              <input
                placeholder="Email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p role="alert">{errors.email?.message}</p>}
              <input
                placeholder="Password"
                type="password"
                {...register("password", { pattern: /^[a-zA-Z0-9_.-]*$/i })}
              />
              <input type="submit" />
            </div>
          </form>
        </>
      )}
      <div className="flex flex-col">
        <h1 className="text-2xl font-black small-shadow">
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            I
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            R
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            O
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            N
          </span>{" "}
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            H
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            E
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            A
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            R
          </span>
          <span className="text-zinc-600 transition duration-250 hover:text-zinc-200 cursor-pointer">
            T
          </span>
        </h1>
        <h4 className="uppercase font-black font-dogica-pixel-bold h-[6px] -mt-[12px] text-[6px] m-0 p-0 tracking-[2.65px]">
          Biological Defense
        </h4>
      </div>
    </div>
  );
}

export default Navbar;

const styles = {
  loginText: {
    padding: 0,
    width: "auto",
    color: "white",
    fontWeight: "bold",
    fontSize: 6,
    marginTop: "-12px",
  },
  icon: {
    transform: "scaleX(-1) rotate(-15deg)",
    height: "110px",
    margin: "-25px",
    position: "absolute",
    left: "-44px",
  },
  navWrapper: {
    height: "auto",
    backgroundColor: "#181818",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative",
    minHeight: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
};
