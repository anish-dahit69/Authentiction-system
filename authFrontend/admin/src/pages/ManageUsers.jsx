import React, { useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useSession } from "../hooks/authAdmin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { getAllUsers, allUsers, loadingUsers, deleteUser } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/manage-users/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
    toast.success("User deleted successfully");
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Users</h2>
        {loadingUsers ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span>{user.role}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(user._id)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                            title="Edit user"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
