import React, { useState } from "react";
import { BaseUrl } from "../../constants/constants";
import AddCategory from "../../Component/admin/AddCategory";
import EditCategory from "../../Component/admin/EditCategory";
import Swal from "sweetalert2";

import { useEffect } from "react";

import { getCategory, deletedepartment } from "../../sevices/adminApi";

function Category() {
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState();

  const [load, setLoad] = useState(false);
  useEffect(() => {
    getAllDepartment();
  }, [load]);

  const handleLoad = () => {
    setLoad(!load);
  };

  const getAllDepartment = async () => {
    try {
      let { data } = await getCategory();
      console.log(data, "llll");
      if (data) {
        setDepartment(data.department);
      }
    } catch {}
  };

  const deleteCategory = (categoryId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this department?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willdelete) => {
        if (willdelete) {
          let { data } = await deletedepartment(categoryId);
          console.log(data);
          if (data.success) {
            getAllDepartment();
          } else {
            Swal.fire("The department was not deleted.");
          }
        } else {
          Swal.fire("The item was not deleted.");
        }
      });
    } catch {}
  };

  return (
    <div>
      <AddCategory handleLoad={handleLoad} load={load} />
      <div className="inline-block w-full">
        <label
          htmlFor="add-category"
          className="float-right ml-10 btn bg-sky-700"
        >
          Add Department
        </label>
      </div>

      <div className="overflow-x-auto ">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="pl-8">NO</th>
              <th>CATEGORY NAME</th>
              {/* <th>DESCRIPTION</th> */}
              <th>Image</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {department &&
              department.map((dep, index) => {
                return (
                  <tr>
                    <th className="pl-8">{index + 1}</th>
                    <td>{dep.categoryName}</td>
                    {/* <td>{dep.description}</td> */}
                    <td>
                      <img
                        className="h-20 w-28"
                        src={`${BaseUrl}/${dep.image}`}
                        alt=""
                      />
                    </td>

                    <td>
                      <label
                        htmlFor="editCategory"
                        onClick={() => setCategory(dep)}
                        className="btn btn-outline btn-primary"
                      >
                        Edit
                      </label>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteCategory(dep._id)}
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
        <EditCategory category={category} handleLoad={handleLoad} />
      </div>
    </div>
  );
}

export default Category;
