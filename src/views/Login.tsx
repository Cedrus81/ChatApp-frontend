import { IoMdMail, IoMdLock } from "react-icons/io";
function Login() {
  
  return (
    <section className='login window'>
      <h2>Auth Wiedersehen</h2>
      <h1>Login</h1>
      <form action="">
        <div className="input-box">
          <label htmlFor="input-email"><IoMdMail /> Email</label>
          <input id="input-email" type="email" required />
        </div>

        <div className="input-box">
          <label htmlFor="input-password"><IoMdLock /> Password</label>
          <input id="input-password" type="password" required />
        </div>
        
        <button>Login</button>
      </form>
      <p>or continue with these social profile</p>
      <p>Don’t have an account yet? Register</p>
    </section>
  )
}

export default Login