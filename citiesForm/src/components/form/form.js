
import { useFormik } from 'formik';
import * as Yup from 'yup'

import './form.scss'


const Form = ({ data }) => {
    const formik = useFormik({
        initialValues: {
            city: data,
            password: '',
            confirm: '',
            email: '',
            terms: false
        },
        validationSchema: Yup.object({
            city: Yup.string().required('Выберете город'),
            password: Yup
                .string()
                .required('Укажите пароль')
                .min(5, 'Используйте не менее 5 символов'),
            confirm: Yup
                .string().required('Укажите пароль')
                .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
            email: Yup.string().email('Неверный E-mail').required('Укажите E-mail')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(JSON.stringify(values, null, 2))
            resetForm();
        }
    })
    formik.values.city = data;
    return (
        <form onSubmit={formik.handleSubmit}>
            <hr />
            <label htmlFor="password">Пароль</label>
            <input
                style={formik.errors.password && formik.touched.password ? { border: '2px solid red' } : null}
                id="password"
                name="password"
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>

            </input>
            {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
            <label htmlFor="confirm">Пароль еще раз</label>
            <input
                style={formik.errors.confirm && formik.touched.confirm ? { border: '2px solid red' } : null}
                id="confirm"
                name="confirm"
                type='password'
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>

            </input>
            {formik.errors.confirm && formik.touched.confirm ? <div>{formik.errors.confirm}</div> : null}
            <hr />
            <label htmlFor="email">Электронная почта</label>
            <input
                style={formik.errors.email && formik.touched.email ? { border: '2px solid red' } : null}
                id="email"
                name="email"
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>

            </input>
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="terms">
                Согласие
                <input
                    id="terms"
                    name="terms"
                    type='checkbox'
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                </input> Принимать актуальную информацию на E-mail
            </label>

            <button type="submit">Изменить</button>
        </form>
    )
}
export default Form;