import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/adminAxios";
import { useSession } from "../hooks/authAdmin";
import toast from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams(); // get user id from URL

  const { getUserById } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  // Fetch user data
  useEffect(() => {
    getUserById(id)
      .then((user) => {
        reset(user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, reset]);

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      await api.patch(`/admin/users/${id}`, data); // update user
      toast.success("User updated successfully");
      navigate("/admin/manage-users"); // go back to user list
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update user";

      toast.error(message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1">Role</label>
          <select
            {...register("role", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditPage;
