import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import React from 'react'
import Axios from 'axios'
import { NavBar } from './NavBar'
import { Heading, Box, Link, Flex, Button, Input, Select, Image, Text, FormLabel, FormControl, FormHelperText } from '@chakra-ui/react'

export const Edit = () => {
    let {id} = useParams()
    const[genres, setGenres] = useState([{}])
    const[posterLink, setPosterLink] = useState("")
    const[posterChange, setPosterChange] = useState(false)
    useEffect(() => {
        fetch('/genres').then(
            response => response.json()
        ).then(
            data => {
                setGenres(data)
            }
        )
    }, [])
    const {isLoading, data} = useQuery(["movie"], async () => {
        return await Axios.get(`http://localhost:5000/movies/${id}`)
    })
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
        window.location.href = `http://localhost:3000/${id}`
    }

    const onSubmit = (data) => {
        console.log("Form submitted", data)
        fetch(`http://localhost:5000/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        alert("Movie edited!")
        redirect()
    }

    const errorMessageStyle = {
        color: "red.700"
    }

    return (
        <div>
            <NavBar></NavBar>
            {isLoading ? (
                <p>Loading...</p>
            ) : data ? (
                <>
                <Box maxW="700px" ml="20px">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Heading as='h6'>Edit this Movie</Heading>
                        <FormControl isRequired mb="30px">
                            <FormLabel>Title: </FormLabel>
                            <Input type="text" placeholder="Title" defaultValue={data.data.title} {...register("title")} />
                            <FormHelperText>Edit this movie's title. Leave unchanged if no edits are to be made.</FormHelperText>
                            <Text sx={errorMessageStyle}>{errors.title?.message}</Text>
                        </FormControl>
                        <FormControl mb="30px">
                            <FormLabel>Year released: </FormLabel>
                            <Input type="text" placeholder="Year" defaultValue={data.data.year}{...register("year")} />
                            <FormHelperText>Edit this movie's release year. Leave unchanged if no edits are to be made.</FormHelperText>
                            <Text sx={errorMessageStyle}>{errors.year?.message}</Text>
                        </FormControl>
                        <FormControl isRequired mb="30px">
                            <FormLabel>Genre: </FormLabel>
                            <Select {...register("genreID")}>
                                <option value={data.data.genreID} defaultValue>Keep Current Genre: {data.data.genreName}</option>
                                {genres.length > 0 ? (
                                    genres.map(genre => {
                                        if (genre.id != data.data.genreID)
                                            return <option value={genre.id}>{genre.genreName}</option>
                                    })
                                ) : (
                                    <p>Error in retrieving genres</p>
                                )}
                            </Select>
                            <FormHelperText>Edit this movie's genre. Leave unchanged if no edits are to be made.</FormHelperText>
                            <Text sx={errorMessageStyle}>{errors.genreID?.message}</Text>
                        </FormControl>
                        <FormControl mb="30px">
                            <FormLabel>Poster link: </FormLabel>
                            <Input src={posterLink} type="text" {...register("poster")} placeholder="Poster Link" defaultValue={data.data.poster} onChange = {(e) => {
                                setPosterLink(e.target.value)
                                setPosterChange(true)
                            }} />
                            <FormHelperText mb="30px">Edit this movie's poster. Leave unchanged if no edits are to be made. Leave blank to remove poster.</FormHelperText>
                            {posterLink == "" && posterChange == false && data.data.poster != "" ? (
                                setPosterLink(data.data.poster)
                            ) : (
                                console.log(posterChange)
                            )
                            }
                            <Text sx={errorMessageStyle}>{errors.poster?.message}</Text>
                            <Image src={posterLink}  width={150} height={220} border="1px"></Image>
                        </FormControl>
                        <Flex>
                        <Button type="submit" mb="20px">Submit Movie</Button>
                        <Link href={"/" + data.data.id}><Button mb="20px" ml="20px">Cancel</Button></Link>
                        </Flex>
                    </form>
                </Box>
                
                </>
            ) : (
                <p>Error retrieving data</p>
            )}
        </div>
    )
}