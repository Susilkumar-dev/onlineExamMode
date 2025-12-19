import React from 'react';
import LiveMonitor from '../../component/teacher/LiveMonitor';

const LiveMonitorPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Monitor</h1>
        <p className="text-gray-600 mt-2">Monitor active exams in real-time</p>
      </div>

      <LiveMonitor />
    </div>
  );
};

export default LiveMonitorPage;