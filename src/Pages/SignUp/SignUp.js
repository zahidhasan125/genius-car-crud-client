import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import svg from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const currentUser = {
                    email: user.email
                }
                fetch('https://genius-car-server-woad.vercel.app/jwt', {

                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    // send current users data (email)
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // save the token to localStorage or httpOnlyCookie
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true });
                    })
            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <div className="hero w-full">
            <div className="hero-content grid md:grid-cols-2 sm:grid-cols-1 gap-5">
                <div className="text-center lg:text-left">
                    <img src={svg} alt="" className='w-3/4' />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Enter Name" className="input input-bordered" />
                        </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Enter Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <input type='submit' className="btn btn-warning" value="Sign Up"></input>
                        </div>
                    </form>
                    <p className='text-center pb-20'>Already have an Account? <Link to='/login' className='text-orange-600 font-bold'>Please Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;