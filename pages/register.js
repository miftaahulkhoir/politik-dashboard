import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register({ pageProps }) {
  const router = useRouter();
  const [NIK, setNIK] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.APP_BASEURL}api/register`, {
        nik: NIK,
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        password: password,
      })
      .then((res) => {
        handleLogin();
      })
      .catch((err) => {});
  };

  const handleLogin = () => {
    axios
      .post(`${process.env.APP_BASEURL}api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {});
  };

  return (
    <>
      <section className='py-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='codex-authbox'>
                <div className='auth-header'>
                  <div className='codex-brand'>
                    <a>
                      <img
                        style={{ width: "60px" }}
                        src={`${process.env.APP_BASEURL}images/logo/icon-logo.png`}
                        alt=''
                      />
                      <img
                        className='img-fluid light-logo'
                        src={`${process.env.APP_BASEURL}images/logo/logo.png`}
                        alt=''
                      />
                    </a>
                  </div>
                  <h3>Create your account</h3>
                  <h6>
                    Already have an account?{" "}
                    <a
                      className='text-primary'
                      onClick={() => router.push("/login")}>
                      login in here
                    </a>
                  </h6>
                </div>
                <form onSubmit={handleRegister}>
                  <div className='form-group'>
                    <label className='form-label'>NIK</label>
                    <input
                      className='form-control'
                      type='number'
                      onChange={(e) => setNIK(e.target.value)}
                      name='NIK'
                      placeholder='Enter Your NIK'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Name</label>
                    <input
                      className='form-control'
                      type='text'
                      onChange={(e) => setName(e.target.value)}
                      name='name'
                      placeholder='Enter Your Name'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Phone Number</label>
                    <input
                      className='form-control'
                      type='number'
                      onChange={(e) => setPhone(e.target.value)}
                      name='phone'
                      placeholder='Enter Your Phone Number'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Gender</label>
                    <select
                      className='form-control'
                      name='gender'
                      onChange={(e) => setGender(e.target.value)}>
                      <option disabled selected>
                        Gender
                      </option>
                      <option value='male'>Male</option>
                      <option value='fale'>Female</option>
                    </select>
                    {/* <input
                      className='form-control'
                      type='number'
                      placeholder='Enter Your Phone Number'
                      required
                    /> */}
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input
                      className='form-control'
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      name='email'
                      placeholder='Enter Your Email'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label className='form-label' for='Password'>
                      Password
                    </label>
                    <div className='input-group group-input'>
                      <input
                        className='form-control showhide-password'
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        placeholder='Enter Your Password'
                        required=''
                      />
                      <span
                        className='input-group-text toggle-show fa fa-eye'
                        onClick={() => setShowPassword(!showPassword)}></span>
                    </div>
                  </div>
                  {/* <div className='form-group mb-0'>
                    <div className='auth-remember'>
                      <div className='form-check custom-chek'>
                        <input
                          className='form-check-input'
                          id='agree'
                          type='checkbox'
                          value=''
                          required=''
                        />
                        <label className='form-check-label' for='agree'>
                          I Agree Terms and conditions
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className='form-group'>
                    <button className='btn btn-primary' type='submit'>
                      <i className='fa fa-paper-plane'></i> Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
