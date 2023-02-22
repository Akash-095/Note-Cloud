import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:"",name:"",cpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
      
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully","success")
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
      }

  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
    <div className='text-center'><h2>Sign-Up</h2></div>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name'  value={credentials.name}  onChange={onChange}  id="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email}  onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} minLength={8} required id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" value={credentials.cpassword} onChange={onChange}  minLength={8} required id="cpassword"/>
  </div>
  <button type="submit" disabled={credentials.cpassword !== credentials.password} className="btn btn-primary">Submit</button>
</form>
</>
  )
}
export default Signup