import { createContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'


const CreateContext = () => {
    const formik = useFormik({
        initialValues: {
            city: '',
            password: '',
            confirm: '',
            email: '',
            terms: false
        },
        validationSchema: Yup.object({
            city: Yup.string().required('Выберете город'),
            password: Yup
                .string()
                .required('Введите пароль')
                .min(5, 'Используйте не менее 5 символов'),
            confirm: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
            email: Yup.string().email('Неверный E-mail').required('Укажите E-mail')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(JSON.stringify(values, null, 2))
            resetForm();
        }
    })
    const formikContext = createContext(formik);

    return { formikContext, formik }
}
export default CreateContext;