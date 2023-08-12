import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

// Get the image hosting token from environment variables
const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddProduct = () => {

    // Construct the image hosting URL
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    // useForm hook for form handling
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    // Function to handle adding a product
    const handelAddProduct = async (data) => {
        const { name, price, quantity, rating, description, image } = data;

        // Create a FormData object for image upload
        const formData = new FormData();
        formData.append("image", image[0]);

        try {
            const response = await fetch(img_hosting_url, {
                method: "POST",
                body: formData,
            });

            const imgResponse = await response.json();

            if (imgResponse.success) {
                const imgURL = imgResponse.data.display_url;
                const addedProduct = {
                    product_name: name,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    rating: parseFloat(rating),
                    description,
                    image: imgURL,
                };

                // Add the product to the server
                const addProductResponse = await fetch(
                    "http://localhost:5000/products",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(addedProduct),
                    }
                );

                const data = await addProductResponse.json();

                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Product Added Successfully!",
                        icon: "success",
                        confirmButtonText: "Cool",
                    });
                    reset();
                }
            } else {
                console.error("Image upload error:", imgResponse.error);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="h-full">
            <Helmet>
                <title>REPLIQ | Add Product</title>
            </Helmet>
            <div>
                <SectionTitle heading="Add Product" />
            </div>
            <div className="bg-slate-200 rounded-lg shadow-xl mt-5 ">
                <Fade>
                    <form
                        onSubmit={handleSubmit(handelAddProduct)}
                        className="w-[80%] mx-auto "
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    name="name"
                                    id="name"
                                    className="input input-bordered"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && (
                                    <p className="text-red-600">Product name is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo*</span>
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                                    {...register("image", { required: true })}
                                />
                                {errors.image && (
                                    <p className="text-red-600">Image is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Quantity*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    name="quantity"
                                    id="quantity"
                                    className="input input-bordered"
                                    {...register("quantity", { required: true })}
                                />
                                {errors.quantity && (
                                    <p className="text-red-600">Quantity is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    id="price"
                                    className="input input-bordered"
                                    {...register("price", { required: true })}
                                />
                                {errors.price && (
                                    <p className="text-red-600">Price is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Rating"
                                    name="rating"
                                    id="rating"
                                    className="input input-bordered"
                                    step="any" // Allow any step value, which includes decimal values
                                    {...register("rating", {
                                        required: "Rating is required",
                                        validate: {
                                            withinRange: (value) =>
                                                (value >= 1 && value <= 5) || "Rating must be between 1 and 5",
                                        },
                                    })}
                                />
                                {errors.rating && (
                                    <p className="text-red-600">{errors.rating.message}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    id="description"
                                    className="textarea textarea-info"
                                    {...register("description", { required: true })}
                                />
                                {errors.description && (
                                    <p className="text-red-600">Product Description is required</p>
                                )}
                            </div>
                        </div>
                        <div className="form-control mt-6 text-center">
                            <input
                                className="btn btn-block btn-info mb-6"
                                type="submit"
                                value="Add Product"
                            />
                        </div>
                    </form>
                </Fade>
            </div>
        </div>
    );
};

export default AddProduct;
