import { getAuth } from "firebase/auth";
import app from "./firebase"; // make sure this is the correct path

const auth = getAuth(app);

export default auth;
