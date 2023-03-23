import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdMail, IoMdLock } from "react-icons/io";
import { faFacebookF, faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
function Login() {
  const strategies = {
    google:{ 
      handler: () => console.log('use google'),
      icon: <FontAwesomeIcon icon={faGoogle} />
    },
    tweeter: {
      handler: () => console.log('use tweeter'),
      icon: <FontAwesomeIcon icon={faTwitter} />
    },
    github: {
      handler: () => console.log('use github'),
      icon: <FontAwesomeIcon icon={faGithub} />
    },
    facebook: {
      handler: () => console.log('use facebook'),
      icon: <FontAwesomeIcon icon={faFacebookF} />
    }
  }
  return (
    <section className='login window'>
      <h2>Auth Wiedersehen</h2>
      <h1>Login</h1>
      <form action="">
        <div className="input-box">
          <input id="input-email" type="email" required />
          <label htmlFor="input-email"><IoMdMail /> Email</label>
        </div>

        <div className="input-box">
          <input id="input-password" type="password" required />
          <label htmlFor="input-password" className="input-password"><IoMdLock /> Password</label>
        </div>
        
        <button>Login</button>
      </form>
      <p>or continue with these social profiles</p>
      <div className="social-strategy-list">
        { Object.keys(strategies).map( (media, idx) => {
          return <button key={`login-strategy-${Object.keys(strategies)[idx]}`} className="social-container" onClick={strategies[media as keyof typeof strategies].handler}>{strategies[media as keyof typeof strategies].icon}</button>
        })}
      </div>
      <p>Don’t have an account yet? Register</p>
    </section>
  )
}

export default Login