import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {query, where, getDoc, getDocs, doc} from 'firebase/firestore';
import { usersRef } from './firebase/Firebase';
import bcrypt from 'bcryptjs'
import swal from 'sweetalert';
const Loginn = () => {
    const [form,setForm] = useState({
      mobile : "",
      password: ""
    });
    const [loading,setLoading] = useState(false);

    const login = async () => {
      setLoading(true);
      try{
        const quer = query(usersRef, where('mobile', '==', form.mobile));
        const querysnapshot= await getDocs(quer);

        querysnapshot.forEach((doc) => {
          const _data = doc.data();
          const isUser = bcrypt.compareSync(form.password, _data.password);
          if(isUser){
            swal({
              title : ' Logged In',
              icon: 'success',
              buttons: false,
              timer:3000
            })
           
          } else{
        swal({
          title : 'Invalid Credentials',
          icon: 'error',
          buttons: false,
          timer:3000
      })
    }
  })
}
      catch(error){
        swal({
          title : error.message,
          icon: 'error',
          buttons: false,
          timer:3000
      })
       
      }
      setLoading(false);
    
  }
    return (
    <div className='w-full flex flex-col mt-8 items-center'>
        <h1 className='text-xl font-bold'>Login</h1>

        <div class="p-2 w-1/3">
                <div class="relative">
                  <label for="Year" class="leading-7 text-sm text-gray-200">Phone Number</label>
                  <input 
                    type={"number"}
                    id="email"
                    name="email"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
        
              <div class="p-2 w-1/3">
                <div class="relative">
                  <label for="Year" class="leading-7 text-sm text-gray-200">Password</label>
                  <input 
                    type="message"
                    id="email"
                    name="email"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <div class="p-2 w-full">
                <button 
                onClick={login}
                class="flex mx-auto text-white
                 bg-orange-700 border-0 py-2 px-8
                  focus:outline-none hover:bg-green-900 
                  rounded text-lg">
                  {loading ? <TailSpin height={20} color='blue'/> : 'Login'}
              </button>
              </div>
            <div>
              <p>Do not have account? <Link to={'/Signup'}><span className='text-blue-500 '>Sign Up</span></Link></p>
            </div>
    </div>
  )
}

export default Loginn