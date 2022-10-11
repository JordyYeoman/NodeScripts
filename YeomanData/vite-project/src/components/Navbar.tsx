import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
}

function Navbar() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <div style={styles.navWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={styles.loginText}>Login</div>
        <div style={styles.inputContainer}>
          <input
            placeholder="Email"
            {...register("email", { required: "Email Address is required" })}
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
  navWrapper: {
    width: "100%",
    height: "auto",
    backgroundColor: "#181818",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
};
