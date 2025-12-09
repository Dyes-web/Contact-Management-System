import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

export default function ContactForm({ onSubmit, initialData = {}, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-white">
        {initialData.id ? 'Edit Contact' : 'Add New Contact'}
      </h3>
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1 text-gray-200">Name *</label>
        <input
          id="name"
          type="text"
          className={`w-full border rounded-lg px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
          {...register('name')}
          placeholder="Full Name"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1 text-gray-200">Email *</label>
        <input
          id="email"
          type="email"
          className={`w-full border rounded-lg px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
          {...register('email')}
          placeholder="Email Address"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block font-medium mb-1 text-gray-200">Phone</label>
        <input
          id="phone"
          type="tel"
          className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('phone')}
          placeholder="Phone Number"
        />
      </div>
      <div className="flex justify-between gap-2">
        <button
          type="submit"
          className="cordia-btn-primary px-4 py-2 rounded-lg transition-colors flex-1"
        >
          {initialData.id ? 'Update' : 'Add'} Contact
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
