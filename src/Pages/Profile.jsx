import React, { useState, useEffect, useContext } from 'react'
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X, Camera, Shield, Clock } from 'lucide-react'
import { AuthContext } from '../Store/AuthContext'

export default function Profile() {
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(false)
  
  const { isLogin } = useContext(AuthContext)

  // Fetch user profile data


    const fetchProfile = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        console.log(token)
        
        if (!token) {
          setError('No authentication token found')
          setLoading(false)
          return
        }

        const response = await fetch('http://localhost:8000/v1/api/auth/fetch', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        // console.log(data.data)
        setProfile(data.data) // Handle different API response formats
        setEditData(data.data);
        setLoading(false);
        console.log("profile:"+profile.first_name)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err.message || 'Failed to fetch profile data')
        
        // Fallback to mock data for development
        const mockProfile = {
          id: 1,
          firstName: 'Saugat',
          lastName: 'Giri',
          email: 'saugat@example.com',
          phone: '+977-9845123456',
          dateOfBirth: '1995-05-15',
          address: 'Kathmandu, Nepal',
          gender: 'Male',
          bloodGroup: 'O+',
          emergencyContact: '+977-9812345678',
          profileImage: null,
          joinedDate: '2024-01-15',
          lastLogin: '2025-08-23T10:30:00Z'
        }
        setProfile(mockProfile)
        setEditData(mockProfile)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchProfile()
  }, [])

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/v1/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData)
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedData = await response.json()
      setProfile(updatedData.user || updatedData)
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (err) {
      console.error('Error updating profile:', err)
      alert('Failed to update profile. Please try again.')
      // For development, just update local state
      setProfile(editData)
      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditData(profile)
    setIsEditing(false)
  }

  //  Loading Templates
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-48"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2">
            <Shield className="w-12 h-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Profile</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="max-w-10xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center justify-between space-x-10">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  {profile.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-blue-600" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className="text-blue-100 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {profile.email}
                </p>
                <p className="text-blue-100 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-2" />
                   {new Date(profile.date_of_birth).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.first_name || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profile.first_name}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.last_name || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profile.last_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <span>{profile.email}</span>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <span>{profile.phone || 'Not provided'}</span>
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                value={editData.date_of_birth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <span>{ new Date(profile.date_of_birth).toLocaleDateString() || 'Not provided'}</span>
                {/* <span>{profile.date_of_birth}</span> */}
              </div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            {isEditing ? (
              <select
                value={editData.gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profile.gender || 'Not provided'}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          {isEditing ? (
            <textarea
              value={editData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <span>{profile.address || 'Not provided'}</span>
            </div>
          )}
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex space-x-4 mt-6 pt-4 border-t">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
