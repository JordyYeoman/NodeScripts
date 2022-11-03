export const findQRSWave = (input: any) => {
  // Todo fix typing
  // With the data, identify all outstanding upper points, this will be our R of the QRS wave.
  const workWithData = input.chartData.datasets[0].data;
  if (workWithData) {
    let highestPoints: any[] = [];
    let currentHighestPoint: number = 0;
    let windowSize: number = 100;
    let count: number = 0;

    workWithData.map((dataPoint: number) => {
      if (count >= windowSize) {
        highestPoints.push(currentHighestPoint);
        count = 0;
      }

      if (dataPoint > currentHighestPoint) {
        currentHighestPoint = dataPoint;
      }

      count++;
    });

    console.log("highestPoints:", highestPoints);
  }
};
