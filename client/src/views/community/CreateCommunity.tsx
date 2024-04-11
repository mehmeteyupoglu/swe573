import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switcher from '@/components/ui/Switcher'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../account/Settings/components/FormDesription'
import FormRow from '../account/Settings/components/FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineBriefcase,
    HiOutlineUser,
    HiCheck,
    HiOutlineGlobeAlt,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { OptionProps, ControlProps } from 'react-select'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { useNavigate } from 'react-router-dom'

export type CommunityFormModel = {
    name: string
    description: string
    avatar: string
    isPublic: boolean
}

type CommunityProps = {
    data?: CommunityFormModel
}

type LanguageOption = {
    value: string
    label: string
    imgPath: string
}

const { Control } = components

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Community Name Required'),
    description: Yup.string(),
    avatar: Yup.string(),
    isPublic: Yup.boolean(),
})

const Profile = ({
    data = {
        name: '',
        description: '',
        avatar: '',
        isPublic: false,
    },
}: CommunityProps) => {
    const onSetFormFile = (
        form: FormikProps<CommunityFormModel>,
        field: FieldInputProps<CommunityFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: CommunityFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    const navigate = useNavigate()

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title=""
                                desc="Add community info, like community name, description, avatar, and visibility."
                            />
                            <FormRow
                                name="name"
                                label="Community Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Community Name"
                                    component={Input}
                                />
                            </FormRow>
                            <FormRow
                                name="description"
                                label="Description"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="title"
                                    placeholder="Description"
                                    textArea
                                    component={Input}
                                    prefix={
                                        <HiOutlineBriefcase className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }: FieldProps) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>

                            <FormRow
                                name="isPublic"
                                label="Visibility"
                                {...validatorProps}
                                border={false}
                            >
                                <div className="flex">
                                    <Field
                                        name="isPublic"
                                        component={Switcher}
                                    />
                                    <div className="ml-3">
                                        {values.isPublic ? 'Public' : 'Private'}
                                    </div>
                                </div>
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={() => {
                                        navigate('/home')
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Creating' : 'Create'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
