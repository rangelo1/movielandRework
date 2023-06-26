import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { redirect } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Heading, Box, Link, Flex, Button, Input, Select, Image, Text, FormLabel, FormHelperText, FormControl, Center } from '@chakra-ui/react'

export const NewMovie = () => {
    const[genres, setGenres] = useState([{}])
    const[posterLink, setPosterLink] = useState("")
    useEffect(() => {
        fetch('/genres').then(
            response => response.json()
        ).then(
            data => {
                setGenres(data)
            }
        )
    }, [])

    const schema = yup.object().shape({
        title: yup.string().required("Movie title is required."),
        year: yup.number("Year must be a number").min(1000, "Year must be four characters long.").max(9999, "Year must be four characters long.").typeError("Year must be a number.").required("Year is required."),
        genreID: yup.number("Select a genre.").integer("Select a genre.").min(1, "Select a genre.").required("Select a genre"),
        poster: yup.string().required("Poster link is required.")
    })

    const form = useForm({
        resolver: yupResolver(schema)
    })
    const { register, control, handleSubmit, formState: {errors} } = form

    function redirect() {
        window.location.href = "http://localhost:3000"
    }

    const onSubmit = (data) => {
        let decision = confirm('Submit this movie?')
        if (decision) {
            fetch('/movies/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            alert("Submitted!")
            return redirect()
        }
    }

    const errorMessageStyle = {
        color: "red.700"
    }

    return (
        <>
            <NavBar></NavBar>
            <Box maxW="700px" ml="20px">
                <form onSubmit={handleSubmit(onSubmit)}>
                <Heading mb="20px">Adding a New Movie</Heading>
                <FormControl isRequired mb="30px">
                    <FormLabel>Title: </FormLabel>
                    <Input type="text" placeholder="Title" {...register("title")} />
                    <FormHelperText>Place in the movie's title.</FormHelperText>
                    <Text sx={errorMessageStyle}>{errors.title?.message}</Text>
                </FormControl>
                <FormControl isRequired mb="30px">
                    <FormLabel>Year released: </FormLabel>
                    <Input type="text" placeholder="Year" {...register("year")} />
                    <FormHelperText>Place in the full year the movie was released.</FormHelperText>
                    <Text sx={errorMessageStyle}>{errors.year?.message}</Text>
                </FormControl>
                <FormControl isRequired mb="30px">
                    <FormLabel>Genre: </FormLabel>
                    <Select {...register("genreID")}>
                        <option value='0' defaultValue>Select a genre</option>
                        {genres.length > 0 ? (
                            genres.map(genre => {
                                return <option value={genre.id}>{genre.genreName}</option>
                            })
                        ) : (
                            <p>No genres found!</p>
                        )}
                    </Select>
                    <FormHelperText>Select a genre from the dropdown menu.</FormHelperText>
                    <Text sx={errorMessageStyle}>{errors.genreID?.message}</Text>
                </FormControl>
                <FormControl isRequired mb="30px">
                    <FormLabel>Poster link: </FormLabel>
                    <Input type="text" {...register("poster")} placeholder="Poster Link" onChange = {(e) => {
                        setPosterLink(e.target.value)
                    }} />
                    <FormHelperText>The poster should appear below if the link works.</FormHelperText>
                    <Text sx={errorMessageStyle}>{errors.poster?.message}</Text>
                </FormControl>
                    <Image src={posterLink} width={150} height={220} border="1px" mb="20px"></Image>
                    <Flex>
                    <Button type="submit" mb="20px">Submit Movie</Button>
                    <Link href="/"><Button mb="20px" ml="20px">Cancel</Button></Link>
                    </Flex>
                </form>
            </Box>
            
            <DevTool control={control} />
        </>
    )
}