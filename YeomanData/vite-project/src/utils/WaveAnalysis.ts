export const getFullSegment = (originalData: any, heartWaveDataSet: any) => {
  let z = heartWaveDataSet.filter(
    (v: any) => v.segment === "PS" || v.segment === "TE"
  );
  let startPoint = z[0].data;
  let endPoint = z[1].data;
  let waveDataSegments: any[] = [];
  for (let i = 0; i < startPoint.length; i++) {
    let d = originalData.slice(startPoint[i].i, endPoint[i].i);

    if (d.length > 0) {
      waveDataSegments.push(d);
    }
  }

  return waveDataSegments;
};

export const getWaveSegmentLines = (fullHeartSegments: any[]) => {
  return fullHeartSegments.map((x: number[]) => {
    return {
      label: "Dataset 2",
      data: x,
      borderColor: "rgb(253, 162, 235)",
      backgroundColor: "rgba(253, 162, 235, 0.5)",
    };
  });
};
