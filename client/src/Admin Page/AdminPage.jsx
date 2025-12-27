import React, { useState } from 'react';
import { 
  FiHome, FiUsers, FiShield, FiBriefcase, FiPackage, FiFileText, 
  FiBarChart2, FiSettings, FiActivity, FiSearch, FiBell, 
  FiX, FiEdit2, FiTrash2, FiChevronRight, FiChevronLeft,
  FiUserPlus, FiPlusCircle, FiLock, FiBox, FiCheckCircle,
  FiMonitor, FiTool, FiZap, FiGlobe, FiCpu, FiSmartphone, FiTarget, FiStar
} from 'react-icons/fi';
import { registerUser } from '../services/authService';
import { createDepartment } from '../services/departmentService';
import { createMaintenanceTeam } from '../services/maintenanceTeamService';
import { createEquipment } from '../services/equipmentService';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    location: '',
    departmentId: '',
    employeeId: '',
    teamId: ''
  });

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setFormData({ 
      name: '', 
      email: '', 
      role: '', 
      password: '',
      serialNumber: '',
      purchaseDate: '',
      warrantyExpiry: '',
      location: '',
      departmentId: '',
      employeeId: '',
      teamId: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (modalType === 'adduser') {
      try {
        const response = await registerUser({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password
        });
        console.log('User registered successfully:', response);
        alert('User registered successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', role: '', password: '' });
      } catch (error) {
        console.error('Registration failed:', error);
        alert(`Registration failed: ${error.message || 'Unknown error'}`);
      }
    } else if (modalType === 'createdepartment') {
      try {
        const response = await createDepartment({
          name: formData.name
        });
        console.log('Department created successfully:', response);
        alert('Department created successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', role: '', password: '' });
      } catch (error) {
        console.error('Department creation failed:', error);
        alert(`Department creation failed: ${error.message || 'Unknown error'}`);
      }
    } else if (modalType === 'createmaintenanceteam') {
      try {
        const response = await createMaintenanceTeam({
          name: formData.name
        });
        console.log('Maintenance team created successfully:', response);
        alert('Maintenance team created successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', role: '', password: '' });
      } catch (error) {
        console.error('Maintenance team creation failed:', error);
        alert(`Maintenance team creation failed: ${error.message || 'Unknown error'}`);
      }
    } else if (modalType === 'addequipment') {
      try {
        const response = await createEquipment({
          name: formData.name,
          serialNumber: formData.serialNumber,
          purchaseDate: formData.purchaseDate,
          warrantyExpiry: formData.warrantyExpiry,
          location: formData.location,
          departmentId: formData.departmentId,
          employeeId: formData.employeeId,
          teamId: formData.teamId
        });
        console.log('Equipment created successfully:', response);
        alert('Equipment created successfully!');
        setShowModal(false);
        setFormData({ 
          name: '', 
          email: '', 
          role: '', 
          password: '',
          serialNumber: '',
          purchaseDate: '',
          warrantyExpiry: '',
          location: '',
          departmentId: '',
          employeeId: '',
          teamId: ''
        });
      } catch (error) {
        console.error('Equipment creation failed:', error);
        alert(`Equipment creation failed: ${error.message || 'Unknown error'}`);
      }
    }
  };


 
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <FiShield className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    GearGuard
                  </h1>
                  <p className="text-xs text-gray-500">Admin Portal</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mx-auto"
            >
              <FiChevronRight className="w-6 h-6 text-gray-500" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FiHome, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'users', label: 'Users', icon: FiUsers, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'roles', label: 'Roles', icon: FiLock, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'teams', label: 'Teams', icon: FiBriefcase, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'equipment', label: 'Equipment', icon: FiPackage, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'requests', label: 'Requests', icon: FiFileText, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'reports', label: 'Reports', icon: FiBarChart2, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'settings', label: 'Settings', icon: FiSettings, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'logs', label: 'Activity Logs', icon: FiActivity, gradient: 'from-violet-600 to-indigo-600' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <item.icon className="text-xl" />
                {sidebarOpen && (
                  <>
                    <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
                    {activeTab === item.id && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 cursor-pointer hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center ring-2 ring-violet-200">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">System Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@gearguard.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Live
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-96 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              />
              <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Quick Actions */}
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <FiBell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <FiSettings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Total Users', 
                  value: '2,459', 
                  icon: FiUsers, 
                  gradient: 'from-violet-600 to-indigo-600', 
                  change: '+12.5%',
                  trend: 'up',
                  subtitle: '245 active today'
                },
                { 
                  title: 'Active Teams', 
                  value: '18', 
                  icon: FiBriefcase, 
                  gradient: 'from-violet-600 to-indigo-600', 
                  change: '+8.2%',
                  trend: 'up',
                  subtitle: '3 created this week'
                },
                { 
                  title: 'Total Equipment', 
                  value: '1,842', 
                  icon: FiPackage, 
                  gradient: 'from-violet-600 to-indigo-600', 
                  change: '+23.1%',
                  trend: 'up',
                  subtitle: '1,654 in use'
                },
                { 
                  title: 'Pending Requests', 
                  value: '47', 
                  icon: FiFileText, 
                  gradient: 'from-violet-600 to-indigo-600', 
                  change: '-12.4%',
                  trend: 'down',
                  subtitle: '12 need attention'
                }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      stat.trend === 'up' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Add User', icon: FiUserPlus, gradient: 'from-violet-600 to-indigo-600' },
                      { label: 'Create Maintenance Team', icon: FiPlusCircle, gradient: 'from-violet-600 to-indigo-600' },
                      { label: 'Create Department', icon: FiBriefcase, gradient: 'from-violet-600 to-indigo-600' },
                      { label: 'Add Equipment', icon: FiBox, gradient: 'from-violet-600 to-indigo-600' }
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => openModal(action.label.toLowerCase().replace(/\s+/g, ''))}
                        className={`group flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${action.gradient} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                      >
                        <action.icon className="text-white text-3xl mb-2 transform group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-white text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* User Management */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                      User Management
                    </h3>
                    <button 
                      onClick={() => openModal('adduser')}
                      className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
                    >
                      + Add User
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">User</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Role</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Team</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Status</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* User rows will be populated from API */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Activity Feed */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { action: 'User Created', detail: 'John added to IT Support', time: '5m', icon: FiUserPlus, gradient: 'from-violet-600 to-indigo-600' },
                      { action: 'Role Updated', detail: 'Permissions modified', time: '15m', icon: FiLock, gradient: 'from-violet-600 to-indigo-600' },
                      { action: 'Team Created', detail: 'Network Admin team', time: '1h', icon: FiBriefcase, gradient: 'from-violet-600 to-indigo-600' },
                      { action: 'Equipment Added', detail: '50 new items', time: '2h', icon: FiPackage, gradient: 'from-violet-600 to-indigo-600' },
                      { action: 'Settings Changed', detail: 'Workflow updated', time: '3h', icon: FiSettings, gradient: 'from-violet-600 to-indigo-600' }
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${log.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <log.icon className="text-white text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{log.action}</p>
                          <p className="text-xs text-gray-500 truncate">{log.detail}</p>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teams Quick View */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                      Teams
                    </h3>
                    <button className="text-sm text-violet-600 hover:text-violet-700 font-semibold">
                      View all →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {/* Teams will be populated from API */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Users View */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">All Users</h3>
                  <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                    + Add New User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 text-gray-700 font-bold">User</th>
                        <th className="text-left py-4 px-4 text-gray-700 font-bold">Role</th>
                        <th className="text-left py-4 px-4 text-gray-700 font-bold">Team</th>
                        <th className="text-left py-4 px-4 text-gray-700 font-bold">Status</th>
                        <th className="text-left py-4 px-4 text-gray-700 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* User rows will be populated from API */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Roles View */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Role Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Administrator', 'Manager', 'Technician', 'User', 'Supervisor', 'Auditor'].map((role, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-violet-500 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">{role}</h4>
                        <FiLock className="w-6 h-6 text-violet-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Full system access with all permissions enabled</p>
                      <button className="w-full py-2 border-2 border-violet-300 text-violet-600 rounded-xl hover:bg-violet-50 transition-all font-semibold">View Permissions</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Teams View */}
          {activeTab === 'teams' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">All Teams</h3>
                  <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                    + Create Maintenance Team
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Teams will be populated from API */}
                </div>
              </div>
            </div>
          )}

          {/* Equipment View */}
          {activeTab === 'equipment' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Equipment Inventory</h3>
                  <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                    + Add Equipment
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  {[
                    { title: 'Total Items', value: '1,842', icon: FiPackage, gradient: 'from-violet-600 to-indigo-600' },
                    { title: 'In Use', value: '1,654', icon: FiCheckCircle, gradient: 'from-green-600 to-green-700' },
                    { title: 'Available', value: '188', icon: FiBox, gradient: 'from-blue-600 to-blue-700' },
                    { title: 'Under Repair', value: '23', icon: FiTool, gradient: 'from-orange-600 to-orange-700' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md mb-3`}>
                        <stat.icon className="text-white text-2xl" />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Requests View */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">All Requests</h3>
                <div className="space-y-4">
                  {['Equipment Request - Laptop', 'Maintenance - Printer', 'Return - Monitor', 'New Equipment - Desk'].map((req, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                            <FiFileText className="text-white text-xl" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{req}</h4>
                            <p className="text-sm text-gray-500">Submitted {idx + 1}h ago</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-all font-semibold">Review</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive email alerts for important events', enabled: true },
                    { label: 'Auto-approve Requests', desc: 'Automatically approve low-priority requests', enabled: false },
                    { label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts', enabled: true },
                    { label: 'Audit Logging', desc: 'Log all administrative actions', enabled: true }
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">{setting.label}</p>
                        <p className="text-sm text-gray-500">{setting.desc}</p>
                      </div>
                      <div className={`w-14 h-7 rounded-full ${setting.enabled ? 'bg-violet-600' : 'bg-gray-300'} relative cursor-pointer`}>
                        <div className={`absolute top-1 ${setting.enabled ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full transition-all`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activity Logs View */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Activity Logs</h3>
                <div className="space-y-3">
                  {[
                    { action: 'User Created', user: 'Admin', detail: 'Created user: John Doe', time: '5 min ago', icon: FiUserPlus },
                    { action: 'Role Modified', user: 'Admin', detail: 'Updated permissions for Manager role', time: '15 min ago', icon: FiLock },
                    { action: 'Team Created', user: 'Admin', detail: 'Created new team: Network Admin', time: '1 hour ago', icon: FiBriefcase },
                    { action: 'Equipment Added', user: 'Manager', detail: 'Added 50 new laptops to inventory', time: '2 hours ago', icon: FiPackage },
                    { action: 'Settings Changed', user: 'Admin', detail: 'Updated notification preferences', time: '3 hours ago', icon: FiSettings }
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <log.icon className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-gray-900">{log.action}</p>
                          <span className="text-xs text-gray-500">{log.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{log.detail}</p>
                        <p className="text-xs text-gray-500">By: {log.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {modalType === 'adduser' && <><FiUserPlus className="text-violet-600" /> Add New User</>}
                {modalType === 'createmaintenanceteam' && <><FiPlusCircle className="text-violet-600" /> Create Maintenance Team</>}
                {modalType === 'createdepartment' && <><FiBriefcase className="text-violet-600" /> Create Department</>}
                {modalType === 'addequipment' && <><FiBox className="text-violet-600" /> Add Equipment</>}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Add User Form */}
            {modalType === 'adduser' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="user@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="">Select a role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="TECHNICIAN">Technician</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Create Maintenance Team Form */}
            {modalType === 'createmaintenanceteam' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter maintenance team name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Create Department Form */}
            {modalType === 'createdepartment' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter department name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Add Equipment Form */}
            {modalType === 'addequipment' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter equipment name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    placeholder="Enter serial number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty Expiry</label>
                  <input
                    type="date"
                    name="warrantyExpiry"
                    value={formData.warrantyExpiry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department ID</label>
                  <input
                    type="text"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleInputChange}
                    placeholder="Enter department ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team ID</label>
                  <input
                    type="text"
                    name="teamId"
                    value={formData.teamId}
                    onChange={handleInputChange}
                    placeholder="Enter team ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowModal(false)} 
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
