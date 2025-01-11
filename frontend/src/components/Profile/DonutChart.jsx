import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './webUsageStats.js';

 const DonutChart=({darkMode})=>{
    return <div className="py-6 bg-white rounded-lg p-5 flex dark:bg-gray-600 ">
           <PieChart 
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={300} // Increased height
  width={490}  // Optionally set width
    />
        </div>;
 };
 export default DonutChart;