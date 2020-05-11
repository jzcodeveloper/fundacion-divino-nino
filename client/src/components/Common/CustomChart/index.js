import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { Bar, Line, Pie, Doughnut, HorizontalBar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import PropTypes from "prop-types";

import { Container } from "./styles";

defaults.global.defaultFontFamily = "Open Sans";

const CustomChart = ({ type, data, options, displayAxes, delay, style }) => {
  const [show, setShow] = useState(false);
  const [size, setSize] = useState([0, 0]);
  const [responsive, setResponsive] = useState({ type, displayAxes });

  useEffect(() => {
    setTimeout(() => setShow(true), delay);
  }, []);

  useLayoutEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", () =>
      setSize([window.innerWidth, window.innerHeight])
    );
  }, []);

  useEffect(() => {
    if (size[0] < 700) {
      setResponsive({ type: "dougnut", displayAxes: false });
    } else {
      setResponsive({ type, displayAxes });
    }
  }, [size]);

  const config = {
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: responsive.displayAxes,
            ticks: {
              beginAtZero: true,
              min: 0,
              precision: 0,
              maxTicksLimit: 10,
              autoSkip: true,
            },
          },
        ],
        xAxes: [
          {
            display: responsive.displayAxes,
            ticks: {
              beginAtZero: true,
              min: 0,
              precision: 0,
              maxTicksLimit: 10,
              autoSkip: true,
            },
          },
        ],
      },
      ...options,
    },
  };

  return show ? (
    <Container style={style}>
      {responsive.type === "bar" ? (
        <Bar {...config} />
      ) : responsive.type === "horizontal" ? (
        <HorizontalBar {...config} />
      ) : responsive.type === "line" ? (
        <Line {...config} />
      ) : responsive.type === "pie" ? (
        <Pie {...config} />
      ) : (
        <Doughnut {...config} />
      )}
    </Container>
  ) : null;
};

CustomChart.propTypes = {
  type: PropTypes.oneOf(["bar", "horizontal", "line", "pie", "doughnut"])
    .isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  options: PropTypes.object,
  displayAxes: PropTypes.bool,
  delay: PropTypes.number,
  style: PropTypes.object,
};

CustomChart.defaultProps = {
  type: "bar",
  data: [],
  options: {},
  displayAxes: true,
  delay: 0,
  style: {},
};

export default CustomChart;
