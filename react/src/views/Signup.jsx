import { useState } from 'react'
import {Link} from 'react-router-dom'
import axiosClient from '../views/axios'
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

  const {setCurrentUser, setUserToken} = useStateContext();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({__html: ''});
  const [message, setMessage] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: ''})

    if(password != passwordConfirmation) {
      console.log('Password does not match');
      setMessage('Confirm Password does not match');
    }
    else {

    
    axiosClient.post('/signup', {
      name: fullName,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
      .then(({data}) =>{
        setCurrentUser(data.user);
        setUserToken(data.token);
        setMessage(data.message);
      })
      .catch((error) =>{
        if(error.response){
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next)=>[ ...accum, ...next] , [])
          console.log(finalErrors)
          setError({__html: finalErrors.join('<br>')})
        }
        console.error(error)
      });
    }
  } 

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Signup for free
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
       { message && (<div className='bg-green-500 rounded py-2 px-3 text-white' >{message}</div>)}
        
        {error.__html && (
        <div className='bg-red-500 rounded py-2 px-3 text-white' dangerouslySetInnerHTML={error}></div>
        )}
        {/* {error.__html && (
  <div className='bg-red-500 rounded py-2 px-3 text-white' dangerouslySetInnerHTML={error}></div>
)} */}


          <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">

            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
             
              <div className="">
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  required
                  value={fullName}
                  onChange={ev=> setFullName(ev.target.value)}
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Full Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={ev=> setEmail(ev.target.value)}
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-1 text-gray-900">
                  Password
                </label>

              </div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={ev=> setPassword(ev.target.value)}
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password-confirmation" className="block text-sm font-medium  text-gray-900">
                  Confirm Password 
                </label>
                
              </div>
              <div className="">
                <input
                  id="password-confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={passwordConfirmation}
                  onChange={ev=> setPasswordConfirmation(ev.target.value)}
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Confirm Password"
                />
              </div>
            </div>
           
            <div> 
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login with your account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
