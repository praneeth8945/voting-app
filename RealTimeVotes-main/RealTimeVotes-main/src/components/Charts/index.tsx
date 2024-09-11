import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useAppSelector } from '../../redux/hooks/index';

export const Graphics = () => {

  const { list } = useAppSelector(state => state.socketsState);

  const [graphicsData, setGraphicsData] = useState({
    data: list.map(e => e.votes),
    labels: list.map(e => e.name)
  });

  useEffect(() => {
    setGraphicsData({
      data: list.map(e => e.votes),
      labels: list.map(e => e.name)
    });
  }, [list]);

  useEffect(() => {
    const ctx = document.getElementById('myChart');

    const chart = new Chart(ctx as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: graphicsData.labels,
        datasets: [{
          label: '# of Votes',
          data: graphicsData.data,
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 105, 180, 0.8)',  // Hot Pink
            'rgba(255, 255, 0, 0.8)',    // Bright Yellow
            'rgba(0, 255, 255, 0.8)',    // Cyan
            'rgba(255, 165, 0, 0.8)',    // Orange
            'rgba(50, 205, 50, 0.8)',    // Lime Green
            'rgba(255, 0, 255, 0.8)',    // Magenta
            'rgba(255, 255, 255, 0.8)'   // White
          ],
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          }
        },
      }
    });
    return () => chart.destroy();
  }, [list, graphicsData]);


  return (
    <canvas className='mx-auto min-w-screen' id='myChart'></canvas>
  );
};
