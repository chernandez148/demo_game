import React from 'react'
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'


function LogInForm({ handleFadeOut, fadeIn, setFadeIn, updateUser }) {
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter your username"),
        password: yup.string().required("Please enter your password"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            setFadeIn(false)

            fetch('/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ ...values, password: values.password }),
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        updateUser(user)
                        navigate("/")
                    })
                } else {
                    resp.json().then(console.log)
                }
            })
        }
    })

    const modelMox = fadeIn ? "opacity-1" : "opacity-0"

    return (
        <div className={`model-box bg-dark px-3 py-5 ${modelMox}`}>
            <IoClose className='cursor-pointer float-right' onClick={handleFadeOut} />
            <h2 className='mt-4 mb-4'>Sign In</h2>
            <form className='flex flex-col'>
                {formik.errors && (
                    <>
                        <input
                            className='mb-4 border rounded-0 p-1 text-black'
                            type="text"
                            placeholder='Username'
                            name='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <span>{formik.errors.username}</span>
                        <input
                            className='border rounded-0 p-1 text-black'
                            type="password"
                            placeholder='Password'
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <span>{formik.errors.password}</span>
                    </>
                )}
                <button className='mt-4 border rounded-0 p-1' type='submit' onClick={formik.handleSubmit}>Sign In</button>
            </form>
        </div>
    )
}

export default LogInForm