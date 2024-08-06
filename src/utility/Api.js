import axios from "axios";

export const fetchDataFormApi = async (url)=>{ 
       try{
        const {data} = await axios.get("https://full-stack-ecommerce-server.vercel.app"+url);
        return data;
       }
       catch(error){
        console.log(error)
        return error
       }
};

// export const postdata = async (url,formData)=>{
//      const {res} = await axios.post("https://full-stack-ecommerce-server.vercel.app"+url,formData);
//      return res;  
// };

export const editdata = async (url,updatedData)=>{
     const {res} = await axios.put("https://full-stack-ecommerce-server.vercel.app"+url,updatedData);
     return res;  
};

export const deletedata = async (url)=>{
     const {res} = await axios.delete("https://full-stack-ecommerce-server.vercel.app"+ url);
     return res;  
};

export const postdata = async (url, formData) => {
     try {
       const response = await fetch("https://full-stack-ecommerce-server.vercel.app" + url, {
         method: "POST",
         body: JSON.stringify(formData),
         headers: {
           "Content-Type": "application/json",
          //  "Authorization": token ? `Bearer ${token}` : undefined
         }
       });
   
       if (!response.ok) {
        const data = await response.json()
        return data;
       }else{
          const errorData = await response.json();
          return errorData;
       }
     } catch (error) {
       console.error('Error:', error);
     }
};
   
   
