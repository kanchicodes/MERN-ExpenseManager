// import React, { useState } from 'react';
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';


// const Input = ({ value, onChange, placeholder, label, type }) => {
//     const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     return (
//         <div>
//             <label className='text-[13px] text-slate-800'>{label}</label>

//             <div className='input-box'>
//                 <input
//                     type={type === 'password' ? showPassword ? 'text' : 'password' : type}
//                     placeholder={placeholder}
//                     className='w-full bg-transparent outline-none '
//                     value={value}
//                     onChange={(e) => onChange(e)}
//                 />

//                 {type === 'password' && (
//                     <>
//                         {showPassword ? (
//                             <FaRegEye
//                                 size={22}
//                                 className='text-primary cursor-pointer'
//                                 onClick={() => togglePassword()}
//                             />
//                         ) : (
//                             <FaRegEyeSlash
//                                 size={22}
//                                 className='text-slate-400 cursor-pointer'
//                                 onClick={() => toggleShowPassword()}
//                             />
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Input;

import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
    const inputId = `input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;

    return (
        <div>
            {label && (
                <label htmlFor={inputId} className="text-[13px] text-slate-800">
                    {label}
                </label>
            )}

            <div className="input-box flex items-center">
                <input
                    id={inputId}
                    type={inputType}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={onChange}
                />

                {type === 'password' &&
                    (showPassword ? (
                        <FaRegEye
                            size={22}
                            className="text-primary cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Input;
