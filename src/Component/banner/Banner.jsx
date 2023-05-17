import React, { useState, useEffect } from "react";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";
import { getBanner,bannerDelete } from "../../sevices/adminApi";
import Swal from "sweetalert2";
function Banner() {
  const [load, setLoad] = useState(false);
  const [banner, setBanner] = useState([]);
  const [editBanner, setEditBanner] = useState();

  const handleLoad = () => {
    setLoad(!load);
  };
  useEffect(() => {
    console.log("llll");
    getAllBanner();
  }, [load]);

  const getAllBanner = async () => {
    try {
      let { data } = await getBanner()
    
console.log(data.BannerData);
      setBanner(data.BannerData);
    } catch {}
  };

  const deleteBanner=(id)=>{
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this department?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async(willdelete) => {
        if (willdelete) {

          let{data}=await bannerDelete(id) 
          console.log(data);
          if (data.success) {
            getAllBanner();
              } else {
                Swal.fire("The department was not deleted.");
              }
         
        } else {
          Swal.fire("The item was not deleted.");
        }
      });
    } catch {}
  }
  return (
    <>
      <div className="">
        <AddBanner handleLoad={handleLoad} load={load} />
        <div className="inline-block w-full ">
        <label htmlFor="add-banner" className="float-right ml-10 btn bg-sky-700">
          Add Banner
        </label>
          
        </div>
        

        <div className="m-12 overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="pl-8">NO</th>
                <th>BANNER NAME</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {banner &&
                banner.map((banner, index) => {
                  return (
                    <tr>
                      <th className="pl-8">{index+1}</th>
                      <td>{banner.bannerName}</td>
                      <td>{banner.description}</td>
                    
                         <td><img className="h-20 w-28" src={`http://localhost:4000/${banner.image}`} alt="" /></td>
            
                       
                     

                   
                        <td>
                          <label
                            htmlFor="editBanner"
                              onClick={() => setEditBanner(banner)}
                            className="btn btn-outline btn-primary"
                          >
                            Edit
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteBanner(banner._id)}
                            className="btn btn-outline btn-secondary"
                          >
                            DELETE
                          </button>
                        </td>
                   
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <EditBanner editBanner={editBanner} handleLoad={handleLoad} />
        </div>
      </div>
    </>
  );
}

export default Banner;
