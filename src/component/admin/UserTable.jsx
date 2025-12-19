import React, { useState } from 'react';
import Badge from '../common/Badge';

const UserTable = ({ limit }) => {
  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'student',
      status: 'active',
      joined: '2024-12-01',
      exams: 12
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@university.edu',
      role: 'teacher',
      status: 'active',
      joined: '2024-11-15',
      exams: 8
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@college.com',
      role: 'admin',
      status: 'active',
      joined: '2024-10-20',
      exams: 25
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'student',
      status: 'inactive',
      joined: '2024-09-05',
      exams: 5
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert@university.edu',
      role: 'teacher',
      status: 'active',
      joined: '2024-08-12',
      exams: 15
    }
  ]);

  const displayedUsers = limit ? users.slice(0, limit) : users;

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'danger';
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'primary';
      case 'teacher': return 'secondary';
      case 'student': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exams
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getRoleColor(user.role)}>
                  {user.role}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.exams}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900 mr-3">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;