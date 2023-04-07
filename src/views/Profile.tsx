import { FaUserAlt } from "react-icons/fa"
import { User } from "../types"
function Profile() {
    // todo get logged in user from local storage
    // todo make a fieldOrder array of the keys of the fields in the order we want to display in the UI, then map other them
    const fakeUser: User = {
        id: 23,
        email: 'xanthe.neal@gmail.com',
        name: 'Araz',
        bio: 'I am a software developer and a big fan of devchallenges...',
        phone: '908249274292',
    }
    const { email, name, bio, phone, photo} = fakeUser
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
                <button data-theme="text background">Edit</button>
            </section>
            <section>
                <span>PHOTO</span>

                {/* if user has photo */}
                {/* <img src="" alt="" /> */}

                {/* if not */}
                <div className="placeholder-photo-container">
                    <div className="placeholder-photo" data-theme="call-to-action"><FaUserAlt /></div>
                </div>
            </section>
            <section>
                <span>NAME</span>
                <h3 data-theme="headline">{name}</h3>
            </section>
            <section>
                <span>BIO</span>
                <h3 data-theme="headline">{bio}</h3>
            </section>
            <section>
                <span>PHONE</span>
                <h3 data-theme="headline">{phone}</h3>
            </section>
            <section>
                <span>EMAIL</span>
                <h3 data-theme="headline">{email}</h3>
            </section>
            <p className="footnote creator text" data-theme="text">created by <u><b>Erez Eitan</b></u></p>
            <p className="footnote credit text" data-theme="text">devChallenges.io</p>
        </article>
    </main>
  )
}

export default Profile