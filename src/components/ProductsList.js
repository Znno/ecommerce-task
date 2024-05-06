import { useEffect, useState } from "react";
import Product from "./Product";

function ProductsList() {
    const apiUrl = "https://fakestoreapi.com/products";
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const getProds = () => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    };
    const getcategories = () => {
        fetch(`${apiUrl}/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    };
    const prodsInaCertainCategory = (itemType) => {
        console.log(itemType);
        fetch(`${apiUrl}/category/${itemType}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));

    };
    useEffect(() => {
        getProds();
        getcategories();
    }, []);

    return (

        <>
            <h2 className="text-center" >Availble products</h2>
            <div className="container" ><button  onClick={() => {
                            getProds();
                        }} className="btn btn-info">
                            All Products
                        </button>
                {
                    
                    categories.map((cat) => {
                        return <button key={cat} onClick={() => {
                            prodsInaCertainCategory(cat)
                        }} className="btn btn-info">
                            {cat}
                        </button>
                    })
                }
                <div className="row">
                    {products.map((product) => {
                        return (
                            <div className="col-3" key={product.id}>

                                <Product product={product} show_button={true} />


                            </div>
                        );
                    })}


                </div>
            </div>

        </>
    );

}
export default ProductsList;