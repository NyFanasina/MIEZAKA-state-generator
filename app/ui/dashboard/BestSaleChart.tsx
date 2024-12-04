"use client";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function BestSaleChart() {
  type DailyStars = {
    date: string;
    stars: number;
  };

  type Series = {
    label: string;
    data: DailyStars[];
  };

  const data: Series[] = [
    {
      label: "React Charts",
      data: [
        {
          date: "fev",
          stars: 202123,
        },
        // ...
      ],
    },
    {
      label: "React Query",
      data: [
        {
          date: "jav",
          stars: 10234230,
        },
        // ...
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        getValue: (datum) => datum.stars,
      },
    ],
    []
  );

  return (
    <div>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}
