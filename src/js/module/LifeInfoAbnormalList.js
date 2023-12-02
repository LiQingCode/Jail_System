import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { PlaySquareFilled } from '@ant-design/icons';
import '../../index';

const ContainerHeight = 280;
const warning_columns = [
    {
        title: '告警详情',
        dataIndex: 'eventTypeName',
        key: 'eventTypeName',
        align: 'center',
        width: '5%',
    },
    {
        title: '告警类型',
        dataIndex: 'eventLevel',
        key: 'eventLevel',
        filters: [
            {
                text: '一般报警',
                value: '一般报警',
            },
            {
                text: '重要报警',
                value: '重要报警',
            },
            {
                text: '紧急报警',
                value: '紧急报警',
            },
        ],
        align: 'center',
        width: '6%',
    },
    {
        title: '告警时间',
        dataIndex: 'eventDisplayDate',
        key: 'eventDisplayDate',
        dataIndex: 'eventDisplayDate',
        align: 'center',
        sorter: true,
        width: '15%',
    },
    {
        key: 'action',
        render: (_, record) => (
            <a><PlaySquareFilled /></a>
        ),
        width: '3%',
    },
];

const LifeInfoAbnormalList = (props) => {
    const {roomId} = props;
    const [WarningData, setWarningData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = () => {
        setLoading(true);
        fetch(global.BaseURL.url+`/LifeInfo/${roomId}/AbnormalInfo`)
            .then((res) => res.json())
            .then((results) => {
                setWarningData(results);
                console.log(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: (results).length,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setWarningData([]);
        }
    };

    return (
        <Card title="异常情况">
            <Table
                columns={warning_columns}
                rowKey={(record) => record.id}
                dataSource={WarningData}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ y: ContainerHeight, }}
            />
        </Card>
    )
}
export default LifeInfoAbnormalList;