import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Row, Col, Select as AntSelect } from 'antd'; // 使用别名为 AntSelect


const MonthlyStepsSegmentCard = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);

    useEffect(() => {
        // 当选择的年份改变时，获取该年份对应的月度步数分段统计数据
        fetch(`/api/steps/monthly-segment?year=${selectedYear}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [selectedYear]);

    return (
        <Card title="步数分布" style={{ marginTop: 16 }}>
        <div>
            <Row>
                <Col span={24}>
                    <AntSelect defaultValue={selectedYear.toString()} style={{ width: 120, marginBottom: 20 }} onChange={value => setSelectedYear(value)}>
                        {[...Array(5).keys()].map(offset => {
                            const yr = new Date().getFullYear() - offset;
                            return <AntSelect.Option key={yr} value={yr.toString()}>{yr}</AntSelect.Option>;
                        })}
                    </AntSelect>
                </Col>
            </Row>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} 
                barCategoryGap="10%" // 控制柱子之间的间隔大小
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="0-5000" fill="#8884d8" />
                    <Bar dataKey="5001-10000" fill="#82ca9d" />
                    <Bar dataKey="10001-20000" fill="#ffc658" />
                    <Bar dataKey="20001+" fill="#ff8042" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        </Card>
    );
};

export default MonthlyStepsSegmentCard;
