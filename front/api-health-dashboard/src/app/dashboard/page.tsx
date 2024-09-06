"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

interface Metrics {
  traffic_count: number;
  error_rate: number;
  uptime: number;
  cpu_usage: number;
  memory_usage: number;
  disk_io: number;
  concurrent_users: number;
  predicted_response_time: number;
  error_confidence: number;
  risk_level: string;
  time_to_impact: string;
  recommendation: string;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputType, setInputType] = useState<'manual' | 'url'>('manual');
  const [manualInput, setManualInput] = useState({
    traffic_count: 500,
    error_rate: 2,
    uptime: 95,
    cpu_usage: 75.5,
    memory_usage: 65.2,
    disk_io: 0.85,
    concurrent_users: 150,
  });
  const [apiUrl, setApiUrl] = useState<string>("");

  const handleSubmit = () => {
    if (inputType === "manual") {
      axios
        .post("https://api-health-monitoring-e1a44c731464.herokuapp.com/predict", manualInput)
        .then((response) => {
          console.log("Response Data:", response.data);
          setMetrics(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data from the backend.");
        });
    } else {
      axios
        .post("https://api-health-monitoring-e1a44c731464.herokuapp.com/predict-from-url", {
          api_url: apiUrl,
        })
        .then((response) => {
          console.log("Response Data:", response.data);
          setMetrics(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data from the backend.");
        });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = {
    labels: ["Traffic Count", "Error Rate", "Uptime"],
    datasets: [
      {
        label: "API Metrics",
        data: metrics ? [metrics.traffic_count, metrics.error_rate, metrics.uptime] : [0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["CPU Usage", "Memory Usage", "Disk I/O", "Concurrent Users"],
    datasets: [
      {
        label: "System Metrics",
        data: metrics
          ? [metrics.cpu_usage, metrics.memory_usage, metrics.disk_io, metrics.concurrent_users]
          : [0, 0, 0, 0],
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>API Health Monitoring Dashboard</h2>

      <div className="button-container">
        <button onClick={() => setInputType('manual')} className={inputType === 'manual' ? 'active' : ''}>
          Manual Input
        </button>
        <button onClick={() => setInputType('url')} className={inputType === 'url' ? 'active' : ''}>
          URL Input
        </button>
      </div>

      {inputType === 'manual' ? (
        <div className="manual-input">
          <h3>Manual Input</h3>
          <form>
            <label>Traffic Count</label>
            <input
              type="number"
              value={manualInput.traffic_count}
              onChange={(e) => setManualInput({ ...manualInput, traffic_count: Number(e.target.value) })}
              placeholder="Traffic Count"
            />
            <label>Error Rate</label>
            <input
              type="number"
              value={manualInput.error_rate}
              onChange={(e) => setManualInput({ ...manualInput, error_rate: Number(e.target.value) })}
              placeholder="Error Rate (%)"
            />
            <label>Uptime</label>
            <input
              type="number"
              value={manualInput.uptime}
              onChange={(e) => setManualInput({ ...manualInput, uptime: Number(e.target.value) })}
              placeholder="Uptime (%)"
            />
            <label>CPU Usage</label>
            <input
              type="number"
              value={manualInput.cpu_usage}
              onChange={(e) => setManualInput({ ...manualInput, cpu_usage: Number(e.target.value) })}
              placeholder="CPU Usage (%)"
            />
            <label>Memory Usage</label>
            <input
              type="number"
              value={manualInput.memory_usage}
              onChange={(e) => setManualInput({ ...manualInput, memory_usage: Number(e.target.value) })}
              placeholder="Memory Usage (%)"
            />
            <label>Disk I/O</label>
            <input
              type="number"
              value={manualInput.disk_io}
              onChange={(e) => setManualInput({ ...manualInput, disk_io: Number(e.target.value) })}
              placeholder="Disk I/O"
            />
            <label>Concurrent Users</label>
            <input
              type="number"
              value={manualInput.concurrent_users}
              onChange={(e) => setManualInput({ ...manualInput, concurrent_users: Number(e.target.value) })}
              placeholder="Concurrent Users"
            />
          </form>
          <button onClick={handleSubmit}>Analyze</button>
        </div>
      ) : (
        <div className="url-input">
          <h3>API URL Input</h3>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Enter API URL"
          />
          <button onClick={handleSubmit}>Analyze</button>
        </div>
      )}

      {metrics && (
        <>
          <h3>Charts</h3>
          <div className="chart-container">
            <Line data={chartData} options={options} />
            <Bar data={barChartData} options={options} />
          </div>

          <div className="analysis-container">
            <h3>Analysis</h3>
            <p>Predicted Response Time: {metrics.predicted_response_time}ms</p>
            <p>Error Prediction Confidence: {metrics.error_confidence}</p>
            <p>Risk Level: {metrics.risk_level}</p>
            <p>Time to Impact: {metrics.time_to_impact}</p>
            <p>Recommendation: {metrics.recommendation}</p>
          </div>
        </>
      )}
    </div>
  );
}
