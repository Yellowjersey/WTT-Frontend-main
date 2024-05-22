"use client"

import React, { Fragment, useState } from 'react';
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import IcnClose from '../svg_icons/IcnClose';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const filterData = [
    { name: 'Metamask', img: '/assets/images/matamask.svg' },
    { name: 'Walletconnect', img: '/assets/images/walletconnect.svg' },
    { name: 'Coinbase Wallet', img: '/assets/images/coinbase.svg' },
]

const JoinModal = ({ modal, setModal }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL

    const [selectedOption, setSelectedOption] = useState();
    const [event, setEvent] = useState();
    const [spoken, setSpoken] = useState();
    const [talk, setTalk] = useState();
    const [disable, setDisable] = useState(false);

    const teamSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .max(30, "You can't enter more than 30 characters")
            .matches(/^[a-zA-Z]+/, 'Only letters are allowed')
            .required("Name is required"),
        email: Yup.string()
            .trim()
            .email("Must be a valid email address")
            .required("Email address is required"),
        selectedOption: Yup.string()
            .required("Answer this question"),
        event: Yup.string()
            .required("Answer this question"),
        talk: Yup.string()
            .required("Answer this question"),
        spoken: Yup.string()
            .required("Answer this question"),
        message: Yup.string()
            .required("Answer this question"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            selectedOption: '',
            event: '',
            spoken: '',
            talk: '',
            message: ''
        },
        validationSchema: teamSchema,
        onSubmit: async (values) => {
            let data = {
                name: values.name,
                email: values.email,
                outdoor_man_woman: selectedOption,
                outdoor_events: event,
                spoken_articulate: spoken,
                public_hours_talk: talk,
                help_us: values.message
            }
            await addTeam(data);

        },
    });

    const addTeam = async (values) => {
        setDisable(true)
        const response = await axios.post(`${BASE_URL}/user/joinTeam`, values, { headers: { env: 'test' } });
        if (response?.status === 200) {
            setDisable(false)
            setModal(false);
            resetForm();
            setSelectedOption('');
            setEvent('');
            setTalk('');
            setSpoken('');
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

    const { resetForm, setFieldValue } = formik;

    const handleselectedOption = (event) => {
        setSelectedOption(event);
        setFieldValue('selectedOption', event)
    }
    const handleEvent = (event) => {
        setEvent(event);
        setFieldValue('event', event)
    }
    const handleSpoken = (event) => {
        setSpoken(event);
        setFieldValue('spoken', event)
    }
    const handleTalk = (event) => {
        setTalk(event);
        setFieldValue('talk', event)
    }

    const handleclose = () =>{
        setModal(false);
        resetForm();
        setSelectedOption('');
        setEvent('');
        setTalk('');
        setSpoken('');
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-[99]" onClose={handleclose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/90" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform rounded-sm bg-card shadow-xl transition-all overflow-hidden">
                                    <div className="dialog-content">
                                        <div className='dialog-header flex items-center justify-center p-4'>
                                            <h5 className="text-[24px] font-500 text-center uppercase">
                                                Join Our Team
                                            </h5>
                                            <span className='close cursor-pointer absolute top-4 end-6' onClick={() => setModal(false)}>
                                                <IcnClose className="h-5 w-5 text-gray-800 " />
                                            </span>
                                        </div>
                                        <div className='dialog-body'>
                                            <div className="p-6 pt-0">
                                                <p className='text-start text-base text-gray-800 tracking-widest'>If you are interested in joining our team, just send us your information and we will take a close look at it.  Things we consider. </p>
                                                <FormikProvider value={formik}>
                                                    <Form autoComplete="off" noValidate>
                                                        <div className="py-4">
                                                            <div className="form-group pb-3">
                                                                <Field type='text' name='name' placeholder='Enter your name' className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-gray-800 text-white md:mb-0 mb-4' />
                                                                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-start">{formik.errors.name}</div>}
                                                            </div>
                                                            <div className="form-group pb-3">
                                                                <Field type='text' name='email' placeholder='Enter your email' className='w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] border border-white/30 placeholder:text-gray-800 text-white md:mb-0 mb-4' />
                                                                {formik.touched.email && formik.errors.email && <div className="text-red-500 text-start">{formik.errors.email}</div>}
                                                            </div>
                                                            <div className="form-group pb-3">

                                                                <RadioGroup value={selectedOption} onChange={handleselectedOption} className='flex items-start flex-col gap-1.5'>
                                                                    <RadioGroup.Label className='text-gray-800 tracking-widest'>Are you an avid outdoorsman or woman?</RadioGroup.Label>
                                                                    <div className="flex items-center gap-5">
                                                                        <RadioGroup.Option value="1" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>Yes</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                        <RadioGroup.Option value="0" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>No</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                    </div>
                                                                    {formik.touched.selectedOption && formik.errors.selectedOption && <div className="text-red-500 text-start">{formik.errors.selectedOption}</div>}
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="form-group pb-3">
                                                                <RadioGroup value={event} onChange={handleEvent} className='flex items-start flex-col gap-1.5'>
                                                                    <RadioGroup.Label className='text-gray-800 tracking-widest'>Could you travel to outdoor events with other members? </RadioGroup.Label>
                                                                    <div className="flex items-center gap-5">
                                                                        <RadioGroup.Option value="1" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>Yes</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                        <RadioGroup.Option value="0" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>No</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                    </div>
                                                                    {formik.touched.event && formik.errors.event && <div className="text-red-500 text-start">{formik.errors.event}</div>}
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="form-group pb-3">
                                                                <RadioGroup value={spoken} onChange={handleSpoken} className='flex items-start flex-col gap-1.5'>
                                                                    <RadioGroup.Label className='text-gray-800 tracking-widest'>Are you well spoken and articulate?</RadioGroup.Label>
                                                                    <div className="flex items-center gap-5">
                                                                        <RadioGroup.Option value="1" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>Yes</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                        <RadioGroup.Option value="0" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>No</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                    </div>
                                                                    {formik.touched.spoken && formik.errors.spoken && <div className="text-red-500 text-start">{formik.errors.spoken}</div>}
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="form-group pb-3">
                                                                <RadioGroup value={talk} onChange={handleTalk} className='flex items-start flex-col gap-1.5'>
                                                                    <RadioGroup.Label className='text-gray-800 tracking-widest'>Can you talk to the public for hours if necessary?  </RadioGroup.Label>
                                                                    <div className="flex items-center gap-5">
                                                                        <RadioGroup.Option value="1" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>Yes</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                        <RadioGroup.Option value="0" className='flex items-center gap-1 cursor-pointer'>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <div className={`bg-gray-200 rounded-full outline-none cursor-pointer h-4 w-4  flex items-center justify-center`}>
                                                                                        <span className={`h-2 w-2 rounded-full  ${checked ? 'bg-danger' : ''}`} />
                                                                                    </div>
                                                                                    <p className='text-gray-800'>No</p>
                                                                                </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                    </div>
                                                                    {formik.touched.talk && formik.errors.talk && <div className="text-red-500 text-start">{formik.errors.talk}</div>}
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="text-start flex flex-col gap-1">
                                                                    <label className='text-gray-800 tracking-widest'>What can you bring to the table to help us?  </label>
                                                                    <Field as="textarea" name="message"
                                                                        cols={3}
                                                                        rows={4}
                                                                        className="w-full outline-none py-2 px-4 text-base bg-white/10 rounded-[8px] placeholder:text-gray-800 text-white resize-none tracking-widest"
                                                                        placeholder="Enter Your answer"
                                                                    />
                                                                </div>
                                                                {formik.touched.message && formik.errors.message && <div className="text-red-500 text-start">{formik.errors.message}</div>}
                                                            </div>
                                                        </div>
                                                        <button disabled={disable} className='w-1/3 text-base font-500 bg-white py-2 rounded-[8px]' variant="outline">Join</button>
                                                    </Form>
                                                </FormikProvider>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default JoinModal;

