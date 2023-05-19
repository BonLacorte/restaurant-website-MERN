import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./adminUsersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../../config/roles"
// import useTitle from "../../hooks/useTitle"

// const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const NAME_REGEX = /^[A-Za-z]{2,25}$/
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const MOBILE_NUMBER_REGEX = /^(\+?63|0)9\d{9}$/

const AdminNewUserForm = () => {
    
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [mobileNumber, setMobileNumber] = useState('')
    const [validMobileNumber, setValidMobileNumber] = useState(false)
    const [roles, setRoles] = useState(["Employee"])
    const [avatar, setAvatar] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState([]);

    useEffect(() => {
      setValidFirstname(NAME_REGEX.test(firstname))
    }, [firstname])

    useEffect(() => {
      setValidLastname(NAME_REGEX.test(lastname))
    }, [lastname])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
      setValidMobileNumber(MOBILE_NUMBER_REGEX.test(mobileNumber))
    }, [mobileNumber])

    useEffect(() => {
        if (isSuccess) {
            setFirstname('')
            setLastname('')
            setPassword('')
            setRoles([])
            setEmail('')
            setPassword('')
            setMobileNumber('')
            setAvatar([])
            setAvatarPreview([])
            navigate('/admin/dash/users')
        }
    }, [isSuccess, navigate])

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onMobileNumberChanged = e => setMobileNumber(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    //handle and convert it in base 64
    const handleImage = (e) =>{

        const file = e.target.files[0];

        // Empty the image state (reset)
        setAvatar([]);
        setAvatarPreview([]);

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const canSave = [roles.length, validFirstname, validLastname, validEmail, validPassword, validMobileNumber, avatar].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            console.log("canSave:", canSave);
            await addNewUser({ firstname, lastname, password, email, roles, mobileNumber, avatar })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const content = (
        <>
            <div className="container mx-auto px-4">
                <p className={errClass}>{error?.data?.message}</p>

                <form className="max-w-md mx-auto mt-8" onSubmit={e => e.preventDefault()}>
                    <h2 className="text-2xl mb-4">New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                    

                    <label className="block mb-2" htmlFor="firstname">
                        Firstname: <span className={`ml-1 ${
                            validFirstname ? "text-green-500" : "text-red-500"
                        }`}>[2-25 letters]</span></label>
                    <input
                        className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validFirstname === '' ? 'text-gray-400' : ''} `}
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="off"
                        value={firstname}
                        onChange={onFirstnameChanged}
                    />

                    <label className="block mb-2" htmlFor="lastname">
                        Lastname: <span className={`ml-1 ${
                            validLastname ? "text-green-500" : "text-red-500"
                        }`}>[2-25 letters]</span></label>
                    <input
                        className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validLastname === '' ? 'text-gray-400' : ''} `}
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="off"
                        value={lastname}
                        onChange={onLastnameChanged}
                    />

                    <label className="block mb-2" htmlFor="email">
                        Email: <span className={`ml-1 ${
                            validEmail ? "text-green-500" : "text-red-500"
                        }`}>Validate</span></label>
                    <input
                        className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validEmail === '' ? 'text-gray-400' : ''} `}
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="off"
                        value={email}
                        onChange={onEmailChanged}
                    />

                    <label className="block mb-2" htmlFor="mobileNumber">
                        Mobile No.: <span className={`ml-1 ${
                            validMobileNumber ? "text-green-500" : "text-red-500"
                        }`}></span></label>
                    <input
                        className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validMobileNumber === '' ? 'text-gray-400' : ''} `}
                        id="mobileNumber"
                        name="mobileNumber"
                        type="text"
                        autoComplete="off"
                        value={mobileNumber}
                        onChange={onMobileNumberChanged}
                    />

                    <label className="block mb-2" htmlFor="password">
                        Password: 
                        <span className={`ml-1 ${
                                    validPassword ? "text-green-500" : "text-red-500"
                                }`}>[4-12 chars incl. !@#$%]</span></label>
                    <input
                        className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validPassword === '' ? 'text-gray-400' : ''} `}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />

                    <label className="block mb-2" htmlFor="roles">
                        ASSIGNED ROLES:</label>
                    <select
                        id="roles"
                        name="roles"
                        className={
                            `w-full py-2 px-4 mb-4 border text-black 
                            border-green-500 rounded-md focus:outline-none 
                            focus:ring-2 focus:ring-green-600 
                            focus:border-transparent 
                            ${validRolesClass ? 'text-gray-400' : ''} `}
                        multiple={true}
                        size="3"
                        value={roles}
                        onChange={onRolesChanged}
                    >
                        {options}
                    </select>


                    <label className="block mb-2" htmlFor="image">
                        Avatar:
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                    <div className="grid grid-cols-3 gap-4 py-2">
                        {avatarPreview.map((avatar, index) => (
                            <img className="w-full h-auto object-contain" key={index} src={avatar} alt="User Preview" />
                        ))}
                    </div>

                </form>
            </div>
        </>
    )

    return content
}

export default AdminNewUserForm