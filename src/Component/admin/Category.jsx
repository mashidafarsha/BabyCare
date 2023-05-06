import React, { useState } from "react";
import axios from "../../axios/adminAxios";
import AddCategory from "../../Component/admin/AddCategory";
import EditCategory from "../../Component/admin/EditCategory";
import Swal from "sweetalert2";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCategory,deletedepartment } from "../../sevices/adminApi";

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
      console.log(data);
      if (data){
        setDepartment(data.department);
      } 
    } catch {}
  };

  const deleteCategory =(categoryId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this department?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async(willdelete) => {
        if (willdelete) {

          let{data}=await deletedepartment(categoryId) 
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
    <div className="">
      <AddCategory handleLoad={handleLoad} load={load} />
      <label htmlFor="add-category" className="btn">
        Add Department
      </label>

      <div className="m-12 overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="pl-8">NO</th>
              <th>CATEGORY NAME</th>
              <th>DESCRIPTION</th>
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
                    <td>{dep.description}</td>
                    <div>
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
                    </div>
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
