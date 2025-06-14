import { forwardRef, useState, useImperativeHandle } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Swal from "sweetalert2";


// Define the ref methods that parent can call
export type NewUserModalFormRef = {
  submitUsers: () => Promise<User | null>;
  user: User | null;
};

type NewUserModalFormProps = {
  onSuccess?: () => void;
};


// Define user data structure
type UserData = {
  name: string;
  email: string;
  position: string;
  password: string;
};

const NewUserModalForm = forwardRef<NewUserModalFormRef, NewUserModalFormProps>(({ onSuccess }, ref) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    position: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<UserData> = {};

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!user.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit function dengan better error handling
  const submitUsers = async (): Promise<boolean> => {
    
    if (!validateForm()) {
      // console.log('Validation failed');
      return false;
    }

    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify(user),
      });


      if (!response.ok) {
        let errorMessage = 'Failed to create user';
        
        // Cek content type sebelum parsing
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (jsonError) {
            console.error('Failed to parse JSON error:', jsonError);
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
        } else {
          // Jika bukan JSON, jangan coba parse sebagai JSON
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      Swal.fire({
        title: "Success",
        text: "User successfully added!",
        width: 300,
        icon: "success"
      });
      
      if (onSuccess) onSuccess(); 

      // Reset form on success
      setUser({
        name: "",
        email: "",
        position: "",
        password: "",
      });
      setErrors({});
      
      return true;
      
    } catch (error) {
      console.error('Error creating user:', error);
      
      // Set error message untuk user
      if (error instanceof Error) {
        // Cek jika error terkait network
        if (error.message.includes('fetch')) {
          setErrors({
            name: 'Connection error. Please check if server is running.',
          });
        } else if (error.message.toLowerCase().includes('email')) {
          setErrors({
            email: error.message,
          });
        } else {
          setErrors({
            name: error.message,
          });
        }
      }
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    submitUsers,
  }));

  // Handle input changes - dengan safety check
  const handleInputChange = (field: keyof UserData, value: string) => {
    console.log(`Input changed - ${field}:`, value);
    
    // Prevent submit trigger dari input change
    if (isSubmitting) {
      console.log('Ignoring input change during submission');
      return;
    }
    
    setUser(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Handle form submit (untuk prevent default jika ada)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submit prevented');
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-xl">
          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Name"
                value={user.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isSubmitting}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                placeholder="Email"
                type="email"
                value={user.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label>Position</Label>
              <Input
                placeholder="Position"
                value={user.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                disabled={isSubmitting}
                className={errors.position ? 'border-red-500' : ''}
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">{errors.position}</p>
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                type="password"
                value={user.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isSubmitting}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

NewUserModalForm.displayName = 'NewUserModalForm';

export default NewUserModalForm;