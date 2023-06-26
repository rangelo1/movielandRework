import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from "axios"
import { NavBar } from './NavBar'
import { Heading, Box, Link, Flex, Button, Input, Select, Image, Text, FormLabel, SimpleGrid, Center } from '@chakra-ui/react'

export const Movie = () => {
    let {id} = useParams()
    const [movie, setMovie] = useState(id)
    
    // useEffect(() => {
    //     fetch(`/movies/${id}`).then(
    //         response => response.json()
    //     ).then(
    //         data => {
    //             setMovie(data)
    //         }
    //     )
    // }, [])
    const {isLoading, data} = useQuery(["movie"], async () => {
        return await Axios.get(`http://localhost:5000/movies/${id}`)
    })

    function redirect() {
        window.location.href = "http://localhost:3000"
    }

    return (
        <div>
            <NavBar></NavBar>
            {isLoading ? (
                <p>Loading...</p>
            ) : data ? (
                <>
                <SimpleGrid columns={2} p="60px" minChildWidth={320} spacing={10}>
                    <Box justifyItems={"center"} alignItems={"center"}>
                        <Center>
                        <Image src = {data.data.poster} width="320px" height="500px"></Image>
                        </Center>
                    </Box>
                    <Box>
                        <Heading mb="20px">{data.data.title} ({data.data.year})</Heading>
                        <Text mb="30px">Genre: {data.data.genreName}</Text>
                        <Button mr="30px"><Link href={id + '/edit'}>Edit this Movie</Link></Button>
                        <Button type="button" onClick = {() => {
                            let decision = confirm('Are you sure you wish to delete this movie?')
                            if (decision) {
                                fetch(`http://localhost:5000/movies/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                                })
                            alert("Movie deleted!")
                            redirect()
                            }
                        }}>{"Delete this movie"}</Button>
                    </Box>
                </SimpleGrid>
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    )
}