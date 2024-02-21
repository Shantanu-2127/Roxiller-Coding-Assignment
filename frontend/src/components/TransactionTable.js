import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/transactions?month=${selectedMonth}&search=${searchText}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions(); // Call fetchTransactions when the component mounts
  }, [selectedMonth, searchText]); // Empty dependency array ensures it runs only once when the component mounts

  useEffect(() => {
    console.log(transactions); // Log transactions whenever it changes
  }, [transactions]); // Add transactions as a dependency

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transaction Table</h2>
      <input type="text" placeholder="Search..." value={searchText} onChange={handleSearchChange} />
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select a month</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td><img src={transaction.image} alt="Transaction Image" style={{ width: '50px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
