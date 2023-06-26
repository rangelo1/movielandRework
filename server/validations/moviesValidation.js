import * as yup from 'yup'

export const movieSchema = yup.object().shape({
    title: yup.string().required(),
    year: yup.string().min(4).max(4).required(),
    genre: yup.string().required(),
    poster: yup.string().url().required()
})