import { useForm, SubmitHandler } from "react-hook-form";
import { useAppContext } from "../AppWrapper";
import { getApiHeaders } from "../utils/auth";
import ironHeartIcon from "../assets/ironmanicon.png";
import { useEffect } from "react";

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
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Setting value: ");
        setUser({
          ...user,
          isAuthenticated: true,
        });
        localStorage.setItem("IronHeart.alpha.V0.003", result?.jwtToken);
        // Clear form
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Check localStorage for cookie
    if (localStorage.getItem("IronHeart.alpha.V0.003")) {
      setUser({
        ...user,
        isAuthenticated: true,
      });
    }
  }, []);

  return (
    <div className="flex relative px-3 py-2">
      {user?.isAuthenticated ? (
        <>
          <img
            className="absolute -top-[0.15rem] h-full -right-8 grayscale opacity-80"
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
      <h1 className="text-2xl font-black text-zinc-600 small-shadow">
        IRON HEART
      </h1>
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
