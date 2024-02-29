import React, { useState, useEffect } from 'react';
import { getAllBeneficiaries, getAllParentGuardians, getAllSiblings, getAllEducationFundingHistories, getAllStudents, getAllUsers } from './api'; // Import API functions
import { Bar, Pie, Line } from 'react-chartjs-2';

const DisplayContent = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllBeneficiaries(),
      getAllParentGuardians(),
      getAllSiblings(),
      getAllEducationFundingHistories(),
      getAllStudents(),
      getAllUsers()
    ]).then(([beneficiariesRes, parentGuardiansRes, siblingsRes, fundingHistoriesRes, studentsRes, usersRes]) => {
      const beneficiariesCount = beneficiariesRes.data.length;
      const parentGuardiansCount = parentGuardiansRes.data.length;
      const siblingsCount = siblingsRes.data.length;
      const fundingHistoriesCount = fundingHistoriesRes.data.length;
      const studentsCount = studentsRes.data.length;
      const usersCount = usersRes.data.length;

      setStatistics({
        beneficiariesCount,
        parentGuardiansCount,
        siblingsCount,
        fundingHistoriesCount,
        studentsCount,
        usersCount
      });

      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Statistics</h2>
          <div>
            <p>Number of Beneficiaries: {statistics.beneficiariesCount}</p>
            <p>Number of Parent Guardians: {statistics.parentGuardiansCount}</p>
            <p>Number of Siblings: {statistics.siblingsCount}</p>
            <p>Number of Education Funding Histories: {statistics.fundingHistoriesCount}</p>
            <p>Number of Students: {statistics.studentsCount}</p>
            <p>Number of Users: {statistics.usersCount}</p>
          </div>
          <h2>Charts</h2>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <h3>Bar Chart</h3>
              <div style={{ width: '300px', height: '300px' }}>
                <Bar
                  data={{
                    labels: ['Beneficiaries', 'Parent Guardians', 'Siblings', 'Funding Histories', 'Students', 'Users'],
                    datasets: [{
                      label: 'Counts',
                      data: [statistics.beneficiariesCount, statistics.parentGuardiansCount, statistics.siblingsCount, statistics.fundingHistoriesCount, statistics.studentsCount, statistics.usersCount],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                    }]
                  }}
                />
              </div>
            </div>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <h3>Pie Chart</h3>
              <div style={{ width: '200px', height: '300px' }}>
                <Pie
                  data={{
                    labels: ['Beneficiaries', 'Parent Guardians', 'Siblings', 'Funding Histories', 'Students', 'Users'],
                    datasets: [{
                      data: [statistics.beneficiariesCount, statistics.parentGuardiansCount, statistics.siblingsCount, statistics.fundingHistoriesCount, statistics.studentsCount, statistics.usersCount],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                    }]
                  }}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3>Line Chart</h3>
              <div style={{ width: '200px', height: '300px' }}>
                <Line
                  data={{
                    labels: ['Beneficiaries', 'Parent Guardians', 'Siblings', 'Funding Histories', 'Students', 'Users'],
                    datasets: [{
                      label: 'Counts',
                      data: [statistics.beneficiariesCount, statistics.parentGuardiansCount, statistics.siblingsCount, statistics.fundingHistoriesCount, statistics.studentsCount, statistics.usersCount],
                      fill: false,
                      borderColor: 'rgba(75,192,192,1)',
                      backgroundColor: 'rgba(75,192,192,0.4)',
                    }]
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayContent;
