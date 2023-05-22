import React, { useEffect, useState } from "react";
import { getAllBookingData } from "../../sevices/adminApi";
function AllBookingschedules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingData, setBookingData] = useState([]);
  
  useEffect(() => {
    getAllBookingDetails();
  }, []);

  const filteredData = bookingData.filter((data) => {
    const bookingTimeMatch = data.bookingTime.toLowerCase().includes(searchQuery.toLowerCase());
    const doctorNameMatch = data.DoctorName.toLowerCase().includes(searchQuery.toLowerCase());
    return bookingTimeMatch || doctorNameMatch;
  });

  const getAllBookingDetails = async () => {
    let { data } = await getAllBookingData();
    if (data.success) {
      setBookingData(data.bookingData);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <div className="relative flex flex-wrap items-stretch w-full mb-4">
        <input
          type="search"
          value={searchQuery} 
          onChange={handleSearch} 
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search by Date"
          aria-label="Search"
          aria-describedby="button-addon1"
        />
      </div>
      <div className="h-4/6">
        <div className="flex justify-center p-2 ">
          <table className="table w-full">
          
            <thead>
              <tr>
                <th>No</th>
                <th>Booking Time</th>
                <th>Doctor</th>
                <th>department</th>
                <th>patient</th>
                <th>totalAmount</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((data, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <td>{data.bookingTime}</td>
                      <td>Dr. {data.DoctorName}</td>
                      <td>{data.DoctorDepartment}</td>
                      <td>{data.UserId.name}</td>
                      <td>{data.totalAmount}</td>
                      <td>
                        {" "}
                        {data.status == "Cancel" ? (
                          <span>
                            <a className="p-2 text-red-700 rounded-sm  uppercase font-bold mt-5  ">
                              Cancelled
                            </a>{" "}
                          </span>
                        ) : (
                          <span>
                            <a className=" p-2 text-green-700 rounded-sm  uppercase font-bold mt-5 ">
                              Active
                            </a>{" "}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllBookingschedules;
