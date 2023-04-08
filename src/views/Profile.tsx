import { FaUserAlt } from "react-icons/fa"
import { useUser } from "../hooks"
import { fieldOrder } from "../data"
import { Link } from "react-router-dom"
//todo add in photo logic
function Profile() {
    const {user} = useUser()

    if(!user){
        return (<>
        </>)
    }
    return (
        <main className="profile-page">
            <header className="profile-header">
                <h1 data-theme="headline">Personal info</h1>
                <h3 data-theme="headline">Basic info, like your name and photo</h3>
            </header>
            <article className="profile window">
                <section className="profile-top">
                    <div>
                        <h2 data-theme="headline">Profile</h2>
                        <p data-theme="text">Some info may be visible to other people</p>
                    </div>
                    <Link to="/profile-edit">
                        <button data-theme="text background">Edit</button>
                    </Link>
                </section>
                <section>
                    <span>PHOTO</span>
                    {user.photo ?
                     (<></>) 
                     : 
                     (
                     <div className="placeholder-photo-container">
                        <div className="placeholder-photo" data-theme="call-to-action"><FaUserAlt /></div>
                     </div>)}
                </section>
                {fieldOrder.map(field => {
                    return (
                        <section key={field}>
                            <span>{field.toUpperCase()}</span>
                            <h3 data-theme="headline">{user[field as keyof typeof user]}</h3>
                        </section>
                    )
                })}
                <p className="footnote creator text" data-theme="text">created by <u><b>Erez Eitan</b></u></p>
                <p className="footnote credit text" data-theme="text">devChallenges.io</p>
            </article>
        </main>
    )
}

export default Profile