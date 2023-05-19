import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        // <section className="welcome">

            // {/* <p>{today}</p>

            // <h1>Welcome!</h1> */}

            // {/* <p><Link to="/dash/menu">View Menu</Link></p>

            // <p><Link to="/dash/about">View About</Link></p>

            // <p><Link to="/dash/gallery">View Gallery</Link></p>

            // <p><Link to="/dash/contact">View Contact</Link></p> */}

        // {/* </section> */}

        <div >
            <div >
                {/* <img src="path-to-your-image.jpg" alt="Banner Image" class="max-w-full"> */}
            </div>
            <div class="flex-1 flex flex-col justify-center items-start py-20 border mx-auto w-3/5">
                <h1 className="text-[clamp(2rem,5vw,4rem)] text-[#4c4c4c] max-w-[600px]">Your Favourite Food Delivered Hot & Fresh</h1>
                <p className="text-[clamp(1rem,3vw,1.5rem)] max-w-[500px] text-[#6a6a6a] mx-0 my-6">Healthy switcher chefs do all the prep work, like peeding, chopping
                & marinating, so you can cook a fresh food.</p>
                <button className="bg-red-700 text-[1.1rem] cursor-pointer font-semibold text-[white] transition-[0.2s] flex items-center justify-center px-10 py-4 rounded-[5rem] border-[none] hover:bg-red-900">
                <Link to="/dash/menu">Order Now</Link>
                </button>
            </div>
        </div>
    )

    return content
}
export default Welcome