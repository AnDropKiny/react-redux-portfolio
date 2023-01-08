import { useContext } from 'react';
import CreateContext from '../status/FormikContext';
import './form.scss'


const Form = () => {
    const { formikContext } = CreateContext();

    const formik = useContext(formikContext)

    return (
        <form onSubmit={formik.handleSubmit}>
            <hr />
            <label htmlFor="password">Пароль</label>
            <input
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