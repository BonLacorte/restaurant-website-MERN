import { useState, useEffect } from "react"
import { useUpdateProductMutation, useDeleteProductMutation } from "./adminProductsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { CATEGORIES } from "../../../config/categories"

const PRODUCT_NAME_REGEX = /^.{2,25}$/;
const DESCRIPTION_REGEX = /^.{2,100}$/;
// const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

const AdminEditProductForm = ({ product }) => {
    
    const [updateProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProductMutation()

    const [deleteProduct, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProductMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(product.name);
    const [validName, setValidName] = useState(false)
    const [description, setDescription] = useState(product.description);
    const [validDescription, setValidDescription] = useState(false)
    const [price, setPrice] = useState(product.price);
    const [validPrice, setValidPrice] = useState(false)
    const [category, setCategory] = useState(product.category);
    const [image, setImage] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        setValidName(PRODUCT_NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidDescription(DESCRIPTION_REGEX.test(description))
    }, [description])

    // useEffect(() => {
    //     setValidPrice(PRICE_REGEX.test(price))
    // }, [price])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setName('')
            setDescription('')
            setPrice('')
            setCategory('')
            setImage([])
            setImagesPreview([])
            navigate('/admin/dash/products')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = (e) => setName(e.target.value);
    const onDescriptionChanged = (e) => setDescription(e.target.value);
    const onPriceChanged = (e) => setPrice(e.target.value);
    const onCategoryChanged = (e) => setCategory(e.target.value);
    // const onAvailableChanged = () => setActive(prev => !prev)

    //handle and convert it in base 64
    const handleImage = (e) =>{

        const files = Array.from(e.target.files);

        console.log("files:", files);
        // Empty the image array (reset)
        setImage([]);
        setImagesPreview([]);

        // const file = e.target.files[0];

        files.forEach((file) => {
            const reader = new FileReader();
        
            reader.onload = () => {
                if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
                setImage((old) => [...old, reader.result]);
                }
            };
        
            reader.readAsDataURL(file);


            // setFileToBase(file);
            console.log(file);
            console.log("image length:", image.length);
        });
    }

    // const onActiveChanged = () => setActive(prev => !prev)

    const onSaveProductClicked = async (e) => {
        if (canSave) {
            await updateProduct({ id: product.id, name, description, price, category, image })
        }
    }

    const onDeleteProductClicked = async () => {
        await deleteProduct({ id: product.id })
    }

    const options = Object.values(CATEGORIES).map(category => {
        return (
            <option
                key={category}
                value={category}

            > {category}</option >
        )
    })
    
    const canSave = [validName, validDescription].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    return (
        <div className="container mx-auto px-4">
        <form className="max-w-md mx-auto mt-8" onSubmit={e => e.preventDefault()}>
            <h2 className="text-2xl mb-4">Edit Product</h2>
            <div className="flex justify-between">
                <button
                    className="icon-button"
                    title="Save"
                    onClick={onSaveProductClicked}
                    disabled={!canSave}
                >
                    <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                    className="icon-button"
                    title="Delete"
                    onClick={onDeleteProductClicked}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>

                
            <label className="block mb-2" htmlFor="name">
                Product: <span className={`ml-1 ${
                    validName ? "text-green-500" : "text-red-500"
                }`}>[2-25 letters]</span></label>
            <input
                className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validName === '' ? 'text-gray-400' : ''} `}
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onNameChanged}
            />
        
            <label className="block mb-2" htmlFor="description">
                Description: <span className={`ml-1 ${
                    validDescription ? "text-green-500" : "text-red-500"
                }`}>[2-25 letters]</span></label>
            <input
                className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validDescription === '' ? 'text-gray-400' : ''} `}
                id="description"
                name="description"
                type="text"
                autoComplete="off"
                value={description}
                onChange={onDescriptionChanged}
            />
        

            <label className="block mb-2" htmlFor="price">
                Price: <span className={`ml-1 ${
                    validPrice ? "text-green-500" : "text-red-500"
                }`}></span></label>
            <input
                className={`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${price === '' ? 'text-gray-400' : ''} `}
                id="price"
                name="price"
                type="text"
                autoComplete="off"
                value={price}
                onChange={onPriceChanged}
            />
            
            
            
            <label className="block mb-2" htmlFor="category">
                Category:</label>
            <select
                id="category"
                name="category"
                className={`text-black w-[100%] py-2 px-4 mb-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent  `}
                // multiple={false}
                value={category}
                onChange={onCategoryChanged}
            >
                {options}
            </select>

            <label className="block mb-2" htmlFor="image">
            image:
            </label>
            <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImage}
                multiple
            />

            <div className="grid grid-cols-3 gap-4 py-2">
                {imagesPreview.map((image, index) => (
                    <img className="w-full h-auto object-contain" key={index} src={image} alt="Product Preview" />
                ))}
            </div>
                
            {/* </div> */}
        </form>
        </div>
    )
}

export default AdminEditProductForm