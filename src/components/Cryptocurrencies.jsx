import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
    // Number of cryptos shown
    const count = simplified ? 10 : 100
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [searchTerm, setSearchTerm] = useState("")

    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);

    console.log(cryptos);

    useEffect(() => {
        
        const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setCryptos(filteredData)
        
    }, [cryptosList, searchTerm]);

    if(isFetching) return "Loading"

    return (
        <>
        {!simplified &&(
            <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        )}
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos?.map( currency => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`} >
                            <Card 
                                title={`${currency.rank}. ${currency.name}`} 
                                extra={<img className="crypto-image" 
                                alt="CryptoImage"
                                src={currency.iconUrl} 
                                ></img>}
                                hoverable
                            >
                                    <p>Price : {millify(currency.price)}</p>
                                    <p>Market Cap : {millify(currency.marketCap)}</p>
                                    <p>Daily Change : {millify(currency.change)}%</p>
                            </Card>    
                        </Link>    
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
