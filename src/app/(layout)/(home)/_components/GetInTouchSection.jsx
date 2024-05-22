import React, { useState } from 'react';
import Container from '@/components/common/Container';
import IcnArrow from '@/components/svg_icons/IcnArrow';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetInTouchSection = (props) => {

    const [disable, setDisable] = useState(false);


    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL

    const contactSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .max(30, "You can't enter more than 30 characters")
            .matches(/^[a-zA-Z]+/, 'Only letters are allowed')
            .required("Name is required"),
        email: Yup.string()
            .trim()
            .email("Must be a valid email address")
            .required("Email address is required"),
        country: Yup.string()
            .trim()
            .max(20, "You can't enter more than 20 characters")
            .matches(/^[a-zA-Z0-9]+$/, 'special characters should not allowed')
            .required("Country name is required"),
        phone: Yup.string()
            .trim()
            .required("Mobile Number is required"),
        message: Yup.string()
            .required("Message is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            country: "",
            phone: "",
            message: "",
        },
        validationSchema: contactSchema,
        onSubmit: async (values) => {
            await addContact(values);

        },
    });

    const addContact = async (values) => {
        setDisable(true)
        const response = await axios.post(`${BASE_URL}/user/contactUs`, values, { headers: { env: 'test' } });
        if (response?.status === 200) {
            setDisable(false)
            resetForm();
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    const { resetForm } = formik;

    return (
        <section className='lg:py-[100px] py-[40px] bg-[url("/assets/images/bg_touch.png")] bg-no-repeat bg-cover bg-center overflow-x-hidden' id={props?.id}>
            <Container>
                <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="">
                        <h2 className='font-500 lg:pb-12 pb-6' data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-in-sine">GET <span className='text-danger'>IN TOUCH</span></h2>
                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate>
                                <div className="md:flex flex-col md:flex-row items-center gap-4 pb-4" data-aos="fade-right" data-aos-duration="1200" data-aos-easing="ease-in-sine">
                                    <div className="flex flex-col">
                                        <Field type='text' name='name' placeholder='Name' className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-white text-white md:mb-0 mb-4' />
                                        {formik.touched.name && formik.errors.name && <div className="text-red-500 text-start">{formik.errors.name}</div>}
                                    </div>
                                    <div className="flex flex-col">
                                        <Field type='text' name='email' placeholder='Email' className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-white text-white' />
                                        {formik.touched.email && formik.errors.email && <div className="text-red-500 text-start">{formik.errors.email}</div>}
                                    </div>
                                </div>
                                <div className="md:flex flex-col md:flex-row items-center gap-4 pb-4" data-aos="fade-right" data-aos-duration="1200" data-aos-easing="ease-in-sine">
                                    <div className="flex flex-col">
                                        <Field type='text' name='country' placeholder='Country' className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-white text-white md:mb-0 mb-4' />
                                        {formik.touched.country && formik.errors.country && <div className="text-red-500 text-start">{formik.errors.country}</div>}
                                    </div>
                                    <div className="flex flex-col">
                                        <Field type='text' name='phone' placeholder='Mobile Number' className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-white text-white' />
                                        {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-start">{formik.errors.phone}</div>}
                                    </div>
                                </div>
                                <div className="" data-aos="fade-right" data-aos-duration="1400" data-aos-easing="ease-in-sine">
                                    <div className="flex flex-col">
                                        <Field as="textarea" name="message" cols={3} rows={4} className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-white text-white' placeholder="Enter Your Message" />
                                        {formik.touched.message && formik.errors.message && <div className="text-red-500 text-start">{formik.errors.message}</div>}
                                    </div>
                                </div>
                                <button disabled={disable} type="submit" className='bg-white font-500 text-danger flex items-center gap-2 px-10 py-3.5 rounded-[8px] mt-2' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-sine">SUBMIT <IcnArrow className='h-5 w-5 text-danger' /></button>
                            </Form>
                        </FormikProvider>
                        <ToastContainer />
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </Container>
        </section >
    );
}

export default GetInTouchSection;
