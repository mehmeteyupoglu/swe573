import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineUser,
    HiCheck,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { OptionProps } from 'react-select'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { updateProfile } from '@/services/UserService'
import { UserType } from '@/@types/user'

type ProfileProps = {
    data?: UserType
}

// TODO: translation needed
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username Required'),
    firstName: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('First Name Required'),
    lastName: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Last Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    gender: Yup.string(),
})

type GenderOption = {
    value: string
    label: string
}

const CustomSelectOption = ({
    innerProps,
    label,
    isSelected,
}: OptionProps<GenderOption>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const Profile = ({
    data = {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        avatar: '',
        verified: 0,
        subscription: '',
        authority: [],
    },
}: ProfileProps) => {
    const { t } = useTranslation()
    const onSetFormFile = (
        form: FormikProps<UserType>,
        field: FieldInputProps<UserType>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (
        values: UserType,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            const resp = await updateProfile(values)
            console.log('resp', resp)

            if (resp.data) {
                // TODO: add english i18n version
                toast.push(
                    <Notification
                        title={
                            t('settings.profile.updateMessage.success') ||
                            'Update successful'
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
                        t('settings.profile.updateMessage.error') ||
                        'Update not successful'
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

    const genderOptions: GenderOption[] = [
        { value: 'male', label: t(`settings.profile.genders.Male`) },
        { value: 'female', label: t(`settings.profile.genders.Female`) },
        { value: 'other', label: t(`settings.profile.genders.Other`) },
    ]

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title={t('settings.title')}
                                desc={t('settings.description')}
                            />
                            <FormRow
                                name="username"
                                label={t('application.user.username')}
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder={t('application.user.username')}
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="firstName"
                                label={t('application.user.firstName')}
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstName"
                                    placeholder={t(
                                        'application.user.firstName'
                                    )}
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="lastName"
                                label={t('application.user.lastName')}
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastName"
                                    placeholder={t('application.user.lastName')}
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label={t('application.user.email')}
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder={t('application.user.email')}
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="avatar"
                                label={t('application.user.avatar')}
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
                                name="gender"
                                label={t('application.user.gender')}
                                {...validatorProps}
                            >
                                <Field name="gender">
                                    {({ field, form }: FieldProps) => (
                                        <Select<GenderOption>
                                            field={field}
                                            form={form}
                                            options={genderOptions}
                                            placeholder={t(
                                                'application.select.placeholder'
                                            )}
                                            components={{
                                                Option: CustomSelectOption,
                                                // Control: CustomControl,
                                            }}
                                            value={genderOptions.filter(
                                                (option) =>
                                                    option.value ===
                                                    values?.gender
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={() => resetForm()}
                                >
                                    {t('settings.profile.buttons.reset')}
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting
                                        ? t('settings.profile.buttons.updating')
                                        : t('settings.profile.buttons.update')}
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
