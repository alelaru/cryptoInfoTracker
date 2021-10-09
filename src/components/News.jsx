import React from 'react'
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi'

const News = ({simplified}) => {

    const {data, isFetching} = useGetCryptosNewsQuery({ newsCategory: "Cryptocurrency", count: simplified ? 10 : 100})

    console.log(data);

    return (
        <div>
            News
        </div>
    )
}

export default News
