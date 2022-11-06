import React, { useContext } from 'react';
import svg from '../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';


const Login = () => {
    const { loginUser, googleSignIn } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const currentUser = {
                    email: user.email
                }

                // make an api call to server route for jwt
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
                console.error(err);
            })

    }
    const handleGoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
            })
    }
    return (
        <div className="hero w-full">
            <div className="hero-content grid md:grid-cols-2 sm:grid-cols-1 gap-5">
                <div className="text-center lg:text-left">
                    <img src={svg} alt="" className='w-3/4' />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl text-center font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="Your Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link to="" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type='submit' className="btn btn-warning" value="Login"></input>
                        </div>
                    </form>
                    <button onClick={handleGoogle} className='btn btn-sm btn-success w-1/2 mx-auto'>Login With Google</button>
                    <p className='text-center pb-20'>New to Car Genius? <Link to='/signup' className='text-orange-600 font-bold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;