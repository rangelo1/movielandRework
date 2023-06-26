import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Axios from "axios"
import { NavBar } from './NavBar'
import { Heading, Box, UnorderedList, ListItem, Link, Input, Select, Flex, Button, Text, SimpleGrid, Image, Center } from '@chakra-ui/react'

export const Home = () => {
    let params = new URLSearchParams(window.location.search)
    const [genres, setGenres] = useState([{}]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genreSearch, setGenreSearch] = useState(0);    
    
    const {isLoading, data, refetch} = useQuery(["allMovies"], async () => {
        return await Axios.get(`http://localhost:5000/movies?title=${searchTerm}&genre=${genreSearch}`)
    })

    useEffect(() => {
        fetch('/genres').then(
            response => response.json()
        ).then(
            data => {
                setGenres(data)
            }
        )
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            <Flex columns={3} p="30px" gap="10px" ml='20px' wrap="wrap" minChildWidth={200}>
                <Box>
                    <Input  placeholder="Search for movies"
                            htmlSize={40}
                            width='auto'
                            variant='filled'
                            borderColor={'blackAlpha.700'}
                            onChange= {(e)=> {
                                setSearchTerm(e.target.value)
                                }}>
                            </Input>
                </Box>
                <Box>
                    <Select borderColor={'blackAlpha.700'}
                            width='200px'
                            onChange = {(e) => {
                                setGenreSearch(e.target.value)
                            }}>
                        <option value='0' defaultValue>All genres</option>
                        {genres.length > 0 ? (
                            genres.map(genre => {
                                return <option value={genre.id} key={genre.id}>{genre.genreName}</option>
                            })  
                        ) : (
                            <p>No genres found!</p>
                        )}
                    </Select>
                </Box>
                <Box>
                    <Button onClick={() => {
                        refetch()
                    }}>
                        Search
                    </Button>
                </Box>
            </Flex>
            
            <SimpleGrid columns={5} p="40px" spacing={10} minChildWidth={150} justifyItems={"center"} alignItems={"center"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : data ? (data.data.map((movies) => {
                return  <>
                    <Flex>
                        <Box bg="white" w="150px" h="270px">
                            <Link href = {movies.id} key = {movies.id}>
                                <Image src={movies.poster} alt={movies.title} width={150} height={220} align={"50%"}></Image>
                                <Text align="center">{movies.title}</Text>
                            </Link>
                        </Box>
                    </Flex>
                        </>
            })) : (
                <p>No data available</p>
            )}
            </SimpleGrid>
        </div>
    )
}