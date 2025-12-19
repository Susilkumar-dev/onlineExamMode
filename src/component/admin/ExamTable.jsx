import React, { useState } from 'react';
import Badge from '../common/Badge';

const ExamTable = () => {
  const [exams] = useState([
    {
      id: 1,
      title: 'Data Structures Final',
      course: 'CS201',
      type: 'Coding',
      duration: '2h',
      participants: 145,
      status: 'active',
      date: '2024-12-20'
    },
    {
      id: 2,
      title: 'Web Development Quiz',
      course: 'WD101',
      type: 'MCQ',
      duration: '1h',
      participants: 89,
      status: 'upcoming',
      date: '2024-12-18'
    },
    {
      id: 3,
      title: 'Database Midterm',
      course: 'DB301',
      type: 'Mixed',
      duration: '1.5h',
      participants: 76,
      status: 'completed',
      date: '2024-12-10'
    },
    {
      id: 4,
      title: 'Python Basics',
      course: 'PY101',
      type: 'Coding',
      duration: '45m',
      participants: 203,
      status: 'active',
      date: '2024-12-15'
    },
    {
      id: 5,
      title: 'Algorithms Test',
      course: 'CS202',
      type: 'Mixed',
      duration: '2h',
      participants: 92,
      status: 'draft',
      date: '2024-12-25'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'completed': return 'info';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Coding': return 'primary';
      case 'MCQ': return 'secondary';
      case 'Mixed': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exam Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participants
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {exams.map((exam) => (
            <tr key={exam.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                <div className="text-sm text-gray-500">{exam.duration}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {exam.course}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getTypeColor(exam.type)}>{exam.type}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getStatusColor(exam.status)}>{exam.status}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{exam.participants}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {exam.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900 mr-3">
                  Edit
                </button>
                <button className="text-green-600 hover:text-green-900 mr-3">
                  View
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;