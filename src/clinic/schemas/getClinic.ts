import * as yup from "yup"

const getClinicSchema = yup.object({
    state: yup
        .string()
        .notRequired(),
    clinicName: yup
        .string()
        .notRequired(),
    to: yup
        .string()
        .matches(/^(0\d|1\d|2[0-3]|[1-9]):[0-5]\d$|^24:00$/, 'Invalid time format')
        .notRequired(),
    from: yup
        .string()
        .matches(/^(0\d|1\d|2[0-3]|[1-9]):[0-5]\d$|^24:00$/, 'Invalid time format')
        .notRequired()
})

export { getClinicSchema }