import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/menu">View Menu</Link></p>

            <p><Link to="/dash/about">View About</Link></p>

            <p><Link to="/dash/gallery">View Gallery</Link></p>

            <p><Link to="/dash/contact">View Contact</Link></p>

        </section>
    )

    return content
}
export default Welcome