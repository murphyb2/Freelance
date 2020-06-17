import React, { useState, useEffect } from "react";
import * as V from "victory";

const JobsSummary = (props) => {
  const jobs = props.jobsList;
  const employerData = [];
  jobs.map((job) =>
    employerData.push({
      x: job.employer,
      y: job.compensation,
      label: job.employer,
    })
  );

  console.log("jobsList in summary: ");
  const dummyData = [
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 },
  ];
  console.log(employerData);
  console.log(dummyData);
  return (
    <>
      <strong>Summary</strong>

      <V.VictoryPie
        data={employerData}
        labelComponent={<V.VictoryLabel angle={45} />}
        theme={V.VictoryTheme.material}
      />
    </>
  );
};

export default JobsSummary;
