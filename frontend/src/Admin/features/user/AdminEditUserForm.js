import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./adminUsersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../../config/roles"

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const NAME_REGEX = /^[A-Za-z]{2,25}$/
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const MOBILE_NUMBER_REGEX = /^(\+?63|0)9\d{9}$/

const AdminEditUserForm = ({ user }) => {
    
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState(user.firstname)
    const [validFirstname, setValidFirstname] = useState(false)
    const [lastname, setLastname] = useState(user.lastname)
    const [validLastname, setValidLastname] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [validEmail, setValidEmail] = useState(false)
    const [mobileNumber, setMobileNumber] = useState(user.mobileNumber)
    const [validMobileNumber, setValidMobileNumber] = useState(false)
    const [roles, setRoles] = useState(user.roles)

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
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setFirstname('')
            setLastname('')
            setPassword('')
            setRoles([])
            setEmail('')
            setPassword('')
            setMobileNumber('')
            navigate('/admin/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onMobileNumberChanged = e => setMobileNumber(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    // const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, firstname, lastname, password, email, mobileNumber, roles })
        } else {
            await updateUser({ id: user.id, firstname, lastname, email, mobileNumber, roles })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validFirstname, validLastname, validEmail, validPassword, validMobileNumber].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validFirstname, validLastname, validEmail, validMobileNumber].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <div className="container mx-auto px-4">
                <p className={errClass}>{errContent}</p>

                <form className="max-w-md mx-auto mt-8" onSubmit={e => e.preventDefault()}>
                    <h2 className="text-2xl mb-4">Edit User</h2>

                    <div className="flex justify-between">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>

                    {/* <div className="flex justify-between"> */}
                        <div className="">
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
                        </div>
                        
                        <div className="">
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
                        </div>
                        
                        <div className="">
                            <label className="block mb-2" htmlFor="email">
                                Email: <span className={`ml-1 ${
                                    validEmail ? "text-green-500" : "text-red-500"
                                }`}></span></label>
                            <input
                                className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validEmail === '' ? 'text-gray-400' : ''} `}
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="off"
                                value={email}
                                onChange={onEmailChanged}
                            />
                        </div>
                        
                        <div className="">
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
                        </div>
                        
                        <div className="">
                            <label className="block mb-2" htmlFor="password">
                                Password: 
                                <span className={`ml-1 ${ password === "" ? 
                                    "text-green-500" : "text-red-500"
                                }`}>
                                    [empty = no change]
                                </span> <span className={`ml-1 ${ validPassword ? 
                                    "text-green-500" : "text-red-500"
                                }`}>[4-12 chars incl. !@#$%]</span></label>
                            <input
                                className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validPassword || password === "" ? 'text-gray-400' : ''} `}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                        </div>
                        
                        <div className="">
                            <label className="block mb-2" htmlFor="roles">
                                ASSIGNED ROLES:</label>
                            <select
                                id="roles"
                                name="roles"
                                className={`text-black w-[100%] py-2 px-4 mb-4 border ${
                                    validRolesClass ? "border-green-500" : "border-red-500"
                                }`}
                                multiple={true}
                                size="3"
                                value={roles}
                                onChange={onRolesChanged}
                            >
                                {options}
                            </select>
                        </div>
                        
                    {/* </div> */}
                </form>
            </div>
        </>
    )

    return content    
}

export default AdminEditUserForm