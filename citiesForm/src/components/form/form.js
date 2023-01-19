
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'

import './form.scss'


const Form = ({ data }) => {

    const [state, setState] = useState(false)

    const setLastModifiedTime = () => {


        const date = new Date()

        const day = date.getUTCDate(),
            month = date.toLocaleString('default', { month: 'long' }),
            year = date.getUTCFullYear(),
            time = date.toLocaleTimeString();


        return `последние изменения ${day} ${month} ${year} в ${time}`
    }


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
            alert('Данные отправлены в консоль')
            console.log(JSON.stringify(values, null, 2))
            resetForm();
            setState(true);
        }
    })
    formik.values.city = data;
    return (
        <form onSubmit={formik.handleSubmit}>
            <hr />

            <div className='input_container'>
                <label htmlFor="password">Пароль</label>
                <div>
                    <input
                        style={formik.errors.password && formik.touched.password ? { border: '2px solid red' } : null}
                        id="password"
                        name="password"
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>

                    </input>
                    {formik.errors.password && formik.touched.password ? <div className='error'>{formik.errors.password}</div> : null}
                </div>
                <span className='info_hint'>Ваш новый пароль должен содержать не менее 5 символов.</span>
            </div>
            <div className='input_container'>
                <label htmlFor="confirm">Пароль еще раз</label>
                <div>
                    <input
                        style={formik.errors.confirm && formik.touched.confirm ? { border: '2px solid red' } : null}
                        id="confirm"
                        name="confirm"
                        type='password'
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                    </input>
                    {formik.errors.confirm && formik.touched.confirm ? <div className='error'>{formik.errors.confirm}</div> : null}
                </div>
                <span className='info_hint'>Повторите пароль, пожалуйста, это обезопасит вас с нами на случай ошибки.</span>
            </div>

            <hr />

            <div className='input_container'>
                <label htmlFor="email">Электронная почта</label>
                <div >
                    <input
                        style={formik.errors.email && formik.touched.email ? { border: '2px solid red' } : null}
                        id="email"
                        name="email"
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>

                    </input>
                    {formik.errors.email && formik.touched.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>

                <span className='info_hint'>Можно изменить адрес, указанный при регистрации.</span>
            </div>
            <div className='input_container_checkbox'>
                <label htmlFor="terms">Я согласен</label>
                <div>
                    <input
                        id="terms"
                        name="terms"
                        type='checkbox'
                        value={formik.values.terms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                    </input>
                    <span>принимать актуальную информацию на емейл</span></div>

            </div>

            <div className='submit_box'>
                <button type="submit">Изменить</button>
                {state ? <span className='info_hint'>{setLastModifiedTime()}</span> : null}

            </div>

        </form>
    )
}
export default Form;