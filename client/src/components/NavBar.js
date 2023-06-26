import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Axios from "axios"
import { Flex, Heading, Link, Box, Button, Input, Text, Select, Spacer } from '@chakra-ui/react'
import '../SearchBar.css'

export const NavBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [genres, setGenres] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
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
      <Flex as="nav" p="10px" bg="blue.400" wrap="wrap" gap="2">
        <Heading as="h1" color="white">MovieLand</Heading>
        <Link href="/"><Box w="70px" h="50px" mx="50px"><Button colorScheme='blue'>Home</Button></Box></Link>
        <Link href="/new"><Box w="150px" h="50px"><Button colorScheme='blue'>Add New Movie</Button></Box></Link>
        <Spacer />        
      </Flex>
    </div>
  )
}