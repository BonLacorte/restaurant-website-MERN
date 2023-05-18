import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewProductMutation } from "./adminProductsApiSlice";
import { CATEGORIES } from "../../../config/categories";
// import useTitle from "../../hooks/useTitle";
import { toast } from 'react-toastify';

const PRODUCT_NAME_REGEX = /^.{2,25}$/;
const DESCRIPTION_REGEX = /^.{2,100}$/;
// const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

const AdminNewProductForm = () => {
    
    const [addNewProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProductMutation()
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [description, setDescription] = useState("");
    const [validDescription, setValidDescription] = useState(false);
    const [price, setPrice] = useState("");
    const [validPrice, setValidPrice] = useState(false);
    const [category, setCategory] = useState('');
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
        if (isSuccess) {
            setName('')
            setDescription('')
            setPrice('')
            setCategory('')
            setImage([])
            setImagesPreview([])
            navigate('/admin/dash/products')
            toast.success('product created successfully')
        }
    }, [isSuccess, navigate])

    const onNameChanged = (e) => setName(e.target.value);
    const onDescriptionChanged = (e) => setDescription(e.target.value);
    const onPriceChanged = (e) => setPrice(e.target.value);
    const onCategoryChanged = (e) => setCategory(e.target.value);
    // const onImagesChanged = (e) => setImage(e.target.value);



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

    // const setFileToBase = (file) =>{
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () =>{
            
    //         setImage(reader.result);
    //         console.log("setImage:", setImage)
    //     }
    // }

    const canSave = [validName, validDescription, price, category, image] 

    // console.log("canSave:", canSave);
    // console.log("addNewProduct:", addNewProduct);

    const onSaveProductClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            console.log("canSave:", canSave);

            await addNewProduct({ name, description, price, category, image  }) //image
        }
    };

    const options = Object.values(CATEGORIES).map(category => {
        return (
            <option
                key={category}
                value={category}

            > {category}</option >
        )
    })

    return (
        <div className="container mx-auto px-4">
        <form className="max-w-md mx-auto mt-8" onSubmit={onSaveProductClicked}>
            <h2 className="text-2xl mb-4">New Product</h2>
            <div className="">
                <button
                    className="icon-button"
                    title="Save"
                    type="submit"
                    disabled={!canSave}
                >
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </div>

            <label className="block mb-2" htmlFor="name">
            Name:
            </label>
            <input
            className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validName === '' ? 'text-gray-400' : ''} `}
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
            />

            <label className="block mb-2" htmlFor="description">
            Description:
            </label>
            <textarea
            className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${validDescription === '' ? 'text-red-400' : ''} `}
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={onDescriptionChanged}
            />

            <label className="block mb-2" htmlFor="price">
            Price:
            </label>
            <input
            className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${price === '' ? 'text-gray-400' : ''} `}
            id="price"
            name="price"
            type="number"
            autoComplete="off"
            value={price}
            onChange={onPriceChanged}
            />

            <label className="block mb-2" htmlFor="category">
                Category:</label>
            <select
                id="category"
                name="category"
                className={`text-black w-[100%] py-2 px-4 mb-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent `}
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
        </form>
        </div>
    );
};

export default AdminNewProductForm;
