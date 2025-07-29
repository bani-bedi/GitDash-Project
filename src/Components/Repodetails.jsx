import React, { useEffect, useState } from 'react'
import { fetchStats } from '../services/userINPservice';
// import { useLocation } from 'react-router';


import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);




const Repodetails = ({name ,owner}) => {
  // const location = useLocation();
  // const repoOwnerinfo = location.state;

  const [commitData, setCommitData] = useState({
    'labels': [],
    'total': []
  });



  useEffect(() => {
    repoDetails()
    console.log("name is " ,name , owner)

  }, [name , owner])


  async function repoDetails() {
    try {
      const repoinfo = await fetchStats(name,owner)
      console.log("the deatils are" ,repoinfo)
      const weeklyTotals = repoinfo.data.map((week) => week.total);
      const seen = new Set();
      const labels = repoinfo.data.map((week) => {
        const date = new Date(week.week * 1000);
        const month = date.toLocaleString('default', { month: 'short' });
        if (seen.has(month)) return ''; // Hide duplicate month
        seen.add(month);
        return month;
      });
      console.log(labels);
      
      setCommitData({ 'labels': labels, 'total': weeklyTotals });


    }
    catch (err) {
      console.log("error", err)
    }
  }


  // Generate labels for 52 weeks
  // const labels = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);


  const chartData = {
    'labels': commitData.labels,
    datasets: [
      {
        label: `Commits per Week`,
        data: commitData.total,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        fill: true,
        tension: 0.4,
      },

    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        font: {
          size: 10,             
        }

      }
    },
    title: {
      display: true,
      text: 'Commits per Week',
      font: {
        size: 14               // ADDED: Optional chart title
      }
    
  },

    scales: {
    x: {
      ticks: {
        font: {
          size: 10             //  ADDED: Small X-axis labels (months)
        },
      },
      
    },
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 10             //  ADDED: Small Y-axis numbers
        }
      }
    },
  },
  elements: {
    point: {
      radius: 2,               //  ADDED: Small dot points
      hoverRadius: 4,
    },
    line: {
      borderWidth: 1,          //  ADDED: Thin line
      tension: 0.3,
    }
  }
};



  return (
    <div style={{
      width: '1200px',
      height: '450px',
      margin: '0 auto',
      padding: '10px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '10px',
    }}
    >
      <Line data={chartData} options={options} />
    </div>


  )
}

export default Repodetails