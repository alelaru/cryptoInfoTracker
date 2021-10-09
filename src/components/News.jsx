import React, { useState } from 'react'
import { Avatar, Card, Col, Row, Typography, Select } from 'antd'
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi'
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Title, Text } = Typography;
const { Option } = Select;

const News = ({simplified}) => {
    const [newsCategory, setnewsCategory] = useState("Cryptocurrency")
    const {data: cryptoNews} = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 12})
    const { data } = useGetCryptosQuery(100);

    console.log(cryptoNews);

    if(!cryptoNews?.value) return "...Loading";

    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setnewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0 }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency) => (<Option value={currency.name}>{currency.name}</Option>))}
                    </Select>
                </Col>
            )}

            {cryptoNews.value.map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.name}</Title>
                                <img style={{maxWidth:"200px", maxHeight:"100px"}} alt="news" src={news?.image?.thumbnail?.contentUrl || demoImage}></img>
                            </div>
                            <p>
                                {news.description > 100 
                                ? `${news.description.substring(0,100)}...`
                                : news.description    
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                                <Text className="provider-name">{news?.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
