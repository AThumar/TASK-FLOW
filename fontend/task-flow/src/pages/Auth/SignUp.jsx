import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/layouts/inputs/ProfilePhotoSelector";
import Input from "../../components/layouts/inputs/input";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState("");


    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!fullName){
            setError("Please enter a full name");
            return;
        }
         if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }
        if(!password){
            setError("Please enter your password");
            return;
        }
        setError("");
    };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col  justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to sign up
        </p>
        <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}>  </ProfilePhotoSelector>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Input
  value={fullName}
  onChange={({ target }) => setFullName(target.value)}
  label="Full Name"
  placeholder="Enter your full name"
  type="text"
></Input>
<Input value={email}
onChange={({target})=>setEmail(target.value)}
label="Email Address"
placeholder="Enter your email"
type = "text"
></Input>
<Input value={password}
onChange={({target})=>setPassword(target.value)}
label="Password"
placeholder="Min 8 characters"
type = "password"
></Input>
<Input value={password}
onChange={({target})=>setPassword(target.value)}
label="Admin Invite Token"
placeholder="6 digit token"
type = "text"
></Input>
  </div>
{error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
<button type="submit" className="btn-primary">SIGN UP</button>
<p className="text-[13px] text-slate-800 mt-3">
    Already have an account?{" "}
    <Link className="font-medium text-primary underline" to="/Login">Login</Link>
</p>

              
          
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
