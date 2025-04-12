import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Loader from "components/Loader.jsx";
import BASE_URL from "../../url.js";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.mixed().notRequired().nullable(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const register = async (values, onSubmitProps) => {
    console.log("REGISTERING");
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    let flag = false;
    if (values.picture) {
      console.log(values.picture);
      const fileExtension = values.picture.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["jpg", "jpeg", "png"]; // Add more extensions if needed

      if (allowedExtensions.includes(fileExtension)) {
        formData.append("picturePath", values.picture.name);
      } else {
        flag = true;
        toast.error("Invalid Image file extension only support jpg, jpeg, png");
      }
    }

    // setIsLoading(true);
    if (!flag) {
      const savedUserResponse = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: formData,
      });
      if (savedUserResponse.status === 201) {
        setIsLoading(true);
        setPageType("login");
        toast.success("successfully registered");
      } else if (savedUserResponse.status === 400)
        toast.error("Email already registered");
      else if (savedUserResponse.status === 500)
        toast.error("registration failed");
    } else {
      toast.error("registration failed");
    }
    onSubmitProps.resetForm();
    // setIsLoading(false);
  };

  const login = async (values, onSubmitProps) => {
    console.log("LOGGING IN");
    console.log(values);

    const loggedInResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    if (!loggedIn.msg) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      toast.success("successfully logged in");
      navigate("/home");
    } else {
      toast.error("invalid credentials");
    }

    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);
    if (pageType === "login") await login(values, onSubmitProps);
    else await register(values, onSubmitProps);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={
            pageType === "login" ? initialValuesLogin : initialValuesRegister
          }
          validationSchema={pageType === "login" ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {pageType !== "login" && (
                  <>
                    <TextField
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Occupation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={
                        Boolean(touched.occupation) &&
                        Boolean(errors.occupation)
                      }
                      helperText={touched.occupation && errors.occupation}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <Box
                      gridColumn="span 4"
                      border={`1px solid ${palette.neutral.medium}`}
                      borderRadius="5px"
                      p="1rem"
                    >
                      <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("picture", acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                          >
                            <input {...getInputProps()} />
                            {!values.picture ? (
                              <p>Add Picture Here</p>
                            ) : (
                              <FlexBetween>
                                <Typography>{values.picture.name}</Typography>
                                <EditOutlinedIcon />
                              </FlexBetween>
                            )}
                          </Box>
                        )}
                      </Dropzone>
                    </Box>
                  </>
                )}

                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              {/* BUTTONS */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {pageType === "login" ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(pageType === "login" ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  {pageType === "login"
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
export default Form;
