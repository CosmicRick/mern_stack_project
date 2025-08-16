import React from 'react'
import { motion } from "framer-motion";
import { 
    User,
    Mail,
    Lock,
    Upload,
    Eye,
    EyeOff,
    UserCheck,
    Building2,
    AlertCircle,
    CheckCircle,
    Loader,
 } from "lucide-react"; 


 const Signup = () => {


        const[formData, setFormData] = useState({
            name: "",
            email: "",
            password: "",
            role: "",
            avatar: null
        });

        const [formState, setFormState] = useState({
            loading: false,
            errors: {},
            showPassword: false,
            avatarPreview: null,
            success: false,
        });

        //Handle input changes
    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        //Clear error when user starts typing
        if (formState.errors[name]) {
            setFormState(prev => ({
                ...prev,
                errors: {
                    ...prev.errors,
                    [name]: ''
                }
            }));
        }
    };

    const handleRoleChange = (e) => {};

    const handleAvatarChange = (e) => {};

    const validateForm = () => {};

    const handleSubmit = async(e) => {};

    if (formState.success) {
            return (
                <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-4 rounded shadow w-100"
                    >
                        <CheckCircle className="text-success" size={48} />
                        <h2 className="h4 font-weight-bold text-dark mb-2">Login Successful</h2>
                        <p className="text-muted">You have successfully logged in!</p>
                        <div className="text-center mt-3" />
                        <p className="mb-0">
                            Redirecting to your dashboard...
                        </p>
    
                    </motion.div>
                </div>
            );
        }
    return <div>Signup</div>;
};

export default Signup;