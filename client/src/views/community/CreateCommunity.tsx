import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Switcher from '@/components/ui/Switcher'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../account/Settings/components/FormDesription'
import FormRow from '../account/Settings/components/FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiChevronDown,
    HiOutlineBriefcase,
    HiOutlineUser,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CommunityFormModel } from '@/@types/community'
import { apiAddCommunity } from '@/services/CommunityService'
import { t } from 'i18next'
import { Card } from '@/components/ui'
import CommunitySpecificTemplates from './components/CommunitySpecificTemplates'

type CommunityProps = {
    data?: CommunityFormModel
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

const CreateCommunity = ({
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

    const onFormSubmit = async (
        values: CommunityFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            const resp = await apiAddCommunity(values)

            if (resp.status == 201) {
                // TODO: add english i18n version
                toast.push(
                    <Notification
                        title={
                            t('community.messages.success') ||
                            'Addition successful'
                        }
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
            }
        } catch (error) {
            console.log('error', error)
            toast.push(
                <Notification
                    title={
                        t('community.messages.error') ||
                        'Addition not successful'
                    }
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
        } finally {
            setSubmitting(false)
        }
    }

    const navigate = useNavigate()

    return (
        <div>
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
                                        name="description"
                                        placeholder="Description"
                                        textArea
                                        component={Input}
                                        prefix={
                                            <HiOutlineBriefcase className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                {/* <FormRow
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
                            </FormRow> */}

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
                                            {values.isPublic
                                                ? 'Public'
                                                : 'Private'}
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
            <CommunitySpecificTemplates />
        </div>
    )
}

export default CreateCommunity
