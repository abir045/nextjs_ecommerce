import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"

export const metadata = {
    title:"Add Product - Flowmazon"
}


async function addProduct(formData: FormData) {
"use server";

 const name = formData.get("name")?.toString()
 const description = formData.get("description")?.toString()
const imageUrl = formData.get("imageUrl")?.toString()
const price = Number(formData.get("price") || 0)

 
if(!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
}

await prisma.product.create({
    data: {name, description,imageUrl, price},
})
  redirect("/")
    
}


export default function AddProductPage() { 
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add product</h1>
            <form action={addProduct}>
               <input 
               required
               className="mb-3 w-full input input-bordered"
               name="name"
               placeholder="Name"
    
               />
               <textarea
               required
               name="description"
               placeholder="Description"
               className="textarea textarea-bordered mb-3 w-full"
               />
               <input 
               required
               className="mb-3 w-full input input-bordered"
               name="imageUrl"
               placeholder="Image URL"
               type="url"  
               />
               <input 
               required
               className="mb-3 w-full input input-bordered"
               name="price"
               placeholder="price"
               type="number"
    
               />
    
            <FormSubmitButton className=" btn-block" >Add Product</FormSubmitButton>
            
    
            </form>
        </div>
     )



}

 
