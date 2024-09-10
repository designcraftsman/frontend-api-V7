import React from "react";
import Table from "../Table/Table.jsx";
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AssetList = () => {

  const navigate = useNavigate();
  const [token , setToken] = useState(localStorage.getItem('token'));
  const [role , setRole] = useState(localStorage.getItem('role'));
  const [id , setId] = useState(localStorage.getItem('id'));
  const [assets , setAssets] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        navigate('/sign-in');
    } else {
        setToken(storedToken);
    }
}, [navigate]);

  const getAssets = async () => {
      try {
          const response = await fetch(`http://localhost:4200/assets`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });

          if (!response.ok) {
              throw new Error('Failed to fetch Assets');
          }

          const jsonData = await response.json();
          setAssets(jsonData.assets);

      } catch (error) {
          console.error('Error:', error);
          setAssets([]); // Set Assets to an empty array on error
      }
  };

  useEffect(() => {
      if (token) {
          getAssets();
      }
  }, [token]);

  console.log(assets);
  assets.forEach(item => {
    item.fullName = `${item.firstName} ${item.lastName}`;
});

const columns = [
    { header: "", accessor: "checkbox" },
    { header: "Id", accessor: "idAsset" },
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Uploaded By", accessor: "fullName" },
    { header: "Date", accessor: "creationDate" },
];



    const [data, setData] = useState(assets);
    const [selectedRows, setSelectedRows] = useState([]);

    // row selection handling function
    const handleRowSelect = (id) => {
        setSelectedRows(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(rowId => rowId !== id)
                : [...prevSelected, id]
        );
    };

    // Handle delete all selected rows
    const handleDeleteAll = () => {
        setData(data.filter(item => !selectedRows.includes(item.id)));
        setSelectedRows([]);
    };

    // Add a checkbox column manually
    const enhancedData = data.map(item => ({
        checkbox: (
            <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => handleRowSelect(item.id)}
            />
        ),
        ...item
    }));

    return (
        <>
            <h1 className='letter-spacing-5 mb-4'>Assets</h1>
            {selectedRows.length > 0 && (
                <button className="btn btn-danger mb-3" onClick={handleDeleteAll}>
                    Delete All
                </button>
            )}
            <Table columns={columns} data={assets} />
        </>
    );
};

export default AssetList;
