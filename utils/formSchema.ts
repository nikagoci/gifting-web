import * as yup from "yup";

export function signUpSchema() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is short")
      .max(20, "Passoword is long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords do not match")
      .required("Confirm password is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(9, "Invalid phone format")
      .max(9, "Invalid phone format"),
  });

  return schema;
}

export function loginSchema() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is short")
      .max(20, "Passoword is long"),
  });

  return schema;
}

export function addProductSchema() {
  const schema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    image: yup.string().required('Image is required'),
    city: yup.string().required('City is required'),
    category: yup.string().required('Category is required'),
    gender: yup.string().required('Gender is required'),
    description: yup.string().required('Description is required'),
  })

  return schema
}