import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewProductMutation } from "./adminProductsApiSlice";
import { CATEGORIES } from "../../../config/categories";
// import useTitle from "../../hooks/useTitle";
import { toast } from 'react-toastify';

const AdminNewProductForm = () => {
    
    const [addNewProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProductMutation()
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState('');
    // const [image, setImage] = useState([]);
    const [image, setImage] = useState([]);
    // const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            // setName('')
            // setDescription('')
            // setPrice('')
            // setCategory('')
            // setImage([])
            // setImagesPreview([])
            // navigate('/admin/dash/products')
            toast.success('product created successfully')
        }
    }, [isSuccess, navigate])

    const onNameChanged = (e) => setName(e.target.value);
    const onDescriptionChanged = (e) => setDescription(e.target.value);
    const onPriceChanged = (e) => setPrice(e.target.value);
    const onCategoryChanged = (e) => setCategory(e.target.value);
    // const onImagesChanged = (e) => setImage(e.target.value);

    // const onCategoryChanged = e => {
    //     const values = Array.from(
    //         e.target.selectedOptions, //HTMLCollection 
    //         (option) => option.value
    //     )
    //     setCategory(values)
    // }

    //handle and convert it in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            
            setImage(reader.result);
            console.log("setImage:", setImage)
        }

    }

    const canSave = [name, description, price, category, image] 

    // console.log("canSave:", canSave);
    // console.log("addNewProduct:", addNewProduct);

    const onSaveProductClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            console.log("canSave:", canSave);
        // Perform save logic here
        // You can use the form values (name, description, price, category, available) to save the new product
        // navigate("/admin/dash/products");
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

    const errClass = isError ? "errmsg" : "offscreen"
    const validCategoryClass = !Boolean(category.length) ? 'form__input--incomplete' : ''

    return (
        <div className="container mx-auto px-4">
        <form className="max-w-md mx-auto mt-8" onSubmit={onSaveProductClicked}>
            <h2 className="text-2xl mb-4">New Product</h2>
            <div className="form__action-buttons">
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
            className="w-full py-2 px-4 mb-4 border text-black"
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-2" htmlFor="description">
            Description:
            </label>
            <textarea
            className="w-full py-2 px-4 mb-4 border text-black"
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

            <label className="block mb-2" htmlFor="price">
            Price:
            </label>
            <input
            className="w-full py-2 px-4 mb-4 border text-black"
            id="price"
            name="price"
            type="number"
            autoComplete="off"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />

            <label className="block mb-2" htmlFor="category">
                Category:</label>
            <select
                id="category"
                name="category"
                className={`text-black w-[100%] py-2 px-4 mb-4 border ${
                    validCategoryClass ? "border-green-500" : "border-red-500"
                }`}
                // multiple={false}
                value={category}
                onChange={onCategoryChanged}
            >
                {options}
            </select>

            {/* <div className="flex items-center mb-4">
            <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
            />
            </div>

            <div id="createProductFormImage" className="flex items-center mb-4"> 
            {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
            ))}
            </div> */}

            <label className="block mb-2" htmlFor="image">
            image:
            </label>
            <input
                // className="w-full py-2 px-4 mb-4 border text-black"
                id="image"
                name="image"
                type="file"
                // autoComplete="off"
                // value={image}
                onChange={handleImage}
            />
            <img className="img-fluid" src={image} alt="" />
        </form>
        </div>
    );
};

export default AdminNewProductForm;
