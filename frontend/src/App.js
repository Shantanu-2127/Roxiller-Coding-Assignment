import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import TransactionsStatistics from './components/TransactionStatistics';
import TransactionsBarCharts from './components/TransactionBarCharts';
import TransactionsPieChart from './components/TransactionsPieChart';
import axios from 'axios';

function App() {
    return(
    <div> 
    <TransactionTable />
    </div>
    );

}

export default App;